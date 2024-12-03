import { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/global.css';
import axios from 'axios';

import Categories from './components/Categories';
import Cards from './components/Cards';
import Summary from './components/Summary';
import Pagination from './components/Pagination';
import Header from './components/Header';
import FooterInfo from './components/Footer';

const categoriesGroupUrl = "https://server.yoyakzom.com/summary/category-group"; // 카테고리 그룹 API url
const summaryListUrl = "https://server.yoyakzom.com/summary"; // 요약글 목록 API url

export default function App() {
  const [categories, setCategories] = useState([]); // 그룹별 카테고리 목록
  const [summaryList, setSummaryList] = useState([]); // 요약글 목록

  const [searchQuery, setSearchQuery] = useState(''); // 검색어
  const [searchClose, setSearchClose] = useState(false); // 검색어 초기화 버튼
  const [searchFilterSummaryList, setSearchFilterSummaryList] = useState([]); // 검색 필터링된 요약글 목록

  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 선택된 카테고리

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 9; // 페이지당 아이템 수

  const [selectedSummary, setSelectedSummary] = useState(false); // 선택된 요약글
  const [selectedSummaryData, setSelectedSummaryData] = useState([]); // 선택된 요약글의 id

  // 검색어를 통해 요약글 목록을 필터링
  const searchSummaryList = (query) => {
    const filteredSummaryList = summaryList.filter((summary) => {
      // 검색어가 요약에 포함되어 있는지 확인
      const inSummary = summary.summary
        .toLowerCase()
        .includes(query.toLowerCase().trim());

      // 카테고리가 선택된 경우, 해당 카테고리에 맞는지 확인
      const inSeledtedCategory = selectedCategory === 'ALL' || summary.category === selectedCategory;
      return inSummary && inSeledtedCategory;
    })

    // 검색 필터링된 요약글 목록을 업데이트 및 검색어 닫기 버튼 활성화
    setSearchFilterSummaryList(filteredSummaryList);
    setSearchClose(true);
  }

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

  // 카테고리 클릭 이벤트 핸들러
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? 'ALL' : category);
  }

  // 원문 보기 버튼 클릭 이벤트 핸들러
  const handleOriginalTextClick = async(summaryId) => {
    const response = await axios.get(`${summaryListUrl}/${summaryId}`);

    setSelectedSummaryData(response.data);
    setSelectedSummary(true);
  }

  // 원문 뒤로가기 버튼 클릭 이벤트 핸들러
  const handleBackClick = () => {
    setSelectedSummary(false);
  }

  // 검색 후 카테고리 클릭 시 검색어 초기화
  const searchCloseHandler = () => {
    setSearchClose(false);
    setSearchQuery('');
    setCurrentPage(1);
  }

  useEffect(() => {
    // 카테고리 그룹 목록을 가져오는 비동기 함수
    const getCategories = async() => {
      const response = await axios.get(categoriesGroupUrl);
      setCategories(response.data);
    }

    // 요약글 목록을 가져오는 비동기 함수
    const getSummaryList = async() => {
      const response  = await axios.get(summaryListUrl);

      setSummaryList(response.data);
    }

    getCategories();
    getSummaryList();
  }, [])

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchSummaryList={searchSummaryList}
        searchClose={searchClose}
        setSearchClose={setSearchClose}
      />

      <Categories 
        categories={categories} 
        handleCategoryClick={handleCategoryClick}
        selectedSummary={selectedSummary}
        setCurrentPage={setCurrentPage} // 카테고리 클릭 시 페이지를 1로 초기화
        searchCloseHandler={searchCloseHandler} // 검색 후 카테고리 클릭 시 검색어 초기화
      />

      {
        // 선택된 요약글이 있으면 Summary 컴포넌트를, 없으면 Cards 컴포넌트를 렌더링
        selectedSummary ? 
        (<Summary 
          selectedSummaryData={selectedSummaryData} 
          handleBackClick={handleBackClick}
        />) : 
        (<Cards
          // 검색어가 있으면 검색 필터링된 요약글 목록을, 없으면 페이지네이션된 요약글 목록을 렌더링
          summaryList={searchQuery ? searchFilterSummaryList : paginatedList}
          handleOriginalTextClick={handleOriginalTextClick}
        />)
      }

      {
        // 요약글 원문 보기 중이 아니면, 페이징 컴포넌트를 렌더링
        !selectedSummary && 
        <Pagination 
          currentPage={currentPage} 
          pageSize={pageSize} 
          handlePageChange={handlePageChange}
        />
      }
      <FooterInfo />
    </>
  );
}