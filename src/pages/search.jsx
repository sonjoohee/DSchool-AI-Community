import { useEffect, useState } from "react";
import replie from "../icons/replie.png";
import Pagination from "../component/pagination";
import { Link, useParams } from "react-router-dom";
import Header from "../component/headerA";
import { searchAPI } from "../service/api";
import SkeletonCard from "../component/SkeletonCard";

export default function Search() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [query, setQuery] = useState("");
    const params = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!params.result) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const response = await searchAPI.searchPosts(params.result);
                const data = response.data;
                setResults(data.hits || []);
            } catch (err) {
                console.error("Search API Error:", err);
                setError("검색 결과를 불러오는 중 오류가 발생했습니다.");
                setResults([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params.result]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="flex flex-col">
                <Header query={query} setQuery={setQuery} results={results} setResults={setResults} />
                <div className="bg-gray-200 min-h-screen">
                    <div className='flex justify-center p-2'>
                        <div className='w-[40rem] border border-[#d6d6d6] bg-white'>
                            {[...Array(3)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                        <div className='w-[30rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                            <div className='w-full h-fit pb-3'>
                                <span className='flex'>
                                    <p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글
                                </span>
                            </div>
                            <div className='w-full h-0.5 bg-[#d6d6d6]' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                <div className='flex justify-center p-2'>
                    <div className='w-[40rem] border border-[#d6d6d6] bg-white'>
                        {results.length === 0 ? (
                            <div className="p-4 text-center">검색 결과가 없습니다.</div>
                        ) : (
                            currentItems.map((item, index) => (
                                <Link to={`/board/${item._source.item_idx}`} key={index}>
                                    <div className='w-full p-3 pr-8'>
                                        <div className='w-full h-fit mb-5'>
                                            <div className='flex mb-2 space-x-2 font-bold items-center'>
                                                <h1 className='max-w-xs truncate'>{item._source.subject}</h1>
                                                <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                                <span className='text-[#a5a5a5] text-sm'>{item._source.created_at}</span>
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
                            ))
                        )}

                        {results.length > 0 && (
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={results.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        )}
                    </div>
                    <div className='w-[30rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                        <div className='w-full h-fit pb-3'>
                            <span className='flex'>
                                <p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글
                            </span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                    </div>
                </div>
            </div>
        </div>
    )
}