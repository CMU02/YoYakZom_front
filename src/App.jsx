import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from './CardList';
import CardDetail from './CardDetail';
import Categories from './Categories';
import axios from 'axios';
import { cardData } from './data';
import DataDownloader from './dataDownloader';
import DataViewer from './dataViewer';

function App() {
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 저장
  const [selectedCategory, setSelectedCategory] = useState(null); 

  // 카드 클릭 시 실행되는 함수
  const handleCardClick = (card) => {
    setSelectedCard(card); // 선택된 카드 저장
  };

  // 뒤로가기 함수
  const handleBack = () => {
    setSelectedCard(null); // 선택된 카드 초기화 (목록으로 돌아감)
  };

  // 카테고리 선택 시 실행되는 함수
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // 필요한 로직 추가 가능 (예: 해당 카테고리에 맞는 카드 필터링 등)
  };

  const [data, setData] = useState(null);
  
  
  const onClick = () => {
    axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      setData(response.data)
    })
    
  }

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        setApiData([...cardData, response.data]);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };
    fetchApiData();
  }, []);


  return (
<<<<<<< HEAD
    <>
      <h1>Hello world</h1>
    </>
  )
=======
    <div className="app-container">
      {/* 제목과 우측 텍스트 */}
      <div className="header-right">
          <p className="placeholder-text">서비스 소개 글</p> 
      </div>
      <div className="header-left">
        <h1 className="project-title">요약좀</h1>
      </div>
      {/* 검색창과 카테고리 */}
      <header className={`header ${selectedCard ? 'moved-up' : ''}`}>
        <input type="text" placeholder="검색하기" className="search-bar" />
        <div className="categories">
          <Categories onCategorySelect={handleCategorySelect} /> {/* 카테고리 컴포넌트 추가 */}
        </div>
      </header>

      {/* 카드 목록과 상세보기 전환 */}
      <main className={`content ${selectedCard ? 'content-clicked' : ''}`}>
        {selectedCard ? (
          // <CardDetail card={selectedCard} onBack={handleBack} cardData={cardData}/>
          <CardDetail card={selectedCard} onBack={handleBack} cardData={apiData}/>
        ) : (
          //<CardList onCardClick={handleCardClick} selectedCard={selectedCard} // 추가
          <CardList onCardClick={handleCardClick} selectedCard={apiData}
/>
        )}
      </main>

      {/* <div>
        <button onClick={onClick}>API불러오기테스트</button>
      </div>
      {data && (<textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true}
      />)} */}
      {/* <div>
        <data data={data}></data>
        {
          cardData.map(({id, title}) => {
            return <div>{id}</div>
          })
        }
      </div> */}
      {/* <div>
      <DataDownloader />
      <DataViewer />
      </div> */}
    </div>
  );
>>>>>>> 2d169ab (fix original code and add new files have to clean code)
}

export default App;


