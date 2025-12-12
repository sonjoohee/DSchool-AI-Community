import axios from 'axios';

const getUserInfo = async () => {
    try {
        let res = await axios.get('http://127.0.0.1:8000/');
        return res.data;
    } catch (e) {
        console.log(e);
        alert("정보를 가져오는데 실패했습니다. 관리자에게 문의 바랍니다.");
        return null;
    }
}

export default getUserInfo;