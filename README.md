# ubuntu-careers

Umuntu, ngumuntu ngolwazi.A web app to fetch LinkedIn job descriptions, restructure CVs, generate interview questions, and export CVs to PDF.

## File Structure

```
career-prep-tool/
├── backend/
│   ├── src/server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── public/index.html
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Prerequisites

* Docker and Docker Compose
* Proxycurl API key ([https://nubela.co/proxycurl](https://nubela.co/proxycurl))

## Setup

1. **Clone Repository** :

```bash
   git clone <repo-url>
   cd career-prep-tool
```

1. **Configure Environment** :

* Copy `backend/.env.example` to `backend/.env`.
* Set `PROXYCURL_API_KEY`:
  ```bash
  echo "PROXYCURL_API_KEY=your_proxycurl_api_key" > backend/.env
  echo "PORT=3001" >> backend/.env
  ```

1. **Build and Run** :

```bash
   docker-compose up --build
```

1. **Access** :

* Frontend: [http://localhost:3000](http://localhost:3000/)
* Backend: [http://localhost:3001](http://localhost:3001/)

## Testing

1. **Job Description** :

* Enter URL: `https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4228441219`
* Verify `jobInput` populates.

1. **CV Upload** :

* Upload PDF/TXT CV.
* Check `resumeInput`.

1. **Restructure CV** :

* Click "Restructure CV".
* Ensure `resumeOutput` contains formatted CV without overflow.

1. **PDF Export** :

* Click "Export to PDF".
* Verify `restructured_cv.pdf` downloads.
* Check console (F12) for logs.

1. **Interview Prep** :

* Click "Generate Questions".
* Verify 3 questions in `interviewOutput`.

## Troubleshooting

* **PDF Export** :
* Console error: `jsPDF not loaded` → Check CDN or browser network.
* Blank PDF → Restructure CV first.
* **Backend** :
* `Invalid Proxycurl API key` → Verify key in `.env`.
* Test: `curl -X POST -H "Content-Type: application/json" -d '{"url":"https://www.linkedin.com/jobs/view/4228441219"}' http://localhost:3001/fetch-job`
* **Docker** :
* Port conflict:
  ```bash
  docker ps
  docker stop <container_id>
  ```
* View logs:
  ```bash
  docker-compose logs backend
  docker-compose logs frontend
  ```

## Notes

* Proxycurl costs ~$0.02 per fetch.
* For DOCX CVs, add `mammoth.js`.
* Deploy to Render (backend) and Netlify (frontend) for production.
