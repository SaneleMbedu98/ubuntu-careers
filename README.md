# Job Recommendation Platform

A full-stack application for AI-powered job recommendations, resume parsing, career guidance chatbot, and hiring trend analytics.

## Directory Structure
- **frontend/**: Next.js frontend with React and TailwindCSS
- **backend/**: FastAPI backend with ML and NLP services
- **docker/**: Docker configurations for frontend and backend
- **docker-compose.yml**: Local development setup
- **.gitignore**: Git ignore rules

## Setup
1. Install Docker and Docker Compose on Ubuntu:
   - `sudo apt update && sudo apt install docker.io docker-compose`
   - `sudo usermod -aG docker $USER` (then log out and back in)
2. Navigate to `frontend/` and run `npm install` (optional for local dev).
3. Navigate to `backend/` and run `pip install -r requirements.txt` (optional for local dev).
4. Run `docker-compose up --build` to build and start the services, including MongoDB.
5. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Tech Stack
- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **AI/ML**: scikit-learn, spaCy, TensorFlow
- **Hosting**: Docker, AWS, Vercel

## Docker Deployment
- Build images: `docker-compose build`
- Run containers: `docker-compose up`
- Stop containers: `docker-compose down`
