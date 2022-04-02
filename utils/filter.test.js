import { filterText, isCurrect, filterReservationData, getTimeTable, } from './filter';
import { filteredData, changedData, cancelData } from '../mockData/filteredData'

describe('filterText', () => {
  context.each([
    '1900 곽형조 6962',
    '19:00/곽형조/6962',
    '1900 곽형조/   6962',
    '1900 곽형조   /6962',
    '1900/ 곽형조   /6962',
  ])('다양한 예약 글 포멧을', (text) => {
    it('콜론은 없애고 띄어쓰기는 슬래쉬로 바꾼다.', () => {
      const result = filterText(text);
      
      expect(result).toBe('1900/곽형조/6962');
    });
  });

  context.each([
    '1900/곽형조/6962 취소 \n2000/곽형조/6962 변경',
    '1900/곽형조/6962 취소 \n 2000/곽형조/6962 변경',
    '1900/곽형조/6962 취소   \n   2000/곽형조/6962 변경',
    '1900 곽형조 6962 취소   \n   2000 곽형조 6962 변경',
  ])('\\n 이 들어간 취소, 변경 예약의 경우', (text) => {
    it('"-" 로 바꿔준다.', () => {
      const result = filterText(text);
      
      expect(result).toBe('1900/곽형조/6962/취소-2000/곽형조/6962/변경');
    });
  });
});

describe('isCurrect', () => {
  context.each([
    '1900/곽형조/6962',
    '1900/곽형조/6962/취소-2000/곽형조/6962',
    '1900/곽형조/6962/취소합니다.-2000/곽형조/6962',
    '1900/곽형조/6962/취소합니다.-2000/곽형조/6962/변경',
  ])('올바른 형식의 예약 댓글이라면', (text) => {
    it('true를 return 한다.', () => {
      const result = isCurrect(text);
  
      expect(result).toBeTruthy();
    });
  });

  context.each([
    '1900/곽형조6962',
    '1900곽형조/6962',
    '1900/곽형조/6962-2000/곽형조/6962/변경',
    '1900/곽형조/6962/변경-2000/곽형조/6962',
    '2100/김영은/5735취소',
  ])('잘못된 예약 댓글이라면', (text) => {
    it('false를 return 한다.', () => {
      const result = isCurrect(text);

      expect(result).toBeFalsy();
    });
  });
});

describe('filterReservationData', () => {
  const rightBookedData = {
    time: '1900',
    name: '곽형조',
    phone: '6962',
  };

  const result = {
    booked: { ...rightBookedData },
    cancel: false,
    change: '',
  };

  describe('일반 예약하기', () => {
    const text = '1900/곽형조/6962';

    context('일반 예약 글이라면', () => {
      it('json 형태의 예약 글로 변환한다.', () => {
        const data = filterReservationData(text);
  
        expect(data).toEqual(result);
      });
    });
  });

  describe('취소하기', () => {
    const result = {
      booked: { ...rightBookedData },
      cancel: true,
      change: '',
    };

    context('예약 취소만 하는 글이라면', () => {
      const text = '1900/곽형조/6962 취소';

      it('cancel 이 true 인 json 데이터 형태로 변환한다.', () => {
        const data = filterReservationData(text);
  
        expect(data).toEqual(result);
      });
    });
  
    context('"취소합니다" 라고 하면', () => {
      const text = '1900/곽형조/6962 취소합니다';

      it('cancel 이 true 인 json 데이터 형태로 변환한다.', () => {
  
        const data = filterReservationData(text);
  
        expect(data).toEqual(result);
      });
    });
  });

  describe('예약 변경하기', () => {

    context('예약 변경 글이라면', () => {
      const text = '1900/곽형조/6962 취소\n2200/곽형조/6962 변경';

      const result = {
        booked: { ...rightBookedData },
        cancel: true,
        change: '2200'
      };
  
      it('cancel 이 true 인 json 데이터 형태로 변환한다.', () => {
        const data = filterReservationData(text);
  
        expect(data).toEqual(result);
      });
    });
  });
});

describe('getTimeTable', () => {
  it('각 시간에 예약한 회원을 반환한다.', () => {
    const data = getTimeTable(filteredData);

    expect(data).toEqual({
      '1700': [
        { name: '한소명', phone: '1641', date: '2022.03.23. 22:30' }
      ],
      '1900': [
        { name: '이희창', phone: '2019', date: '2022.03.23. 22:30' },
        { name: '김유곤', phone: '2863', date: '2022.03.23. 22:30' },
      ],
      '2000': [
        { name: '김용관', phone: '4434', date: '2022.03.23. 22:30' }
      ],
      '2100': [
        { name: '김슬미', phone: '0966', date: '2022.03.23. 22:30' }
      ]
    });
  });

  context('예약 변경 데이터일 경우', () => {
    it('예약이 변경된 상태로 저장된다.', () => {
      const data = getTimeTable(changedData);

      expect(data).toEqual({
        '2000': [],
        '2200': [
          { name: '김용관', phone: '4434', date: '2022.03.23. 22:30' }
        ]
      });
    });
  });

  context('예약 취소 데이터일 경우', () => {
    it('예약이 취소된 상태로 저장된다.', () => {
      const data = getTimeTable(cancelData);

      expect(data).toEqual({
        '1700': [],
        '1900': [
          { name: '김유곤', phone: '2863', date: '2022.03.23. 22:30' },
        ],
        '2000': [
          { name: '김용관', phone: '4434', date: '2022.03.23. 22:30' },
        ]
      });
    });
  });
});
