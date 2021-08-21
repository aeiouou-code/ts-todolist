import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const d: Date = new Date();
  const [currentDate, setCurrentDate] = useState(d);

  // const dateToKR = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  //   timeStyle: "medium",
  // });

  useEffect(() => {
    const currentSettingClock = setInterval(
      () => setCurrentDate(new Date()),
      1000
    );
    return () => {
      clearInterval(currentSettingClock);
    };
  }, []);

  return (
    <TodoHeadBlock>
      <DayText>{currentDate.toString().slice(0, 25)}</DayText>
      <DateText></DateText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
