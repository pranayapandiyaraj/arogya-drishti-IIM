from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class RoleEnum:
    NICU_DOCTOR = "NICU Doctor"
    NICU_NURSE = "NICU Nurse"
    HOSPITAL_ADMIN = "Hospital Administrator"
    RESEARCHER_AUDITOR = "Researcher/Auditor"

class UserLogin(BaseModel):
    username: str
    password: str
    role: str = RoleEnum.NICU_DOCTOR

class UserToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    username: str

class Patient(BaseModel):
    id: str
    name: str
    gestational_age_weeks: int
    birth_weight_grams: int
    admission_date: str
    attending_physician: str
    risk_level: str = "Normal" # Normal, High, Critical

class BedStatus(BaseModel):
    bed_id: str
    bed_number: str
    ward: str = "NICU Ward A"
    status: str # "Normal" (Green), "Caution" (Yellow), "Critical" (Red)
    patient: Optional[Patient] = None
    heart_rate_bpm: float = 125.0
    respiratory_rate_rpm: float = 42.0
    motion_activity_index: float = 1.2
    pain_score: float = 0.5 # 0 to 10 scale
    camera_status: str = "Connected"
    last_updated: str

class TelemetryPoint(BaseModel):
    timestamp: str
    ppg_signal: float
    heart_rate: float
    respiratory_rate: float
    motion_index: float
    pain_score: float
    signal_quality_snr_db: float
    confidence_percentage: float
    alarm_triggered: Optional[str] = None # None, "Bradycardia", "Tachycardia", "Tachypnea", "Apnea"

class XAIExplanation(BaseModel):
    bed_id: str
    confidence_percentage: float
    primary_roi: str = "Forehead & Upper Cheeks"
    signal_snr_db: float
    explanation_text: str
    visual_evidence_heatmap_url: str

class AuditLog(BaseModel):
    id: str
    timestamp: str
    user: str
    role: str
    action: str
    details: str
    ip_address: str = "192.168.1.104"
