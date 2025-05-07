// prompt:
// 1) 업로드된 파일 리스트를 클릭하면 알림창이 뜨면서 '파일 분석을 시작하시겠습니까?'라는 메시지가 뜨고,
// 2) '확인'버튼을 클릭하면 백엔드 api(/api/parser)를 호출해서 파일 분석을 시작하도록 수정해줘.
// 이때 api를 호출해서 처리되고 response를 받기까지 '파일 분석 중입니다...'라는 메시지를 로딩바와 함께 보여줘.
// 3) '취소'버튼을 클릭하면 아무일도 일어나지 않도록 수정해줘.

// prompt:
// startFileAnalysis에서 api를 호출해 분석을 시작하는데 요청할 때 id, board_id, filename을 같이 보내줘. 백엔드에서 이 조건을 기준으로 파일을 찾고 상태 업데이트를 할 예정이야.

// prompt:
// 업로드된 파일명을 클릭하면 handleFileClick()이 호출되는데 '확인'버튼을 클릭하면 id, filename은 모두 값이 있는데 board_id만 undefined로 나와. 값을 못가져오고 있는 것 같은데 확인해줄 수 있어?

// prompt:
// startFileAnalysis()에서 파일을 분석/추출하는 API를 호출하고 성공하면 response로 추출에 성공한 데이터를 읽어오는데 그 내용을 출력하는 컴포넌트 추가해줄 수 있어?

// prompt:
// 아래 리액트 소스코드에서 startFileAnalysis 함수를 호출하면 분석이 진행중인 버튼이 '파일 분석 중...'로 바뀌고 있어.
// 그런데 문제는 해당 버튼만 그러는게 아니라 다른 버튼들도 다 '파일 분석 중...'라고 뜨고 있는데 이걸 board_id를 기준으로 바꿔줘야 할 것 같아.

// prompt:
// startFileAnalysis 함수를 호출하면 파일 분석이 시작되고 정상적으로 종료되면 DB에 Insert 되면서

// prompt:
// fetchBoardsAndFiles 함수를 통해 게시글 목록을 가져오고 있는데 컴포넌트를 화면에 그려줄 때 analsys_yn이 'Y'인 경우 해당 파일에 취소선을 그어주고 클릭하면 이벤트(startFileAnalysis)가 발생 안되게 할 수 있어?

// prompt:
// startFileAnalysis 함수를 호출해서 api로 부터 response를 받기 전까지 '파일 분석중...'이 라는 메시지가 테이블 row에 보이는데
// 이걸 화면 전체에 회색(투명) 바탕으로 모든 버튼을 비활성화 시키고 '파일 분석중...'이라는 메시지를 보여주도록 수정해줘.

// prompt:
// fetchBoardsAndFiles 함수를 호출하면 boards, files, analysis 결과를 가져오는데 startFileAnalysis 함수도 동일하게 맞춰놨어.
// 근데 fetchBoardsAndFiles 호출하면 정상적으로 데이터가 다 보이는데 startFileAnalysis 호출해서 결과를 받아오면 이벤트를 발생시킨 컴포넌트에만 결과가 보이고 나머지는 안보여.
// console.log로 찍어보면 정상적으로 데이터가 다 들어오는데 화면에 그려지지 않아. 이거 확인해줄 수 있어?

// prompt:
// 소스 전체를 다시 한 번 검토해봐줄 수 있어? 도저히 잘못된 부분을 못찾겠어.
import React, { useState, useEffect } from 'react';
import {
  UploadedFileListContainer,
  UploadedFileListTitle,
  UploadedFileListTable,
  UploadedFileListTableHeader,
  UploadedFileListTableRow,
  UploadedFileListTableHeaderCell,
  UploadedFileListTableCell,
  Button, // Import Button 컴포넌트
} from '../styles';
import { Link } from 'react-router-dom'; // Import Link 컴포넌트
import styled from 'styled-components';

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 회색 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소들보다 위에 표시 */
`;

const AnalysisMessage = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const BoardListWithFiles = () => {
  const [boards, setBoards] = useState([]);
  const [analysisResults, setAnalysisResults] = useState({}); // board_id를 키로 갖는 분석 결과 객체
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [errorBoards, setErrorBoards] = useState(null);
  const [parsingFileByBoard, setParsingFileByBoard] = useState({}); // board_id를 키로 갖고 파일명을 값으로 갖는 객체
  const [isAnalyzing, setIsAnalyzing] = useState(false); // 분석 중 상태 관리
  const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

  useEffect(() => {
    const fetchBoardsAndFiles = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/api/file/boards`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('boards data : ', data);
        setBoards(data);
        setLoadingBoards(false);
      } catch (e) {
        setErrorBoards(e);
        setLoadingBoards(false);
      }
    };

    fetchBoardsAndFiles();
  }, []);

  const handleFileClick = (file) => {
    if (file['analysis_yn'] === 'Y') {
      return; // analysis_yn이 'Y'인 경우 클릭 이벤트 무시
    }
    if (window.confirm(`'${file.filename}' 파일 분석을 시작하시겠습니까?`)) {
      startFileAnalysis(file.id, file.board_id, file.filename, file.filepath);
    }
  };

  //   const startFileAnalysis = async (id, board_id, filename, filepath) => {
  //     setIsAnalyzing(true); // 분석 시작 시 상태를 true로 변경
  //     // 해당 board_id에 대해 분석 중인 파일명을 상태에 저장 (화면 업데이트용)
  //     setParsingFileByBoard((prev) => ({ ...prev, [board_id]: filename }));
  //     try {
  //       const response = await fetch(`${BACKEND_HOST}/api/parser/test`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           id: id,
  //           board_id: board_id,
  //           filename: filename,
  //           filepath: filepath,
  //         }),
  //       });

  //       console.log('analysis response : ', response);

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('boards data : ', data);
  //         setBoards(data);
  //       } else {
  //         const errorData = await response.json();
  //         alert(
  //           `'${filename}' 파일 분석 실패: ${
  //             errorData.error || '알 수 없는 오류'
  //           }`
  //         );
  //       }
  //     } catch (error) {
  //       console.error('파일 분석 오류:', error);
  //       alert(`'${filename}' 파일 분석 중 오류 발생: ${error.message}`);
  //     } finally {
  //       setIsAnalyzing(false); // 분석 완료 또는 실패 시 상태를 false로 변경
  //       // 분석이 완료되면 해당 board_id의 분석 중인 파일명 상태를 null로 초기화
  //       setParsingFileByBoard((prev) => {
  //         const newState = { ...prev };
  //         delete newState[board_id];
  //         return newState;
  //       });
  //     }
  //   };

  const startFileAnalysis = async (id, board_id, filename, filepath) => {
    setIsAnalyzing(true);
    setParsingFileByBoard((prev) => ({ ...prev, [board_id]: filename }));
    try {
      const response = await fetch(`${BACKEND_HOST}/api/parser/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          board_id: board_id,
          filename: filename,
          filepath: filepath,
        }),
      });

      console.log('analysis response : ', response);

      if (response.ok) {
        const data = await response.json();
        console.log('analysis data on success : ', data);

        // prompt:
        // 확인해보니 return 부분에서 data.analysis가 undefined로 나와서 업데이트가 돼도 컴포넌트에 반영이 안되고 있어.
        // 로직이 잘못된 것 같은데 확인해줄 수 있어?
        setBoards((prevBoards) =>
          prevBoards.map((board) => {
            if (board.id === board_id) {
              //   console.log('board : ', board);
              //   console.log('board.analysis : ', board.analysis);
              //   console.log('board.analysis  : ', board.analysis);
              //   console.log('board.analysis.length : ', board.analysis.length);
              for (let i = 0; i < data.length; i++) {
                console.log('data[i].id : ', data[i].id);
                if (data[i].id === board_id) {
                  console.log('data[i].analysis : ', data[i].analysis);
                  console.log('data[i].files    : ', data[i].files);
                  return {
                    ...board,
                    analysis: data[i].analysis || [],
                    files: data[i].files || [],
                  };
                  //   return { ...board, board: data[i] };
                }
              }
              //   console.log('data  : ', data);
              //   console.log('data.analysis  : ', data.analysis);

              //   return { ...board, analysis: data.analysis || [] }; // [원본]분석 결과 업데이트(안됨) // 발주처 테이블 자체가 안보임
              //   return { ...board, board: data }; // 발주처 테이블 자체가 안보임(원본과 동일)
              //   return { ...board, board.analysis: data.analysis || [] }; // 분석 결과 업데이트(안됨) - 오류
              //   return board; // (안됨) 입력되기 전/후 차이없음(테이블은 있으나 추가(분석)된 내용은 업데이트 안됨)
              //   return { ...board, analysis: data.analysis }; // 발주처 테이블 자체가 안보임(원본과 동일)
            }
            return board;
          })
        );
      } else {
        const errorData = await response.json();
        alert(
          `'${filename}' 파일 분석 실패: ${
            errorData.error || '알 수 없는 오류'
          }`
        );
      }
    } catch (error) {
      console.error('파일 분석 오류:', error);
      alert(`'${filename}' 파일 분석 중 오류 발생: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
      setParsingFileByBoard((prev) => {
        const newState = { ...prev };
        delete newState[board_id];
        return newState;
      });
    }
  };

  if (loadingBoards) {
    return <div>Loading boards and files...</div>;
  }

  if (errorBoards) {
    return <div>Error: {errorBoards.message}</div>;
  }

  return (
    <div>
      {isAnalyzing && (
        <FullScreenOverlay>
          <AnalysisMessage>파일 분석중...</AnalysisMessage>
        </FullScreenOverlay>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <UploadedFileListTitle>게시글 목록</UploadedFileListTitle>
        <Link to="/fileupload">
          <Button disabled={isAnalyzing}>등록</Button>
        </Link>
      </div>
      {boards.length > 0 ? (
        boards.map((board) => (
          <div
            key={board.id}
            style={{
              marginBottom: '2rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              padding: '1rem',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem' }}>
              {board.title} : {board.id}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#777' }}>
              작성일: {new Date(board.created_at).toLocaleDateString()}
            </p>
            {board.analysis && board.analysis.length > 0 ? (
              <UploadedFileListTable>
                <UploadedFileListTableHeader>
                  <UploadedFileListTableRow>
                    <UploadedFileListTableHeaderCell>
                      발주처
                    </UploadedFileListTableHeaderCell>
                    <UploadedFileListTableHeaderCell>
                      발주품목
                    </UploadedFileListTableHeaderCell>
                    <UploadedFileListTableHeaderCell>
                      발주수량
                    </UploadedFileListTableHeaderCell>
                  </UploadedFileListTableRow>
                </UploadedFileListTableHeader>
                <tbody>
                  {board.analysis.map((analysis, index) => (
                    <UploadedFileListTableRow key={index}>
                      <UploadedFileListTableCell>
                        {analysis.ordering_company} : {analysis.board_id}
                      </UploadedFileListTableCell>
                      <UploadedFileListTableCell>
                        {analysis.order_item}
                      </UploadedFileListTableCell>
                      <UploadedFileListTableCell>
                        {analysis.order_quantity}
                      </UploadedFileListTableCell>
                    </UploadedFileListTableRow>
                  ))}
                </tbody>
              </UploadedFileListTable>
            ) : (
              <p
                style={{
                  fontStyle: 'italic',
                  color: '#999',
                  marginTop: '0.5rem',
                }}
              >
                분석된 파일이 없습니다.
              </p>
            )}
            {board.files && board.files.length > 0 ? (
              <UploadedFileListTable>
                <UploadedFileListTableHeader>
                  <UploadedFileListTableRow>
                    <UploadedFileListTableHeaderCell>
                      파일명
                    </UploadedFileListTableHeaderCell>
                    <UploadedFileListTableHeaderCell>
                      파일경로
                    </UploadedFileListTableHeaderCell>
                    <UploadedFileListTableHeaderCell>
                      크기
                    </UploadedFileListTableHeaderCell>
                  </UploadedFileListTableRow>
                </UploadedFileListTableHeader>
                <tbody>
                  {board.files.map((file, index) => (
                    <UploadedFileListTableRow
                      key={index}
                      onClick={() => handleFileClick(file)}
                      style={{
                        cursor:
                          file['analysis_yn'] === 'Y' || isAnalyzing
                            ? 'default'
                            : 'pointer',
                      }}
                    >
                      <UploadedFileListTableCell
                        style={{
                          textDecoration:
                            file['analysis_yn'] === 'Y'
                              ? 'line-through'
                              : 'none',
                          color:
                            file['analysis_yn'] === 'Y' ? '#999' : 'inherit',
                        }}
                      >
                        {file.filename} : {file.board_id}
                      </UploadedFileListTableCell>
                      <UploadedFileListTableCell
                        style={{
                          textDecoration:
                            file['analysis_yn'] === 'Y'
                              ? 'line-through'
                              : 'none',
                          color:
                            file['analysis_yn'] === 'Y' ? '#999' : 'inherit',
                        }}
                      >
                        {file.filepath}
                      </UploadedFileListTableCell>
                      <UploadedFileListTableCell
                        style={{
                          textDecoration:
                            file['analysis_yn'] === 'Y'
                              ? 'line-through'
                              : 'none',
                          color:
                            file['analysis_yn'] === 'Y' ? '#999' : 'inherit',
                        }}
                      >
                        {parsingFileByBoard[board.id] === file.filename
                          ? '파일 분석 중...'
                          : `${(file.filesize / 1024).toFixed(2)} KB`}
                      </UploadedFileListTableCell>
                    </UploadedFileListTableRow>
                  ))}
                </tbody>
              </UploadedFileListTable>
            ) : (
              <p
                style={{
                  fontStyle: 'italic',
                  color: '#999',
                  marginTop: '0.5rem',
                }}
              >
                첨부된 파일이 없습니다.
              </p>
            )}
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#999' }}>
          현재 게시글이 없습니다.
        </p>
      )}
    </div>
  );
};

export default BoardListWithFiles;
