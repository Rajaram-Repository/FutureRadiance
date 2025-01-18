import React, { useState } from "react";
import styles from "./StudentTable.module.css";
import CloneStudent from "../Students/createStudents.jsx";
import StudentTableComponent from "../Students/StudentTableComponent.jsx";

const ContactPage = () => {
 const [activeComponent, setActiveComponent] = useState("table"); // Default to table view

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "createStudent":
        return <CloneStudent onSave={() => setActiveComponent("table")} />;
      case "table":
      default:
        return <StudentTableComponent onCreate={() => setActiveComponent("createStudent")} />;
    }
  };

  return (
    <div>

      {renderComponent()}
    </div>
  );
};

export default ContactPage;
