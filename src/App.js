// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import Board from './pages/board';
import Search from './pages/search';

function App() {
  // const [postData, setPostData] = useState([]); // postData를 배열로 초기화합니다.
  // const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   // JSON 파일의 경로를 설정합니다.
  //   setPostData(item); // 배열로 변환하여 설정합니다.
  //   setLoading(false);
  // }, []);

  // const [data, setData] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/search");  // FastAPI 서버 주소
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/board/:item_idx' element={<Board />} />
            <Route path='/search/:result' element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
