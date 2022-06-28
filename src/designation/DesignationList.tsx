import React, { useState, useEffect } from "react";
import "../style/Style.css";
import api from "../services/jsonServer";
import { Designation } from "../model";

export const DesignationList = () => {
  const [designation, setDesignation] = useState<Designation[]>([]);
  const [title, setTitle] = useState<string>();
  const [id, setId] = useState<number>();
  const [code, SetCode] = useState<string>();
  const [updatecode, setUpdatecode] = useState<string>();
  const [updateTitle, setUpdateTitle] = useState<string>();

  const setDesignationList = async () => {
    try {
      const response = await api.get<Designation[]>("designation");
      setDesignation(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setDesignationList();
  }, []);

  // Adding data
  const addDesignationList = async () => {
    const dataInput = {
      id,
      code,
      title,
    };
    const response = await api.post<Designation>("designation", dataInput);
    setDesignation([...designation, response.data]);
  };

  // Delete Data
  const deleteFromList = async (id: number) => {
    try {
      await api.delete(`designation/${id}`);
      const response2 = await api.get<Designation[]>("designation");
      setDesignation(response2.data);
    } catch (e) {
      console.log("something went wrong ", e);
    }
  };
  // update data
  const UpdateList = async (id: number) => {
    const updateData = {
      id,
      code: updatecode,
      title: updateTitle,
    };
    const response = await api.put<Designation>(
      `designation/${id}`,
      updateData
    );
    console.log(`response from UpdateList `, response);
    const response3 = await api.get<Designation[]>("designation");
    setDesignation(response3.data);
  };

  return (
    <div className="main">
      <div className="main-heading">
        <input
          type="number"
          value={id}
          placeholder="Add id "
          onChange={(e) => {
            setId(Number(e.target.value));
          }}
          style={{ marginRight: 10 }}
        />

        <input
          type="text"
          value={code}
          placeholder="code"
          onChange={(e) => {
            SetCode(e.target.value);
          }}
          style={{ marginRight: 10 }}
        />

        <input
          type="text"
          value={title}
          placeholder="Add a designation"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={addDesignationList} style={{ marginLeft: 10 }}>
          Add
        </button>
      </div>
      <br />
      {designation.map((item: Designation) => {
        return (
          <div>
            <p key={item.id}>
              <h3>
                ID:{item.id} , CODE:{item.code} , DESIGNATION: {item.title}.
              </h3>
            </p>

            <button
              onClick={() => deleteFromList(item.id)}
              style={{ marginRight: 5 }}
            >
              Delete
            </button>

            <>
              <button
                onClick={() => UpdateList(item.id)}
                style={{ marginRight: 10 }}
              >
                Update
              </button>
              <input
                type="text"
                placeholder="update code"
                onChange={(e) => {
                  setUpdatecode(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="update title"
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
                style={{ marginLeft: 10 }}
              />
            </>
          </div>
        );
      })}
    </div>
  );
};
