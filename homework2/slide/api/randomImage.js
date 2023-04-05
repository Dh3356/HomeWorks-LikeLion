// 여기에 데이터 패치를 합니다
import getURL from './URL.js';
const getRandomImage = async () => {
    const randomAlbumId = Math.floor(Math.random() * (10 - 1) + 1);//Math.floor() 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환한다.
    const BASE_URL = getURL(randomAlbumId);
}