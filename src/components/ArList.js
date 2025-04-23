import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  Button,
} from '../styles';
import styled from 'styled-components';

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function ArList() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [arDetails, setArDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setArDetails(null);
    axios
      .get(`http://localhost:5000/api/ar/info/select/${jobId}`)
      .then((response) => {
        console.log(`AR 상세 정보 (Job ID: ${jobId}):`, response.data);
        setArDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`AR 상세 정보(${jobId}) 로딩 실패:`, error);
        setError(error);
        setLoading(false);
      });
  }, [jobId]);

  const handleRowClick = (arInfo) => {
    localStorage.setItem(
      `arDetail-${arInfo.ar_info_id}`,
      JSON.stringify(arInfo)
    );
    navigate(`/ar/${arInfo.ar_info_id}`);
  };

  if (loading) {
    return <div>Loading AR details for Job ID: {jobId}...</div>;
  }

  if (error) {
    return (
      <div>
        Error loading AR details for Job ID: {jobId}: {error.message}
        <Button as={Link} to="/">
          Back to Job List
        </Button>
      </div>
    );
  }

  if (!arDetails || arDetails.length === 0) {
    return (
      <div>
        No AR details available for Job ID: {jobId}.
        <Button as={Link} to="/">
          Back to Job List
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2>AR 상세 목록 (Job ID: {jobId})</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader data-label="AR Info ID">AR Info ID</TableHeader>
            <TableHeader data-label="Job ID">Job ID</TableHeader>
            <TableHeader data-label="Transaction Date">
              Transaction Date
            </TableHeader>
            <TableHeader data-label="Bill To Name">Bill To Name</TableHeader>
            {/* 필요에 따라 더 많은 헤더 추가 */}
          </TableRow>
        </TableHead>
        <tbody>
          {arDetails.map((arInfo) => (
            <StyledTableRow
              key={arInfo.ar_info_id}
              onClick={() => handleRowClick(arInfo)}
            >
              <TableCell data-label="AR Info ID">{arInfo.ar_info_id}</TableCell>
              <TableCell data-label="Job ID">{arInfo.job_id}</TableCell>
              <TableCell data-label="Transaction Date">
                {arInfo.transaction_date}
              </TableCell>
              <TableCell data-label="Bill To Name">
                {arInfo.bill_to_name}
              </TableCell>
              {/* 필요에 따라 더 많은 셀 추가 */}
            </StyledTableRow>
          ))}
        </tbody>
      </Table>
      {/* <Button as={Link} to="/">
        Back to Job List
      </Button> */}
    </div>
  );
}

export default ArList;
