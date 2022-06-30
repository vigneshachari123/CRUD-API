import React, { useState, useEffect } from "react";
import api from "../services/jsonServer";
import { Designation } from "../model";
import "../style/Style.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const EditDesignationData = () => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const [designationList, SetDesignationList] = useState<Designation[]>([]);
  const [code, setUpdatecode] = useState<string>();
  const [title, setUpdateTitle] = useState<string>();

  //Getting the data With (id) which is passed by useNavigation for displaying previous code and title
  const GetdataById = async () => {
    const response = await api.get(`designation/${location.state.id}`);
    setUpdatecode(response.data.code);
    setUpdateTitle(response.data.title);
    LoadDesignationData();
  };

  useEffect(() => {
    GetdataById();
  }, []);

  // printing The Latest Updated data
  const LoadDesignationData = async () => {
    const response = await api.get<Designation[]>("/designation");
    SetDesignationList(response.data);
  };

  //Updateing The Data
  const UpdateList = async () => {
    const updateData = {
      code,
      title,
    };

    try {
      await api.put<Designation>(
        `designation/${location.state.id}`,
        updateData
      );
      LoadDesignationData();
    } catch (e) {
      console.log(`something went wrong while updating data`, e);
    }
  };

  //   useEffect(() => {
  //     LoadDesignationData();
  //   }, []);

  //navigating back to home page

  const GoBackToHomePage = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="main">
      <input
        type="text"
        value={code}
        placeholder="Edit code"
        onChange={(e) => {
          setUpdatecode(e.target.value);
        }}
        style={{ margin: 20 }}
      />

      <input
        type="text"
        value={title}
        placeholder="Edit  title"
        onChange={(e) => {
          setUpdateTitle(e.target.value);
        }}
        style={{ margin: 20 }}
      />

      <button onClick={UpdateList}>Update</button>
      <button onClick={GoBackToHomePage}>Home</button>

      {designationList.map((item) => {
        return (
          <div>
            <h1 key={item.id}>
              ID:{item.id}, code:{item.code}, title :{item.title}
            </h1>
          </div>
        );
      })}
    </div>
  );
};
