const filteredData = [
  {
    nickName: '이희창',
    content: '1900/이희창/2019',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '갈용',
    content: '2000/김용관/4434',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '소명',
    content: '1700/한소명/1641',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '김유곤',
    content: '1900/김유곤/2863',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '쭐미',
    content: '2100/김슬미/0966',
    date: '2022.03.23. 22:30'
  },
];

const changedData = [
  {
    nickName: '갈용',
    content: '2000/김용관/4434',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '갈용',
    content: '2000/김용관/4434 취소 \n2200/김용관/4434',
    date: '2022.03.23. 22:30'
  },
];

const cancelData = [
  {
    nickName: '갈용',
    content: '2000/김용관/4434',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '소명',
    content: '1700/한소명/1641',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '소명',
    content: '1700/한소명/1641 취소',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '김유곤',
    content: '1900/김유곤/2863',
    date: '2022.03.23. 22:30'
  },
];

const wrongData = [
  {
    nickName: '갈용',
    content: '2000/김용관/4434',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '소명',
    content: '1700/한소명/1641',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '소명',
    content: '1700/한소명/1641 \n1900/한소명/1641 변경',
    date: '2022.03.23. 22:30'
  },
  {
    nickName: '김유곤',
    content: '1900/김유곤2863',
    date: '2022.03.23. 22:30'
  },
];

module.exports = {
  filteredData,
  changedData,
  cancelData,
  wrongData,
}