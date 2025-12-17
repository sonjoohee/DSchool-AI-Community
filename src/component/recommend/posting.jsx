import { useEffect, useState } from 'react';
import replie from '../../icons/replie.png'
import { Link } from 'react-router-dom';
import { searchAPI } from '../../service/api';

export default function Posting() {
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
                console.error('Error:', error);
                setError("추천 글을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-2 space-y-3">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="space-y-1">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                        <div className="flex space-x-2 mt-2">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                            <div className="h-4 bg-gray-300 rounded w-8"></div>
                            <div className="h-4 bg-gray-300 rounded w-8"></div>
                        </div>
                        <div className='w-full h-0.5 bg-gray-300 my-2' />
                    </div>
                ))}
            </div>
        );
    }

    // Error state UI
    if (error) {
        return (
            <div className="p-2 text-red-500">
                {error}
            </div>
        );
    }

    // 클릭한 게시글의 조회수를 증가시키는 함수
    const increaseClicked = async (item_idx) => {
        try {
            // 서버에 PUT 요청을 보내 조회수 증가
            await searchAPI.increaseClicked(item_idx); // Changed from hardcoded URL to API service
            
            // 조회수 증가가 성공한 후, 데이터를 다시 가져와서 업데이트합니다.
            const updatedData = [...data];

            // 해당 아이템을 찾아서 클릭수 증가
            const itemIndex = updatedData.findIndex(item => item._source.item_idx === item_idx);
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

    return (
        <div>
            {data.map((item, index) => (
                <Link to={`/board/${item._source.item_idx}`} key={index} onClick={() => increaseClicked(item._source.item_idx)}>
                    <div>
                        <h1 className="text-lg font-bold pt-2">{item._source.subject}</h1>
                    </div>
                    <div>
                        <p className='break-words line-clamp-3 text-sm text-gray-700'>{item._source.contents}</p>
                    </div>
                    <div className="text-[#a5a5a5] font-bold space-x-2 flex mb-2">
                        <span>{item._source.created_at}</span>
                        <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                        <span>{item._source.clicked || 0}</span>
                        <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                        <img
                            className='w-4 h-4 flex self-center'
                            src={replie}
                            alt='reply icon'
                        />
                        <span>{item._source.replies?.length || 0}</span>
                    </div>
                    <div className='w-full h-0.5 bg-[#d6d6d6]' />
                </Link>
            ))}
        </div>
    )
}