from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from pymongo import MongoClient
import os

class JobRecommender:
    def __init__(self):
        # Connect to MongoDB
        client = MongoClient(os.getenv("MONGODB_URI", "mongodb://mongo:27017/job_db"))
        db = client["job_db"]
        self.jobs_collection = db["jobs"]
        
        # Mock data if collection is empty (replace with real data in production)
        if self.jobs_collection.count_documents({}) == 0:
            self.jobs_collection.insert_many([
                {"id": 1, "title": "Software Engineer", "description": "Develop web applications using Python and React"},
                {"id": 2, "title": "Data Scientist", "description": "Analyze data and build ML models"},
            ])
        
        # Load jobs into DataFrame
        self.jobs = pd.DataFrame(list(self.jobs_collection.find({}, {"_id": 0})))
        self.vectorizer = TfidfVectorizer()

    def get_recommendations(self, query: str, top_n: int = 5):
        # Vectorize job descriptions and query
        job_texts = self.jobs["description"].tolist()
        vectors = self.vectorizer.fit_transform(job_texts + [query])
        
        # Calculate similarity
        similarity_scores = cosine_similarity(vectors[-1], vectors[:-1]).flatten()
        top_indices = similarity_scores.argsort()[-top_n:][::-1]
        
        # Return top jobs
        return self.jobs.iloc[top_indices][["id", "title", "description"]].to_dict(orient="records")
