import React, { useState } from "react";
import styles from "./StudentTable.module.css";

const StudentTableComponent = ({ onCreate }) => {
  const [students] = useState([
    { id: 1, name: "New Same", owner: "Rajaram R Ramakrishnan", modified: "25/01/12 06:29 PM" },
    { id: 2, name: "Sam", owner: "Rajaram R Ramakrishnan", modified: "25/01/12 06:27 PM" },
    { id: 3, name: "Jack", owner: "Admin", modified: "24/12/14 01:06 PM" },
    { id: 4, name: "Sam", owner: "Admin", modified: "24/12/07 04:10 PM" },
    { id: 5, name: "Sana", owner: "Admin", modified: "24/12/07 04:10 PM" },
    { id: 6, name: "Ajay", owner: "Admin", modified: "24/12/07 04:10 PM" },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftSection}>
          <select className={styles.dropdown}>
            <option>All Students</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <span>Total Records: {students.length}</span>
        </div>
        <div className={styles.rightSection}>
          <button className={styles.createButton} onClick={ onCreate }>Create Student</button>
          <button className={styles.actionsButton}>Actions</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Student Name</th>
              <th>Student Owner</th>
              <th>Modified Time</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td><input type="checkbox" /></td>
                <td>{student.name}</td>
                <td>{student.owner}</td>
                <td>{student.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span>10 Records Per Page</span>
        <span>1 - {students.length}</span>
      </div>
    </div>
  );
};

export default StudentTableComponent;
