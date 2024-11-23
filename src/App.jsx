import { useState, useEffect } from 'react';
import './App.css';
import './styles/global.css';
import './styles/Header.css'
import axios from 'axios';
import Categories from './components/Categories';
import Cards from './components/Cards';
import Summary from './components/Summary';
import Pagination from './components/Pagination';

function App() {
  const categoriesGroupUrl = "https://server.yoyakzom.com/summary/category-group"; // 카테고리 그룹 API url
  const summaryListUrl = "https://server.yoyakzom.com/summary"; // 요약글 목록 API url

  const [categories, setCategories] = useState([]); // 그룹별 카테고리 목록
  const [summaryList, setSummaryList] = useState([]); // 요약글 목록

  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 선택된 카테고리

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 9; // 페이지당 아이템 수

  // 선택된 카테고리에 따라 요약글 목록을 필터링
  const filteredSummaryList = selectedCategory === 'ALL'
    ? summaryList
    : summaryList.filter(summary => summary.category === selectedCategory);

  // 현재 페이지에서 해당하는 데이터 자르기
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredSummaryList.slice(startIndex, startIndex + itemsPerPage);

  // 전체 페이지 수 계산
  const pageSize = Math.ceil(filteredSummaryList.length / itemsPerPage);

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

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
  }, [])

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? 'ALL' : category);
  }

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
      <Categories categories={categories} handleCategoryClick={handleCategoryClick}/>
      <Cards summaryList={paginatedList}/>
      {/* <Summary /> */}
      <Pagination 
        currentPage={currentPage} 
        pageSize={pageSize} 
        handlePageChange={handlePageChange}
      />
    </>
  );
}

export default App;


