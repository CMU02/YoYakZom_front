// DataViewer.jsx
import React from 'react';
import { useDataStore } from './data';

const DataViewer = () => {
  const data = useDataStore((state) => state.data);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">저장된 데이터 ({data.length}개)</h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataViewer;