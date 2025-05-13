const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PROXYCURL_API_KEY = process.env.PROXYCURL_API_KEY;

// Validate API key on startup
if (!PROXYCURL_API_KEY) {
  console.error('ERROR: PROXYCURL_API_KEY is not set in environment variables.');
  process.exit(1);
}

app.post('/fetch-job', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      console.error('Request error: No URL provided');
      return res.status(400).json({ error: 'No URL provided' });
    }

    let jobId;
    const viewMatch = url.match(/\/jobs\/view\/(\d+)/);
    const queryMatch = url.match(/currentJobId=(\d+)/);
    if (viewMatch) {
      jobId = viewMatch[1];
    } else if (queryMatch) {
      jobId = queryMatch[1];
    } else {
      console.error(`Request error: Invalid LinkedIn job URL: ${url}`);
      return res.status(400).json({ error: 'Invalid LinkedIn job URL' });
    }

    const jobUrl = `https://www.linkedin.com/jobs/view/${jobId}`;
    console.log(`Fetching job description for job ID: ${jobId} (URL: ${jobUrl})`);

    const response = await axios.get('https://nubela.co/proxycurl/api/linkedin/job', {
      headers: { Authorization: `Bearer ${PROXYCURL_API_KEY}` },
      params: { url: jobUrl },
      timeout: 10000
    });

    const job = response.data;
    if (!job.description) {
      console.warn(`No description found for job ID: ${jobId}`);
      return res.status(404).json({ error: 'Job description not available' });
    }

    console.log(`Successfully fetched job description for job ID: ${jobId}`);
    res.json({ description: job.description });
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null
    };
    console.error('Error fetching job:', errorDetails);

    let errorMessage = 'Failed to fetch job description';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = 'Invalid Proxycurl API key';
          break;
        case 429:
          errorMessage = 'Proxycurl API rate limit exceeded';
          break;
        case 404:
          errorMessage = 'Job not found on LinkedIn';
          break;
        default:
          errorMessage = error.response.data.message || `Proxycurl API error (status ${error.response.status})`;
      }
    } else if (error.code === 'ECONNREFUSED' || error.code === 'EHOSTUNREACH') {
      errorMessage = 'Cannot connect to Proxycurl API server';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Proxycurl API request timed out';
    }

    res.status(error.response ? error.response.status : 500).json({ error: errorMessage });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log('Proxycurl API key configured successfully');
}).on('error', (err) => {
  console.error('ERROR starting server:', err);
  process.exit(1);
});