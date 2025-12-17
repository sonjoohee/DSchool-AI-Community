import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Link 컴포넌트 임포트
import { searchAPI } from './api';

function Items() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await searchAPI.getAllItems();
  
        const hits = response.data?.hits?.hits || []; 
        setData(hits);
      } catch (error) {
        console.error('데이터 조회 실패:', error);
        setError("아이템을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-gray-500">데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500 font-bold">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center p-10">등록된 아이템이 없습니다.</div>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 p-4">
      {data.map((item) => (
        <li key={item._source.movieCd} className="border p-4 rounded hover:bg-gray-50 transition">
          <Link 
            to={`/items/${item._source.movieCd}`} 
            className="block w-full h-full text-blue-600 font-medium"
          >
            {item._source.movieNm}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Items;