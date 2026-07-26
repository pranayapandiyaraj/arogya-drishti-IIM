from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
import time
from datetime import datetime
from typing import List

from models import BedStatus, Patient, TelemetryPoint, XAIExplanation, AuditLog, UserLogin, UserToken
from auth import create_access_token, decode_access_token
from rppg_pipeline import rppg_engine
from websockets import telemetry_ws_manager

app = FastAPI(
    title="Arogya Drishti API",
    description="Contactless Neonatal Telemetry & AI Decision Support API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock in-memory database
BEDS_DB = [
    BedStatus(
        bed_id="BED-101",
        bed_number="101",
        ward="NICU Ward A - High Risk",
        status="Normal",
        patient=Patient(
            id="PAT-9081",
            name="Infant of Sharma",
            gestational_age_weeks=32,
            birth_weight_grams=1650,
            admission_date="2026-07-20",
            attending_physician="Dr. Ananya Roy",
            risk_level="High Risk"
        ),
        heart_rate_bpm=128.5,
        respiratory_rate_rpm=44.0,
        motion_activity_index=1.1,
        pain_score=1.2,
        camera_status="Connected",
        last_updated=datetime.now().isoformat()
    ),
    BedStatus(
        bed_id="BED-102",
        bed_number="102",
        ward="NICU Ward A - High Risk",
        status="Caution",
        patient=Patient(
            id="PAT-9082",
            name="Baby Girl Patel",
            gestational_age_weeks=29,
            birth_weight_grams=1210,
            admission_date="2026-07-22",
            attending_physician="Dr. Vikram Seth",
            risk_level="Critical"
        ),
        heart_rate_bpm=162.0,
        respiratory_rate_rpm=58.0,
        motion_activity_index=3.8,
        pain_score=4.5,
        camera_status="Connected",
        last_updated=datetime.now().isoformat()
    ),
    BedStatus(
        bed_id="BED-103",
        bed_number="103",
        ward="NICU Ward B - Step-Down",
        status="Critical",
        patient=Patient(
            id="PAT-9083",
            name="Twin A - Gupta",
            gestational_age_weeks=28,
            birth_weight_grams=980,
            admission_date="2026-07-18",
            attending_physician="Dr. Ananya Roy",
            risk_level="Critical"
        ),
        heart_rate_bpm=92.0, # Bradycardia warning threshold < 100
        respiratory_rate_rpm=22.0,
        motion_activity_index=0.2,
        pain_score=6.8,
        camera_status="Connected",
        last_updated=datetime.now().isoformat()
    ),
    BedStatus(
        bed_id="BED-104",
        bed_number="104",
        ward="NICU Ward B - Step-Down",
        status="Normal",
        patient=Patient(
            id="PAT-9084",
            name="Infant of Reddy",
            gestational_age_weeks=34,
            birth_weight_grams=1950,
            admission_date="2026-07-24",
            attending_physician="Dr. Meera Menon",
            risk_level="Low Risk"
        ),
        heart_rate_bpm=134.0,
        respiratory_rate_rpm=40.0,
        motion_activity_index=1.0,
        pain_score=0.8,
        camera_status="Connected",
        last_updated=datetime.now().isoformat()
    )
]

AUDIT_LOGS = [
    AuditLog(id="LOG-001", timestamp="2026-07-25 19:40:12", user="dr_roy", role="NICU Doctor", action="OVERRIDE_ALERT", details="Acknowledged Bradycardia warning on Bed 103"),
    AuditLog(id="LOG-002", timestamp="2026-07-25 19:15:00", user="nurse_priya", role="NICU Nurse", action="BED_ASSIGNMENT", details="Assigned PAT-9084 to Bed 104"),
    AuditLog(id="LOG-003", timestamp="2026-07-25 18:30:22", user="admin_kapoor", role="Hospital Administrator", action="CAMERA_CALIBRATION", details="Recalibrated RGB sensor on Bed 102"),
    AuditLog(id="LOG-004", timestamp="2026-07-25 16:10:05", user="auditor_singh", role="Researcher/Auditor", action="EXPORT_VALIDATION", details="Downloaded rPPG POS validation benchmark dataset")
]

@app.get("/")
def root():
    return {"message": "Arogya Drishti Contactless Neonatal Monitoring Platform API", "status": "online"}

@app.post("/api/auth/login", response_model=UserToken)
def login(credentials: UserLogin):
    token = create_access_token({"sub": credentials.username, "role": credentials.role})
    return UserToken(access_token=token, role=credentials.role, username=credentials.username)

@app.get("/api/beds", response_model=List[BedStatus])
def get_beds():
    return BEDS_DB

@app.get("/api/beds/{bed_id}", response_model=BedStatus)
def get_bed_detail(bed_id: str):
    for bed in BEDS_DB:
        if bed.bed_id == bed_id:
            return bed
    raise HTTPException(status_code=404, detail="Bed not found")

@app.get("/api/xai/explanation/{bed_id}", response_model=XAIExplanation)
def get_xai_explanation(bed_id: str):
    return XAIExplanation(
        bed_id=bed_id,
        confidence_percentage=94.2,
        primary_roi="Forehead & Bilateral Cheeks",
        signal_snr_db=16.8,
        explanation_text="Heart rate estimation derived from 12Hz periodic facial color fluctuation extracted via Plane-Orthogonal-to-Skin (POS) rPPG signal analysis. Facial ROI tracking maintains high confidence under mild infant motion.",
        visual_evidence_heatmap_url="/heatmaps/roi_overlay.png"
    )

@app.get("/api/audit-logs", response_model=List[AuditLog])
def get_audit_logs():
    return AUDIT_LOGS

@app.websocket("/ws/telemetry/{bed_id}")
async def websocket_telemetry_endpoint(websocket: WebSocket, bed_id: str):
    await telemetry_ws_manager.connect(bed_id, websocket)
    try:
        t = 0
        base_hr = 130.0
        base_rr = 42.0
        
        if bed_id == "BED-103":
            base_hr = 95.0 # Low HR / Bradycardia simulation
        elif bed_id == "BED-102":
            base_hr = 165.0 # Tachycardia simulation

        while True:
            t += 0.1
            # Simulate real-time POS rPPG waveform sampling at 10Hz
            ppg = float(np.sin(2 * np.pi * 2.1 * t) + 0.3 * np.cos(2 * np.pi * 4.2 * t))
            hr = float(base_hr + 3.0 * np.sin(0.2 * t) + random.uniform(-1.0, 1.0))
            rr = float(base_rr + 2.0 * np.cos(0.1 * t) + random.uniform(-0.5, 0.5))
            motion = float(max(0.1, 1.0 + random.uniform(-0.3, 0.5)))
            pain = float(max(0.0, 1.2 + random.uniform(-0.2, 0.4)))
            
            alarm = None
            if hr < 100:
                alarm = "Bradycardia Alert (HR < 100 BPM)"
            elif hr > 160:
                alarm = "Tachycardia Alert (HR > 160 BPM)"

            point = TelemetryPoint(
                timestamp=datetime.now().strftime("%H:%M:%S.%f")[:-3],
                ppg_signal=round(ppg, 3),
                heart_rate=round(hr, 1),
                respiratory_rate=round(rr, 1),
                motion_index=round(motion, 2),
                pain_score=round(pain, 1),
                signal_quality_snr_db=15.4,
                confidence_percentage=94.5,
                alarm_triggered=alarm
            )

            await websocket.send_json(point.dict())
            await asyncio.sleep(0.1) # 10 updates per second
    except WebSocketDisconnect:
        telemetry_ws_manager.disconnect(bed_id, websocket)
