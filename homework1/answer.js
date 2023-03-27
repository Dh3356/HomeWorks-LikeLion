const FOODS_PRICE = {
  돈까스: '7000',
  제육: '5000',
  비빔밥: '4000',
};
const PEOPLE_TYPE = ['student', 'professor', 'employee'];
const PEOPLE_INFOS = [
  {
    name: '김멋사',
    type: 'student',
    food: '돈까스',
  },
  {
    name: '배교수',
    type: 'professor',
    food: '제육',
  },
  {
    name: '임직원',
    type: 'employee',
    food: '비빔밥',
  },
  {
    name: '나스파이',
    type: 'spy',
    food: '비빔밥',
  },
  {
    name: '대학원생',
    type: 'student',
    food: '짬뽕',
  },
];

const getTicket = (peopleName, type, food) => {
  const peopleType = PEOPLE_TYPE.find((peopleType) => peopleType === type);
  let price = +FOODS_PRICE[food];

  if (!peopleType) {
    return '찾았다 요놈!';
  }

  if (!price) {
    return '그런거 안팔아요';
  }

  switch (type) {
    case 'student':
      price += 100;
      break;
    case 'employee':
      price += 300;
      break;
    case 'professor':
      price += 500;
      break;
    default:
      break;
  }

  return { name: peopleName, price: price };
};

const getTickets = (ticketInfos) => {
  const tickets = ticketInfos.map((people) =>
    getTicket(people.name, people.type, people.food)
  );
  return tickets;
};

/*
  예상 출력
  ['김멋사: 7100', '배교수: 5500', '임직원: 4300', '찾았다 요놈!', '그런거 안팔아요']
*/
console.log(getTickets(PEOPLE_INFOS));
