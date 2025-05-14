from fastapi import APIRouter
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64

router = APIRouter()

@router.get("/trends")
async def get_hiring_trends():
    # Mock data (replace with database query)
    data = pd.DataFrame({
        "month": ["2025-01", "2025-02", "2025-03"],
        "job_count": [100, 120, 150]
    })
    
    # Generate plot
    plt.figure(figsize=(8, 6))
    plt.plot(data["month"], data["job_count"], marker='o')
    plt.title("Hiring Trends")
    plt.xlabel("Month")
    plt.ylabel("Job Postings")
    
    # Save to buffer
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()
    
    return {"plot": f"data:image/png;base64,{img_str}"}