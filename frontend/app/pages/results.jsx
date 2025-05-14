import React from 'react';
import { useRouter } from 'next/router';

const ResultsPage = () => {
  const router = useRouter();
  const { jobs } = router.query;
  const jobList = jobs ? JSON.parse(jobs) : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Job Recommendations</h1>
      {jobList.length > 0 ? (
        <ul className="space-y-4">
          {jobList.map((job) => (
            <li key={job.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
