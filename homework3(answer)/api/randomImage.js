/** 이미지 리스트를 받습니다. */
const getRandomImage = async () => {
  const randomAlbumId = Math.floor(Math.random() * (10 - 1) + 1);
  // 보통, api 주소는 노출시키지 않는 것이 원칙입니다! (.gitignore에 대해 조사해보세요)
  const BASE_URL = `https://jsonplaceholder.typicode.com/albums/${randomAlbumId}/photos`;

  try {
    const result = await fetch(BASE_URL);
    const content = await result.json();

    return content;
  } catch (e) {
    console.log('api 에러!', e.message);
  }
};

export default getRandomImage;
