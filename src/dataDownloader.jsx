import React, { useState } from 'react';
import { useDataStore } from './data';

const DataDownloader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setData, currentId, setCurrentId } = useDataStore();

  const fetchAndSaveData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ID로 단일 데이터만 가져오기
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${currentId}`
      );
      const data = await response.json();
      
      // 단일 데이터를 배열로 감싸서 저장
      setData([data]);
      
      // // 파일 저장
      // const jsonString = JSON.stringify([data], null, 2);
      // const blob = new Blob([jsonString], { type: 'application/json' });
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = 'data.json';
      
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(url);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ID는 1부터 100까지 있습니다 (JSONPlaceholder API 기준)
  const handlePrevious = () => {
    if (currentId > 1) {
      setCurrentId(currentId - 1);
    }
  };

  const handleNext = () => {
    if (currentId < 100) {
      setCurrentId(currentId + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center mb-4">
        <button
          onClick={fetchAndSaveData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? '다운로드 중...' : '데이터 다운로드'}
        </button>

        <div className="flex gap-2 items-center">
          <button
            onClick={handlePrevious}
            disabled={currentId === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100"
          >
            이전
          </button>
          <span>ID: {currentId}</span>
          <button
            onClick={handleNext}
            disabled={currentId === 100}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            다음
          </button>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-red-500">
          에러 발생: {error}
        </p>
      )}

      {/* 현재 데이터 표시 */}
      {useDataStore((state) => state.data).map((item) => (
        <div key={item.id} className="border p-4 rounded mt-4">
          <h3 className="font-bold">ID: {item.id}</h3>
          <h4 className="font-semibold mt-2">{item.title}</h4>
          <p className="mt-2">{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default DataDownloader;