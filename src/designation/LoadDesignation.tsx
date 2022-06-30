import React, { useEffect, useState } from "react";
import { Designation } from "../model";
import api from "../services/jsonServer";
import "../style/Style.css";
import { useNavigate } from "react-router-dom";

export const LoadDesignation = () => {
  const [designation, setDesignation] = useState<Designation[]>([]);
  const navigateToEditDesignationData = useNavigate();
  const navigateToAddDesignation = useNavigate();

  useEffect(() => {
    LoadDesignationList();
  }, []);

  //Load all the Designationlist Data
  const LoadDesignationList = async () => {
    try {
      const response = await api.get<Designation[]>("designation");
      setDesignation(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //delete perticular data by taking respected id and loading updated data.
  const deleteFromList = async (id: number) => {
    try {
      await api.delete(`designation/${id}`);
      LoadDesignationList();
    } catch (e) {
      console.log("something went wrong ", e);
    }
  };

  // Navigate to Edit the DesignationDataPage
  const NavigateToEditPage = async (id: number) => {
    navigateToEditDesignationData(`/editData/${id}`, {
      replace: true,
      state: { id: id },
    });
  };

  const NavigateToAddpage = async () => {
    navigateToAddDesignation("/addData", { replace: true });
  };

  return (
    <div className="main">
      <button onClick={NavigateToAddpage} style={{ margin: 20 }}>
        Add New
      </button>
      {designation.map((item: Designation) => {
        return (
          <div>
            <p key={item.id}>
              <h3>
                ID:{item.id} , CODE:{item.code} , DESIGNATION: {item.title}.
              </h3>
              <button
                onClick={() => deleteFromList(item.id)}
                style={{ marginRight: 10 }}
              >
                delete
              </button>
              <button onClick={() => NavigateToEditPage(item.id)}>Edit</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};
