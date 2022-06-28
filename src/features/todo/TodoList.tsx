import React, { useState, useEffect } from "react";
import api from "../../services/jsonPlaceholder";
import { Todo } from "../../model";
import { Todoitem } from "./Todoitem";

export const TodoList = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const setTodoList = async () => {
    const response = await api.get<Todo[]>("/posts");
    setTodo(response.data);
  };

  useEffect(() => {
    setTodoList();
  }, []);

  const addTodo = async () => {
    const data = {
      userId: 1,
      title,
      completed: true,
    };

    try {
      const response = await api.post<Todo>("/posts", data);
      console.log(response.status);
      console.log(response.data);
    } catch (e) {
      console.log("something went wrong..", e);
    }
  };

  return (
    <>
      <>
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button onClick={addTodo}>add todo</button>
      </>

      {todo.map((item) => {
        return <Todoitem item={item} />;
      })}
    </>
  );
};
