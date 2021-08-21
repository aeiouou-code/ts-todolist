import React, { useState } from "react";
import styled from "styled-components/macro";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, DatePicker } from "antd";
import { Itodo } from "components/todo/TodoService";

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 60px 30px 40px;
  background: #eeeeee;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding: 36px 0px 15px 0px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const DueDate = styled(DatePicker)`
  width: 200px;
  height: 40px;
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId,
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dateSelected, setDateSelected] = useState("");

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    if (value) {
      createTodo({
        id: nextId,
        text: value,
        done: false,
        dueDate: dateSelected,
      });
      incrementNextId(); // nextId 하나 증가

      setValue(""); // input 초기화
    } else {
      Modal.error({
        title: "error",
        content: "error",
      });
      return;
    }
    setOpen(false); // open 닫기
  };

  function handleDate(_: any, dateString: string) {
    setDateSelected(dateString);
    return dateSelected;
  }

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />

          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
        <DueDate onChange={handleDate} />
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
