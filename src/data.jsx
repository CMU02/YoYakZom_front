// data.js
import { create } from 'zustand'

export const useDataStore = create((set) => ({
  data: [],
  currentId: 1,  // 현재 ID를 저장
  setData: (newData) => set({ data: newData }),
  setCurrentId: (id) => set({ currentId: id }),
}))

export const cardData = [
    {
      id: 1,
      title: "Lorem Ipsum 1",
      summary: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      detail: "Detailed content about Lorem Ipsum 1...",
      date: "2024.10.24",
      views: 1024,
    },
    {
      id: 2,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 768,
    },
    {
      id: 3,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 248,
    },
    {
      id: 4,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 428,
    },
    {
      id: 5,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 428,
    },
    {
      id: 6,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 428,
    },
    {
      id: 7,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 428,
    },
    {
      id: 8,
      title: "Lorem Ipsum 2",
      summary: "Lorem Ipsum has roots in classical Latin literature.",
      detail: "Detailed content about Lorem Ipsum 2...",
      date: "2024.10.25",
      views: 428,
    },
    // 필요한 만큼 데이터 추가
  ];
  export default cardData;