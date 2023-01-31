export const filterText = (text) =>
  text
    .trim()
    .replace(/( +)?\n( +)?/g, "-")
    .replace(/:/g, "")
    .replace(/ +/g, " ")
    .replace(/ /g, "/")
    .replace(/\/+/g, "/");

export const isCurrect = (text) => {
  const check = (it) => {
    const [time, name, phone] = it.split("/");

    if (
      /^[0-9]{4,}$/.test(time) &&
      /^[가-힣\s]+$/.test(name) &&
      /^[0-9]{3,}$/.test(phone)
    ) {
      return true;
    }
    return false;
  };

  if (/-/.test(text)) {
    const [cancel, change] = text.split("-");

    if (/취소/.test(cancel) && check(cancel) && check(change)) {
      return true;
    }
    return false;
  }

  return check(text);
};

export const filterReservationData = (data) => {
  // 데이터 정제
  const reservation = filterText(data);
  // 예약 텍스트에 - 가 있는가? (취소와 변경이 같이 있는 글)
  if (/-/.test(reservation)) {
    // 취소, 변경 예약 문자로 나눈다.
    const [cancel, change] = reservation.split("-");

    const [cancelTime, name, phone] = cancel.split("/");
    const [changeTime] = change.split("/");

    return {
      booked: { time: cancelTime, name, phone },
      cancel: true,
      change: changeTime,
    };
  }

  const [time, name, phone, cancel] = reservation.split("/");

  return {
    booked: { time, name, phone },
    cancel: /취소/.test(cancel),
    change: "",
  };
};

export const getTimeTable = (users) =>
  users
    .map((it) => ({ ...it, content: { ...filterReservationData(it.content) } }))
    .reduce((acc, { content: { booked, cancel, change }, date }) => {
      const { time, name, phone } = booked;

      const isExisted = acc[time]?.find((it) => it.name === name);

      if (cancel && isExisted) {
        acc[time] = acc[time].filter((it) => it.name !== name);

        if (change) {
          acc[change] = [...(acc[change] || []), { name, phone, date }];
        }
        return acc;
      }

      acc[time] = [...(acc[time] || []), { name, phone, date }];
      return acc;
    }, {});
