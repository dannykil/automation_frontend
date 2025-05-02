import React, { useState, useCallback } from 'react';

const SimpleUploader = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDropEvent = useCallback((event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/file/upload', {
        //   const response = await fetch('${BACKEND_HOST}/api/file/upload', {
        // 백엔드 업로드 API 엔드포인트
        method: 'POST',
        body: formData,
      });

      console.log('response : ', response);

      if (response.ok) {
        alert('파일 업로드 성공!');
        setFile(null);
      } else {
        alert('파일 업로드 실패.');
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      onDrop={handleDropEvent}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {file ? (
        <div>선택된 파일: {file.name}</div>
      ) : (
        <div>여기에 파일을 드래그 앤 드롭하세요</div>
      )}
      <button onClick={handleUpload} style={{ marginTop: '10px' }}>
        업로드
      </button>
    </div>
  );
};

export default SimpleUploader;
