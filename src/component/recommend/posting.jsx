import { useEffect, useState } from 'react';
import replie from '../../icons/replie.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Posting() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/recomend');
                const responseData = response.data;
                setData(responseData.hits.hits);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    // 클릭한 게시글의 조회수를 증가시키는 함수
    const increaseClicked = async (item_idx) => {
        try {
            // 서버에 PUT 요청을 보내 조회수 증가
            await axios.put(`http://127.0.0.1:8000/items/${item_idx}/increase-clicked`);
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

    console.log(data);

    return (
        <div>
            {data.map((item, index) => (
                <Link to={`/board/${item._source.item_idx}`} key={index} onClick={() => increaseClicked(item._source.item_idx)}>
                    <div>
                        <h1 className="text-lg font-bold pt-2">{item._source.subject}</h1>
                    </div>
                    <div>
                        <span className='break-words text-ellipsis overflow-hidden theboki1 text-sm'>{item._source.contents}</span>
                    </div>
                    <div className="text-[#a5a5a5] font-bold space-x-2 flex mb-2">
                        <span>{item._source.created_at}</span>
                        <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                        <span>{item._source.clicked}</span>
                        <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                        <img
                            className='w-5 h-5 flex self-center mt-1'
                            src={replie}
                            alt='d'
                        />
                        <span>{item._source.replies.length}</span>
                    </div>
                    <div className='w-full h-0.5 bg-[#d6d6d6]' />
                </Link>
            ))}
        </div>
    )
}