import { useState, useEffect } from 'react';
import './App.css';
import './styles/global.css';
import './styles/Header.css'
import axios from 'axios';
import Categories from './components/Categories';
import Card from './components/Card';
import Cards from './components/Cards';

function App() {
  const categoriesGroupUrl = "https://server.yoyakzom.com/summary/category-group";
  const summaryListUrl = "https://server.yoyakzom.com/summary";

  const [categories, setCategories] = useState([]); // 그룹별 카테고리 목록
  const [summaryList, setSummaryList] = useState([]); // 요약글 목록

  useEffect(() => {
    const getCategories = async() => {
      const response = await axios.get(categoriesGroupUrl);
      setCategories(response.data);
    }

    const getSummaryList = async() => {
      const response  = await axios.get(summaryListUrl);
      setSummaryList(response.data);
    }

    getCategories();
    getSummaryList();
  }, [categories, summaryList])

  return (
    <>
      <header>
        <div className='title'>
          <h1>요약좀</h1>
        </div>
        <div className='search-container'>
          <div className='search-title'>
            <p>검색하기</p>
          </div>
          <div className='search-field'>
            <div className='search-bar'>
              <input type="text" placeholder="검색하기"/>
            </div>
            <div className='search-btn'>
              <img src='/icons/search_icon.svg' alt='검색버튼'/>
            </div>
          </div>
        </div>
        <div className='info'>
          <p>정보 과부하 속에서 핵심 내용을 빠르게 파악하기 어려운 시대입니다. &apos;3줄요약&apos; 서비스는 이러한 문제를 해결하기 위해 설계된 솔루션으로, 방대한 글이나 자료를 3줄로 간략하게 요약하여 사용자들이 중요한 정보를 놓치지 않고 효율적으로 습득할 수 있도록 돕습니다.</p> 
        </div>
      </header>
      <Categories categories={categories}/>
      {/* <Card /> */}
      <Cards summaryList={summaryList}/>
    </>
  );
}

export default App;


