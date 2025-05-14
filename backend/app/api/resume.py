from fastapi import APIRouter, UploadFile, File
import spacy
from app.services.resume_parser import ResumeParser

router = APIRouter()

@router.post("/parse")
async def parse_resume(file: UploadFile = File(...)):
    content = await file.read()
    parser = ResumeParser()
    analysis = parser.analyze_resume(content.decode("utf-8"))
    return {"analysis": analysis}