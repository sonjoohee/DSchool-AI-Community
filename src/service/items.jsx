import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Items() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8001/items');
        const responseData = response.data;
        setData(responseData.hits.hits);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <a key={item._source.movieCd} href="#" onClick={() => readItem(item._source.movieCd)}>
          {item._source.movieNm}
        </a>
      ))}
    </div>
  );
}

function readItem(movieCd) {
  // 아이템 읽기 동작을 정의하세요.
}

export default Items;
