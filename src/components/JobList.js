import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  PageTitle,
} from '../styles';
import { useNavigate } from 'react-router-dom'; // useNavigate import

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
  console.log('BACKEND_HOST : ', BACKEND_HOST);

  useEffect(() => {
    axios
      // .get('http://localhost:5000/api/ar/job/select')
      .get(`${BACKEND_HOST}/api/ar/job/select`)
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (jobId) => {
    navigate(`/ar-list/${jobId}`);
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  return (
    <div>
      <PageTitle>AR Job List</PageTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader data-label="ID">ID</TableHeader>
            <TableHeader data-label="Title">Title</TableHeader>
            <TableHeader data-label="User Name">User Name</TableHeader>
            <TableHeader data-label="Account">Account</TableHeader>
            <TableHeader data-label="Created At">Created At</TableHeader>
            <TableHeader data-label="Updated At">Updated At</TableHeader>
            <TableHeader data-label="Complete YN">Complete YN</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {jobs.map((job) => (
            <TableRow
              key={job.job_id}
              onClick={() => handleRowClick(job.job_id)}
            >
              <TableCell data-label="ID">{job.job_id}</TableCell>
              <TableCell data-label="Title">{job.title}</TableCell>
              <TableCell data-label="User Name">{job.user_name}</TableCell>
              <TableCell data-label="Account">{job.account}</TableCell>
              <TableCell data-label="Created At">{job.created_at}</TableCell>
              <TableCell data-label="Updated At">
                {job.updated_at || '-'}
              </TableCell>
              <TableCell data-label="Complete YN">{job.complete_yn}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JobList;
