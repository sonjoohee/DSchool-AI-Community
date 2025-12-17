import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../component/pagination";
import replie from '../icons/replie.png'
import Header from "../component/headerA";
import Posting from "../component/recommend/posting";
import { searchAPI } from "../service/api";
import SkeletonCard from "../component/SkeletonCard";

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await searchAPI.getAllItems();
            const responseData = response.data;
            setData(responseData.hits?.hits || []);
        } catch (error) {
            setError("게시글을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 클릭한 게시글의 조회수를 증가시키는 함수
    const increaseClicked = async (_id) => {
        try {
            // 서버에 PUT 요청을 보내 조회수 증가
            await searchAPI.increaseClicked(_id);

            // 조회수 증가가 성공한 후, 데이터를 다시 가져와서 업데이트합니다.
            const updatedData = [...data];

            // 해당 아이템을 찾아서 클릭수 증가
            const itemIndex = updatedData.findIndex(item => item._source._id === _id);
            if (itemIndex !== -1) {
                if (!updatedData[itemIndex]._source.clicked) {
                    updatedData[itemIndex]._source.clicked = 1;
                } else {
                    updatedData[itemIndex]._source.clicked += 1;
                }
            }

            // 상태 업데이트
            setData(updatedData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 현재 페이지의 데이터 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 변경 시 호출할 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Loading state UI
    if (loading) {
        return (
            <div className="flex flex-col">
                <Header query={query} setQuery={setQuery} results={results} setResults={setResults} />
                <div className="bg-gray-200 min-h-screen">
                    <div className='flex h-[37rem] justify-center p-2'>
                        <div className='w-[40rem] border border-[#d6d6d6] bg-white'>
                            {[...Array(4)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                        <div className='w-[30rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                            <div className='w-full h-fit pb-3'>
                                <span className='flex'><p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글</span>
                            </div>
                            <div className='w-full h-0.5 bg-[#d6d6d6]' />
                            <Posting />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state UI
    if (error) {
        return (
            <div className="flex flex-col">
                <Header query={query} setQuery={setQuery} results={results} setResults={setResults} />
                <div className="bg-gray-200 min-h-screen flex justify-center items-center">
                    <div className="text-red-500 p-4">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <Header query={query} setQuery={setQuery} results={results} setResults={setResults} />
            <div className="bg-gray-200 min-h-screen">
                <div className='flex h-[37rem] justify-center p-2'>
                    <div className='w-[40rem] border border-[#d6d6d6] bg-white'>
                        {currentItems.map((item, index) => (
                            <Link to={`/board/${item._source.item_idx}`} key={index} onClick={() => increaseClicked(item._source.item_idx)}>
                                <div className='w-full p-3 pr-8'>
                                    <div className='w-full h-fit mb-5'>
                                        <div className='flex mb-2 space-x-2 font-bold items-center'>
                                            <h1 className='max-w-xs truncate'>{item._source.subject}</h1>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5] text-sm'>{item._source.created_at}</span>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5] text-sm'>{item._source.clicked || 0}</span>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5] flex items-center text-sm'>
                                                <img
                                                    className='w-4 h-4 flex self-center mr-1'
                                                    src={replie}
                                                    alt='reply icon'
                                                />
                                                {item._source.replies?.length || 0}
                                            </span>
                                        </div>
                                        <p className='w-full break-words line-clamp-2 text-gray-700 text-sm'>
                                            {item._source.contents}
                                        </p>
                                    </div>
                                    <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                </div>
                            </Link>
                        ))}

                        {/* 페이지네이션 컴포넌트 */}
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={data.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <div className='w-[30rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                        <div className='w-full h-fit pb-3'>
                            <span className='flex'><p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글</span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                        <Posting />
                    </div>
                </div>
            </div>
        </div >
    )
}