from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import jobs

app = FastAPI(title="Job Recommendation API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Job Recommendation API"}
