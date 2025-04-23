import React from 'react';
import { TableRow, TableCell } from '../styles';

function JobListItem({ job }) {
  return (
    <TableRow key={job.job_id}>
      <TableCell>{job.job_id}</TableCell>
      <TableCell>{job.title}</TableCell>
      <TableCell>{job.user_name}</TableCell>
      <TableCell>{job.account}</TableCell>
      <TableCell>{job.created_at}</TableCell>
      <TableCell>{job.updated_at || '-'}</TableCell>
      <TableCell>{job.complete_yn}</TableCell>
    </TableRow>
  );
}

export default JobListItem;
