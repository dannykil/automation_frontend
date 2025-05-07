// prompt:
// 이전에 너가 만들어준 파일업로드 컴포넌트인데 기능을 추가하고 싶어. 아래 Instruction을 참고해서 수정 가능한지 확인해줘.
// Instruction:
// 목표 : 하나의 게시물을 등록하고 게시물을 등록할 때마다 여러개(한 번에 최대 5개)의 파일을 업로드할 수 있는 컴포넌트를 만들고 싶어.
// 1) 먼저 게시물을 등록하는 컴포넌트 개발해줘. 이건 너가 이전에 개발해준 파일업로드 컴포넌트에 '제목' 입력칸과 '등록'버튼 1개만 있으면 될 것 같아.
// 2)
// 1) 업로드된 파일 리스트를 보여주는 컴포넌트 생성(어디에서 과)
// 2) 업로드된 파일 리스트를 보여주는 화면에 '업로드' 버튼이 있고 이걸 클릭하면 너가 만들어준 아래 업로드 화면으로 이동.
// 3) 파일 업로드가 완료되면

// prompt:
// 현재 업로드 버튼을 클릭하면 GCS에 파일이 정상적으로 업로드되고 있어.
// 그런데 업로드된 파일 리스트를 보여주는 컴포넌트를 만들어야 하는데 소스 수정해줄 수 있어?

// prompt:
// 저장 버튼을 클릭하면 ${BACKEND_HOST}/api/file/save를 호출해서 제목과 업로드한 파일들의 제목을 저장하는 API를 호출하도록 수정해줘

// prompt:
// 1) 한 번에 업로드할 수 있는 파일의 수를 5개로 제한해줘
// 2) 파일을 올리면 파일이미지와 파일이름이 컴포넌트에 보여지는데 파일이미지가 없어서 깨지고 있어. 파일이미지는 그냥 빼줘
import React, { useState, useCallback } from 'react';
import { Button, ResponsiveInput } from '../styles';
import { useDropzone } from 'react-dropzone';

const SimpleUploaderWithList = () => {
  const [inputValue, setInputValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // 업로드할 파일 목록 (드래그 앤 드롭)
  const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSave = async () => {
    if (!inputValue) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (uploadedFiles.length === 0) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', inputValue);
    uploadedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${BACKEND_HOST}/api/file/upload`, {
        method: 'POST',
        body: formData,
      });

      console.log('upload response : ', response);

      if (response.ok) {
        const data = await response.json();
        if (data && data.redirectUrl && data.filenames) {
          alert(`업로드된 파일: ${data.filenames.join(', ')}`);
          window.location.href = data.redirectUrl;
          //   setTimeout(() => {
          //     window.location.href = data.redirectUrl;
          //   }, 3000);
        } else {
          alert('저장 및 업로드 성공했지만, 리다이렉트 정보가 없습니다.');
        }
      } else {
        alert('저장 및 업로드 실패.');
      }
    } catch (error) {
      console.error('저장 및 업로드 오류:', error);
      alert('저장 및 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  // 업로드할 파일 목록 UI (기존 드래그 앤 드롭 영역 활용)
  const thumbs = uploadedFiles.map((file) => (
    <div key={file.name}>
      <img
        src={file.preview}
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        alt={file.name}
      />
      <div>{file.name}</div>
    </div>
  ));

  return (
    <>
      <ResponsiveInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="제목"
      />
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} multiple />
        {isDragActive ? (
          <p>여기에 파일을 드롭하세요 ...</p>
        ) : (
          <p>여기에 파일을 드래그 앤 드롭하여 업로드할 파일을 추가하세요.</p>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          {thumbs}
        </div>
      </div>

      <Button onClick={handleSave} disabled={uploading}>
        {uploading ? '저장 및 업로드 중...' : '저장'}
      </Button>
    </>
  );
};

export default SimpleUploaderWithList;
