import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/missing").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeMissingList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };
  
  
  fetchEmployees()
    .then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeMissingList;
