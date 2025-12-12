import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import BackButton from '../component/backbutton';
import TopButton from '../component/topbutton';
import { useParams } from 'react-router-dom';
import Header from '../component/headerA';

export default function Board() {
    const [data, setData] = useState([]);
    const { item_idx } = useParams();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/items');
                const responseData = response.data;
                setData(responseData.hits.hits);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const selectedPost = data.find((item) => item._source.item_idx === parseInt(item_idx));

    return (
        <div>
            <Header query={query} setQuery={setQuery} results={results} setResults={setResults} />
            <div className='w-full flex justify-center mx-auto bg-gray-200'>
                <div className='p-2'>
                    {selectedPost ? (
                        <div>
                            <div className='w-[40rem] border border-[#d6d6d6] bg-white px-3 py-5'>
                                <div className='flex'>
                                    <div className='w-0.5 h-3 text-red-600' />
                                    <h1 className='w-fit p-1 px-3 pb-5 text-2xl font-medium'>{selectedPost._source.subject}</h1>
                                </div>
                                <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                <div className='p-2.5 space-x-3 text-[#646464] flex'>
                                    <span className='text-[#2f9741] font-bold'>{selectedPost._source.author_nick}</span>
                                    <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                                    <span>조회수 {selectedPost._source.clicked}</span>
                                    <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                                    <span>{selectedPost._source.created_at}</span>
                                </div>
                                <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                <div className='p-2.5'>
                                    {selectedPost._source.contents}
                                </div>
                            </div>
                            <div className='w-[40rem] border border-[#d6d6d6] bg-white px-3 py-5 space-y-3'>
                                <div>
                                    덧글 <span className='text-[red]'>{selectedPost._source.replies.length}</span>
                                </div>
                                {selectedPost._source.replies.map((comment, index) => (
                                    <div key={index}>
                                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                        <div className='pt-3'>
                                            {comment}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex'>
                                <BackButton />
                                <TopButton />
                            </div>
                        </div>
                    ) : (
                        <div>게시글을 찾을 수 없습니다.</div>
                    )}
                </div>
                <div className='pt-2'>
                    <div className='w-[30rem] h-screen border border-[#d6d6d6] bg-white p-3'>
                        <div className='w-full px-5 pb-3'>
                            <span className='flex'>유사 추천글</span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                    </div>
                </div>
            </div>
        </div>
    );
}
