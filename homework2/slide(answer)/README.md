# 캐러셀(carousel) 만들기

## 목표

서버에서 랜덤한 이미지를 받아와 캐러셀을 만든다.

- '만들기' 버튼을 클릭하면 API를 호출한다.
- API로부터 받은 데이터를 적절히 이용해 Carousel을 만든다.

## 사용할 API

`https://jsonplaceholder.typicode.com/albums/1/photos​`

API의 결과는 JSON 형태로 내려온다.

## 힌트

- 서버와의 통신이 필요하다. 서버는 언제 내가 원하는 데이터를 줄지 알 수 없다. 즉, 데이터를 줄 때 까지 기다려야한다.
- 응답으로 온 데이터는 Array이며 각 요소는 Object이다. Object의 구조를 잘 풀어서 Carousel의 데이터로 활용해라
