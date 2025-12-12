import { useEffect, useState } from "react";
import replie from "../icons/replie.png";
import axios from "axios";
import Pagination from "../component/pagination";
import { Link, useParams } from "react-router-dom";
import Header from "../component/headerA";

export default function Search() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [query, setQuery] = useState("");
    const params = useParams(); // 동적 파라미터로 검색 쿼리를 받아옵니다.
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/search?query=" + params.result);
                const data = response.data;
                console.log(data);
                setResults(data.hits);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, [params.result]);



    // 현재 페이지의 데이터 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 변경 시 호출할 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    console.log(results);


    return (
        <div className="flex flex-col">
            <Header query={query} setQuery={setQuery} results={results} setResults={setResults} />
            <div className=" bg-gray-200 h-screen">
                {<div className='flex justify-center p-2'>
                    <div className='w-[40rem] border border-[#d6d6d6] bg-white'>
                        {results === '' ? <div>검색 결과가 없습니다.</div> : currentItems.map((item, index) => (
                            <Link to={`/board/${item._source.item_idx}`} key={index}>
                                <div className='w-full p-3 pr-8'>
                                    <div className='w-full h-fit mb-5'>
                                        <div className='flex mb-2 space-x-2 font-bold items-center'>
                                            <h1 className=' max-w-xs'>{item._source.subject}</h1>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5]'>{item._source.created_at}</span>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5] flex'>
                                                <img
                                                    className='w-5 h-5 flex self-center mt-1 mr-1'
                                                    src={replie}
                                                    alt='d'
                                                />
                                                {item._source.replies.length}
                                            </span>
                                        </div>
                                        <span className='w-full break-words text-ellipsis overflow-hidden theboki'>{item._source.contents}</span>
                                    </div>
                                    <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                </div>
                            </Link>
                        ))}
                        {/* 페이지네이션 컴포넌트 */}
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={results.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <div className='w-[30rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                        <div className='w-full h-fit pb-3'>
                            <span className='flex'><p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글</span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />

                    </div>
                </div>}
            </div>
        </div>
    )
}