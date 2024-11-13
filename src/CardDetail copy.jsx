import React from 'react';
import DataViewer from './dataViewer';
import DataDownloader from './dataDownloader';

function CardDetail({ card, onBack, cardData}) {
  const fullCardInfo = cardData.find(item => item.id === card.id);

  return (
    <div className="card-detail">
      <button onClick={onBack}>Back</button>
      {/* <div>
      <DataDownloader />
      <DataViewer />
      </div> */}
      <h2>{card.title}</h2>
      {/* <p>id : {fullCardInfo.id}</p>
      <p>제목 : {fullCardInfo.title}</p>
      <p>요약 : {fullCardInfo.summary}</p> */}
      {/* <p>내용 : {fullCardInfo.detail}</p>
      <p>날짜 : {fullCardInfo.date}</p>
      <p>조회수 : {fullCardInfo.views}</p> */}
      <div>
      <DataDownloader />
      <DataViewer />
      </div>
    </div>
  );
}

export default CardDetail;
