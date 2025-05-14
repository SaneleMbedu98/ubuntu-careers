from fastapi import APIRouter
from pydantic import BaseModel
from app.services.recommendation import JobRecommender

router = APIRouter()

class JobSearchQuery(BaseModel):
    query: str

@router.post("/search")
async def search_jobs(query: JobSearchQuery):
    recommender = JobRecommender()
    jobs = recommender.get_recommendations(query.query)
    return {"jobs": jobs}
