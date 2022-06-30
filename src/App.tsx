import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { DesignationList } from "./designation/DesignationList";
import { LoadDesignation } from "./designation/LoadDesignation";
import { AddTODesignationList } from "./designation/AddToDesignationList";
import { EditDesignationData } from "./designation/EditDesignationData";
import { Links } from "./navigationlinks/Links";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoadDesignation />} />
        <Route path="/addData" element={<AddTODesignationList />} />
        <Route path="/editData/:id" element={<EditDesignationData />}></Route>
      </Routes>
    </div>
  );
}

export default App;
