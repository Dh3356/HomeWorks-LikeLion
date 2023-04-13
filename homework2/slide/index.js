// 여기에 Carousel을 조작할 코드를 작성합니다.
import getRandomImage from './api/randomImage.js';

const randomImageBtn = document.querySelector("#getImageButton");
const container = document.querySelector("#imageContainer");
const counter = document.querySelector("#imageCounter");
const leftBtn = document.querySelector("#moveLeft");
const rightBtn = document.querySelector("#moveRight");
const leftEndBtn = document.querySelector("#moveLeftEnd");
const rightEndBtn = document.querySelector("#moveRightEnd");
const pageBtnList = document.querySelector("#pageList");

window.addEventListener('DOMContentLoaded', () => {
    registButtonEvent();
});


let totalCount = 0;//총 페이지 번호
let currentCount = 0;//현재 페이지 번호

const registButtonEvent = () => {//DOMContentLoaded 됐을 때 실행하는 함수
    randomImageBtn.addEventListener('click', async () => {//randomImage Button click 시 발생하는 이벤트
        const imageData = await getRandomImage();//Random Image를 받아온다
        const slicedImageData = imageData.slice(0, 20);//20 개만

        container.innerHTML = '';//container의 내용을 비운다
        totalCount = 0;//총 페이지 번호를 0으로 초기화한다
        currentCount = 0;//현재 페이지 번호를 0으로 초기화한다
        container.scrollTo({//container를 0으로 smooth하게 scroll한다
            left: 0,
            behavior: 'smooth',
        });
        console.log(slicedImageData);
        slicedImageData.forEach((data) => renderImage(data));//sliceImageData에 있는 모든 이미지 객체들을 renderImage() 한다
        totalCount = slicedImageData.length;//totalCount(총 페이지 번호)를 sliceImageData의 길이로 만든다
        renderCounter(0);//counter를 rendering한다
        pageBtnList.innerHTML = '';//btnlist를 초기화한다
        for(let i = 0; i<totalCount; i++)//총 페이지 수만큼 버튼을 만든다
        {
            let pageEl = document.createElement('button');//button을 만든다
            pageEl.textContent = (i + 1)/10 < 1 ? "0"+(i+1) : i + 1; //1부터 9까지는 button의 textContent 앞에 "0"을 붙인다.
            pageEl.addEventListener('click', () => switchPage(pageEl.textContent));//button에 EventListener를 붙인다
            pageBtnList.append(pageEl);//buttonList에 붙인다

            //10 개마다 줄바꿈을 하고 공백을 추가해 보기 좋게 한다
            if((i + 1) % 10 === 0)
            {
                pageBtnList.appendChild(document.createElement("br"));
                pageBtnList.appendChild(document.createElement("br"));
            }
            else
            {
                pageBtnList.appendChild(document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"));
            }
        }
    });

    leftBtn.addEventListener('click', () => moveImage('left'));//leftBtn을 눌렀을 때 moveImage('left')가 실행되게 한다
    rightBtn.addEventListener('click', () => moveImage('right'));//rightBtn을 눌렀을 때 moveImage('right')가 실행되게 한다
    leftEndBtn.addEventListener('click', () => moveImage('leftEnd'));//leftEndBtn을 눌렀을 때 moveImage('leftEnd')다 실행되게 한다
    rightEndBtn.addEventListener('click', () => moveImage('rightEnd'));//rightEndBtn을 눌렀을 때 moveImage('rightEnd')다 실행되게 한다
};


/** @param {{url: string, id: string, title: string}} data */

const renderImage = (data) => {//이미지를 rendering한다
    const divEl = document.createElement('div');//div 태그를 만든다
    const imgEl = document.createElement('img');//img 태그를 만든다
    const pEl = document.createElement('p');//p 태그를 만든다

    imgEl.src = data.url;//이미지의 경로(src)에 data의 url을 넣는다
    imgEl.alt = '슬라이드이미지';//이미지가 로드되지 않으면 '슬라이드이미지'를 대신 보여 준다

    pEl.textContent = data.title;//p 태그의 text 내용을 data.title로 만든다

    divEl.append(imgEl);//div태그에 img와 p태그를 넣는다
    divEl.append(pEl);
    container.append(divEl);//container에 div태그를 붙인다
};


/**
 * @param currentCount
 */
const renderCounter = (currentCount) => {
    counter.textContent = `${currentCount + 1} / ${totalCount}`;//counter의 내용을 ${currentCount + 1} / ${totalCount}로 만든다
};

const switchPage = (pageNum) => {//page를 변경한다
    pageNum = Number(pageNum);//pageNum을 Number로 casting한다

    //pageNum이 현재보다 오른쪽에 있을 때
    if(currentCount + 1 < pageNum)
    {
        while(currentCount + 1 !== pageNum)
        {
            moveRight(currentCount);
        }
    }
    //pageNum이 현재보다 왼쪽에 있을 때
    else
    {
        while(currentCount + 1 !== pageNum)
        {
            moveLeft(currentCount);
        }
    }
};

/**
 * Carousel을 움직입니다.
 * @param {'left' | 'right'} type
 */
const moveImage = (type) => {//이미지를 움직인다
    if(type === 'left'){
        moveLeft();
    }
    if(type === 'right'){
        moveRight();
    }
    if(type === 'leftEnd')
    {
        moveLeftEnd();
    }
    if(type === 'rightEnd')
    {
        moveRightEnd();
    }
};

const moveLeft = () => {//이미지를 왼쪽으로 움직인다
    if(currentCount > 0){//만약 currentCount가 0 보다 크다면
        container.scrollTo({left: --currentCount * 600, behavior: 'smooth'});//currentCount를 하나 감소시키고, 감소된 CurrnetCount*600 위치로 scroll한다
    }
    else{//만약 currentCount가 0 보다 작거나 같다면
        container.scrollTo({left: totalCount * 600, behavior: 'smooth'});//totalCount*600 위치로 스크롤한다
        currentCount = totalCount - 1;//currentCount를 totalCount-1로 만든다
    }
    renderCounter(currentCount);//Counter를 rendering한다
};

const moveRight = () => {//이미지를 오른쪽으로 움직인다
    if(currentCount < totalCount - 1){//만약 currentCount가 totalCount - 1보다 작다면
        container.scrollTo({
            left: ++currentCount * 600,
            behavior: 'smooth',
        });//currentCount를 하나 증가시키고 currentCount * 600 위치로 scroll한다
    }
    else{//만약 currentCount가 totalCount - 1보다 크거나 같다면
        container.scrollTo({left: 0, behavior:'smooth'});//0 위치로 scroll한다
        currentCount = 0;
    }
    renderCounter(currentCount);//Counter를 rendering한다
};

const moveLeftEnd = () => {//이미지를 왼쪽 끝으로 움직인다
    container.scrollTo({left: 0, behavior:'smooth'});
    currentCount = 0;
    renderCounter(currentCount);//Counter를 rendering한다
};

const moveRightEnd = () => {//이미지를 오른쪽 끝으로 움직인다
    container.scrollTo({left: totalCount * 600, behavior: 'smooth'});//totalCount*600 위치로 스크롤한다
    currentCount = totalCount - 1;
    renderCounter(currentCount);//Counter를 rendering한다
};