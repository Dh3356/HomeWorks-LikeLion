import getRandomImage from './api/randomImage.js';

const randomImageBtn = document.querySelector('#getImageButton');
const container = document.querySelector('#imageContainer');
const counter = document.querySelector('#imageCounter');
const leftBtn = document.querySelector('#moveLeft');
const rightBtn = document.querySelector('#moveRight');

window.addEventListener('DOMContentLoaded', () => {
  registButtonEvent();
});

let totalCount = 0;
let currentCount = 0;

const registButtonEvent = () => {
  randomImageBtn.addEventListener('click', async () => {
    const imageData = await getRandomImage();
    const slicedImageData = imageData.slice(0, 10); // 실습상 50개는 너무 많아 10개로 줄입니다

    container.innerHTML = '';
    totalCount = 0;
    currentCount = 0;
    container.scrollTo({
      left: 0,
      behavior: 'smooth',
    });

    slicedImageData.forEach((data) => renderImage(data));
    totalCount = slicedImageData.length;
    renderCounter(0);
  });

  leftBtn.addEventListener('click', () => moveImage('left'));
  rightBtn.addEventListener('click', () => moveImage('right'));
};

/** @param {{url: string, id: string, title: string}} data */
const renderImage = (data) => {
  const divEl = document.createElement('div');
  const imgEl = document.createElement('img');
  const pEl = document.createElement('p');

  imgEl.src = data.url;
  imgEl.alt = '슬라이드이미지';

  pEl.textContent = data.title;

  divEl.append(imgEl);
  divEl.append(pEl);
  container.append(divEl);
};

/** @param {number} currentIndex */
const renderCounter = (currentCount) => {
  counter.textContent = `${currentCount + 1} / ${totalCount}`;
};

/**
 * Carousel을 움직입니다.
 * @param {'left' | 'right'} type
 */
const moveImage = (type) => {
  if (type === 'left') moveLeft();
  if (type === 'right') moveRight();
};

const moveLeft = () => {
  if (currentCount > 0) {
    container.scrollTo({ left: --currentCount * 600, behavior: 'smooth' });
  } else {
    container.scrollTo({ left: totalCount * 600, behavior: 'smooth' });
    currentCount = totalCount - 1;
  }
  renderCounter(currentCount);
};

const moveRight = () => {
  if (currentCount < totalCount - 1) {
    container.scrollTo({
      left: ++currentCount * 600,
      behavior: 'smooth',
    });
  } else {
    container.scrollTo({ left: 0, behavior: 'smooth' });
    currentCount = 0;
  }
  renderCounter(currentCount);
};
