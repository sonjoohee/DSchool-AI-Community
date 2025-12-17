import  { useEffect, useState } from 'react';
import '../App.css';
import Pagination from './pagination';
import { Link } from 'react-router-dom';
import replie from "../icons/replie.png";
import { searchAPI } from '../service/api';
import SkeletonCard from './SkeletonCard';

export default function Post() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
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
        }

        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className='flex justify-center p-2'>
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
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center p-2'>
                <div className='w-[40rem] border border-[#d6d6d6] bg-white p-4 text-center text-red-500'>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className='flex justify-center p-2'>
            <div className='w-[40rem] border border-[#d6d6d6] bg-white'>
                {currentItems.map((item, index) => (
                    <Link to={`/board/${item._source.item_idx}`} key={index}>
                        <div className='w-full p-3 pr-8'>
                            <div className='w-full h-fit mb-5'>
                                <div className='flex mb-2 space-x-2 font-bold items-center'>
                                    <h1 className='max-w-xs truncate'>{item._source.subject}</h1>
                                    <span className='text-[#a5a5a5] text-sm'>{item._source.created_at}</span>
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

            </div>
        </div>
    );
}