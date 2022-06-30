import React, { useState } from "react";
import { Designation } from "../model";
import api from "../services/jsonServer";
import "../style/Style.css";
import { useNavigate } from "react-router-dom";

export const AddTODesignationList = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>();
  const [code, SetCode] = useState<string>();

  const addDesignationList = async () => {
    const dataInput = {
      code,
      title,
    };
    await api.post<Designation>("designation", dataInput);
    navigate("/", { replace: true });
  };

  return (
    <div className="main">
      <input
        type="text"
        placeholder="code"
        onChange={(e) => {
          SetCode(e.target.value);
        }}
        style={{ marginRight: 10 }}
      />

      <input
        type="text"
        placeholder="Add a designation"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button onClick={addDesignationList} style={{ marginLeft: 10 }}>
        Add
      </button>
    </div>
  );
};
