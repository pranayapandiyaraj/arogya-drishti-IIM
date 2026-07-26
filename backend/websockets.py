from fastapi import WebSocket
from typing import List, Dict
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, bed_id: str, websocket: WebSocket):
        await websocket.accept()
        if bed_id not in self.active_connections:
            self.active_connections[bed_id] = []
        self.active_connections[bed_id].append(websocket)

    def disconnect(self, bed_id: str, websocket: WebSocket):
        if bed_id in self.active_connections:
            self.active_connections[bed_id].remove(websocket)
            if not self.active_connections[bed_id]:
                del self.active_connections[bed_id]

    async def broadcast_telemetry(self, bed_id: str, data: dict):
        if bed_id in self.active_connections:
            for connection in self.active_connections[bed_id]:
                await connection.send_text(json.dumps(data))

telemetry_ws_manager = ConnectionManager()
