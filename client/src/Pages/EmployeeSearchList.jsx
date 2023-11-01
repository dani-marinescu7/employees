import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (search) => {
  return fetch(`/employees/${search}`).then((res) => res.json());
};

const deleteEmployee = (search) => {
  return fetch(`/employees/${search}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeSearchList = () => {
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (search) => {
    deleteEmployee(search);

    setEmployees((employees) => {
      return employees.filter((employee) => !employee.name.includes(search));
    });
  };
  
  useEffect(() => {
    fetchEmployees(search)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeSearchList;