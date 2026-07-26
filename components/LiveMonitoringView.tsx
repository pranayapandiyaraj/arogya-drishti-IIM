'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BedData } from './OverviewDashboard';
import { Activity, AlertTriangle, ArrowLeft, Camera, HeartPulse, RefreshCw, Volume2, VolumeX, ShieldAlert, Sparkles, Sliders } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import XAIDecisionSupport from './XAIDecisionSupport';
import { RoleType } from './RoleSelector';

interface LiveMonitoringViewProps {
  bed: BedData;
  onBack: () => void;
  userRole: RoleType;
}

interface WaveformPoint {
  time: string;
  ppg: number;
  hr: number;
  rr: number;
}

export default function LiveMonitoringView({ bed, onBack, userRole }: LiveMonitoringViewProps) {
  const [dataPoints, setDataPoints] = useState<WaveformPoint[]>([]);
  const [currentHr, setCurrentHr] = useState<number>(bed.heartRate);
  const [currentRr, setCurrentRr] = useState<number>(bed.respiratoryRate);
  const [motionIndex, setMotionIndex] = useState<number>(bed.motionIndex);
  const [painScore, setPainScore] = useState<number>(bed.painScore);
  const [alarm, setAlarm] = useState<string | null>(
    bed.status === 'Critical' ? 'Bradycardia Warning: HR < 100 BPM' : null
  );
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulate WebSocket Live Telemetry Streaming
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.15;

      let hrVar = bed.status === 'Critical' ? 94 + Math.sin(t) * 3 : 132 + Math.sin(t) * 4;
      let rrVar = 42 + Math.cos(0.5 * t) * 3;
      let ppgVal = Math.sin(2 * Math.PI * 2.1 * t) + 0.4 * Math.cos(2 * Math.PI * 4.2 * t);

      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' });

      setCurrentHr(Math.round(hrVar * 10) / 10);
      setCurrentRr(Math.round(rrVar * 10) / 10);
      setMotionIndex(Math.round((1.0 + Math.random() * 0.4) * 10) / 10);
      setPainScore(Math.round((0.8 + Math.random() * 0.3) * 10) / 10);

      setDataPoints((prev) => {
        const updated = [...prev, { time: timeStr, ppg: Math.round(ppgVal * 100) / 100, hr: Math.round(hrVar), rr: Math.round(rrVar) }];
        return updated.slice(-30); // Keep last 30 data points
      });
    }, 150);

    return () => clearInterval(interval);
  }, [bed]);

  // Render simulated MediaPipe FaceMesh & ROI Bounding Boxes on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const renderOverlay = () => {
      tick += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 10;
      const pulseOffset = Math.sin(tick * 3) * 2;

      // Draw Face Contour Mesh Points
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70 + pulseOffset, 0, 2 * Math.PI);
      ctx.stroke();

      // Draw ROI Bounding Boxes for POS rPPG (Forehead & Cheeks)
      // Forehead ROI Box
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 35, centerY - 55, 70, 25);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.fillRect(centerX - 35, centerY - 55, 70, 25);

      ctx.fillStyle = '#06b6d4';
      ctx.font = '9px monospace';
      ctx.fillText('ROI 1: FOREHEAD rPPG', centerX - 33, centerY - 60);

      // Left & Right Cheek ROI Boxes
      ctx.strokeStyle = '#10b981';
      ctx.strokeRect(centerX - 45, centerY - 15, 30, 30);
      ctx.strokeRect(centerX + 15, centerY - 15, 30, 30);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fillRect(centerX - 45, centerY - 15, 30, 30);
      ctx.fillRect(centerX + 15, centerY - 15, 30, 30);

      // Facial Mesh Keypoints (Eyes, Nose, Mouth)
      ctx.fillStyle = '#34d399';
      const keypoints = [
        [centerX - 25, centerY - 25],
        [centerX + 25, centerY - 25],
        [centerX, centerY],
        [centerX - 20, centerY + 25],
        [centerX + 20, centerY + 25]
      ];
      keypoints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });

      animId = requestAnimationFrame(renderOverlay);
    };

    renderOverlay();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header bar with return button */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beds
          </button>
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              Live Contactless Telemetry — Bed {bed.bed_number}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Patient: {bed.patientName}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
              isAudioMuted ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {isAudioMuted ? 'Muted' : 'Audio Alarm Active'}
          </button>
        </div>
      </div>

      {/* Threshold Alarm Banner if triggered */}
      {alarm && (
        <div className="bg-rose-950/80 border-2 border-rose-500 text-rose-200 rounded-2xl p-4 flex items-center justify-between shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">Physiological Alarm Triggered</h4>
              <p className="text-xs text-rose-300">{alarm}</p>
            </div>
          </div>
          <button
            onClick={() => setAlarm(null)}
            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow"
          >
            Acknowledge & Clear
          </button>
        </div>
      )}

      {/* Core Grid: Video Panel + Waveforms + XAI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video Feed & Real-time Waveforms (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Camera Feed with MediaPipe FaceMesh Canvas Overlay */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 relative shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs border-b border-slate-800 pb-2">
              <span className="text-slate-300 font-bold flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                Live RGB Camera Feed (30 FPS) — MediaPipe FaceMesh & POS ROI
              </span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                STREAM ACTIVE
              </span>
            </div>

            {/* Video Viewport Container */}
            <div className="relative w-full h-64 sm:h-80 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              {/* Simulated Infant Incubator Environment Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950 opacity-90" />

              {/* Canvas Overlay for Facial Landmark ROIs */}
              <canvas
                ref={canvasRef}
                width={360}
                height={260}
                className="relative z-10 w-full h-full object-contain"
              />

              {/* Live Overlay Indicators */}
              <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-300 font-mono space-y-0.5">
                <div>RGB ROIs: <span className="text-cyan-400 font-bold">Forehead + Cheeks</span></div>
                <div>rPPG POS SNR: <span className="text-emerald-400 font-bold">16.4 dB</span></div>
              </div>

              <div className="absolute bottom-4 right-4 z-20 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Contactless Motion Filtered
              </div>
            </div>
          </div>

          {/* Real-time PPG Waveform Plot */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  Remote PPG Pulse Waveform & Heart Rate (BPM)
                </h3>
                <p className="text-xs text-slate-400">Plane-Orthogonal-to-Skin (POS) continuous blood volume signal</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-rose-400 font-mono">{currentHr}</span>
                <span className="text-xs text-slate-400 ml-1">BPM</span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPoints}>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis domain={[-1.5, 1.5]} stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ppg"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Respiratory Rate Breathing Graph & Motion/Strain Index */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Respiratory Rate (RPM)
                </span>
                <span className="text-xl font-mono font-bold text-cyan-400">{currentRr} RPM</span>
              </div>
              <p className="text-[11px] text-slate-400">Extracted from chest/abdominal displacement</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Motion & Infant Pain Score
                </span>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-amber-400">Motion: {motionIndex}</span>
                  <span className="text-xs text-slate-400 block">Pain Score: {painScore}/10</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Prototype facial grimace & movement metric</p>
            </div>
          </div>
        </div>

        {/* Right Column: Explainable AI (XAI) Panel (4 cols) */}
        <div className="lg:col-span-4">
          <XAIDecisionSupport bedId={bed.bed_id} confidence={94.5} userRole={userRole} />
        </div>
      </div>
    </div>
  );
}
