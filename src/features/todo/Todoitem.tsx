import React from "react";
import { Todo } from "../../model";

type propsProps = {
  item: Todo;
};

export const Todoitem: React.FC<propsProps> = ({ item }) => {
  return <p key={item.id}>{item.title}</p>;
};
