import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  DetailItem,
  Label,
  Value,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from '../styles';

const TransparentContainer = styled.div`
  background-color: transparent;
  padding: 1rem;
  margin: 1rem;
`;

const DetailHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const InfoDetailsHeader = styled.h3`
  font-size: 1.2rem;
  margin-top: 5rem; /* 기존 2rem에서 1rem으로 줄임 */
  margin-bottom: 0.8rem;
  color: #333;
`;

const InfoItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

function ArDetail() {
  const { arInfoId } = useParams();
  const arDetail = JSON.parse(localStorage.getItem(`arDetail-${arInfoId}`));

  console.log('arDetail:', arDetail);
  const detailsString = arDetail?.ar_info_details;
  console.log('arDetail.ar_info_details:', detailsString);
  console.log('typeof detailsString:', typeof detailsString);

  let parsedArInfoDetails = [];
  if (detailsString) {
    if (typeof detailsString === 'string') {
      const objectStrings = detailsString
        .substring(1, detailsString.length - 1)
        .split('},{');
      try {
        parsedArInfoDetails = objectStrings.map((str) => {
          const jsonString = '{' + str + '}';
          const fixedJsonString = jsonString.endsWith('}')
            ? jsonString
            : jsonString + '}';
          return JSON.parse(fixedJsonString);
        });
      } catch (error) {
        console.error('ar_info_details 문자열 파싱 에러:', error);
        parsedArInfoDetails = [];
      }
    } else if (Array.isArray(detailsString)) {
      parsedArInfoDetails = detailsString;
    } else if (typeof detailsString === 'object' && detailsString !== null) {
      parsedArInfoDetails = [detailsString];
    } else {
      console.warn(
        'ar_info_details가 처리되지 않는 타입입니다:',
        typeof detailsString
      );
    }
  }

  const basicInfoKeys = Object.keys(arDetail || {}).filter(
    (key) =>
      ![
        'ar_info_id',
        'job_id',
        // 'transaction_date',
        // 'bill_to_name',
        'ar_info_details',
      ].includes(key)
  );

  return (
    <TransparentContainer>
      <DetailHeader>AR 상세 정보 (AR Info ID: {arInfoId})</DetailHeader>
      <InfoItemWrapper>
        {basicInfoKeys.map((key) => (
          <div key={key}>
            <Label>
              {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </Label>
            <Value>{String(arDetail[key])}</Value>
          </div>
        ))}
      </InfoItemWrapper>

      {parsedArInfoDetails.length > 0 && (
        <>
          <InfoDetailsHeader>AR Info Details</InfoDetailsHeader>
          <Table>
            <TableHead>
              <TableRow>
                {parsedArInfoDetails[0] &&
                  Object.keys(parsedArInfoDetails[0]).map((key) => (
                    <TableHeader
                      key={key}
                      data-label={key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    >
                      {key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </TableHeader>
                  ))}
              </TableRow>
            </TableHead>
            <tbody>
              {parsedArInfoDetails.map((detail, index) => (
                <TableRow key={index}>
                  {Object.values(detail).map((value, index) => (
                    <TableCell
                      key={index}
                      data-label={
                        parsedArInfoDetails[0] &&
                        Object.keys(parsedArInfoDetails[0])
                          [index].replace(/_/g, ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())
                      }
                    >
                      {String(value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <Button as={Link} to={`/ar-list/${arDetail?.job_id || ''}`}>
          목록으로 돌아가기
        </Button>
      </div>
    </TransparentContainer>
  );
}

export default ArDetail;
