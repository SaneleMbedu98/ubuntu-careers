from fastapi import APIRouter, WebSocket
import asyncio

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            response = await asyncio.to_thread(lambda: f"Mock chatbot response to: {data}")  # Replace with Rasa/OpenAI
            await websocket.send_text(response)
    except Exception as e:
        await websocket.close()