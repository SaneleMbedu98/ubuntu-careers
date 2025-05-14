import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const HomePage = () => {
  const [jobSearch, setJobSearch] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/jobs/search', { query: jobSearch });
      router.push({
        pathname: '/results',
        query: { jobs: JSON.stringify(response.data.jobs) },
      });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Job Recommendation Platform</h1>
      <input
        type="text"
        value={jobSearch}
        onChange={(e) => setJobSearch(e.target.value)}
        placeholder="Enter job keywords..."
        className="p-2 border rounded w-80 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search Jobs
      </button>
    </div>
  );
};

export default HomePage;
