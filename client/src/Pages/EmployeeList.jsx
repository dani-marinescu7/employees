import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const fetchBrands = () => {
  return fetch("/api/brands").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({option, value, filter, sortOption, sort}) => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [brands, setBrands] = useState(null);

  const { column, order} = useParams();

  const sortedEmployees = (list, column, order) => {
    return list.sort((a, b) => {
      if (order === "asc") {
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
      }
    });
  }


  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };
  
  useEffect(() => {
    if (filter) {
      // fetch filtered employees using the option and value state variables
      fetchEmployees()
        .then((employees) => {
          setLoading(false);
          switch(option) {
            case 'level':
              setEmployees(employees.filter((employee) => employee.level == value))
              break;
            case 'position':
              setEmployees(employees.filter((employee) => employee.position == value))
              break;
          }
        });
    } else {
      fetchEmployees()
        .then((employees) => {
          setLoading(false);
          if (column !== undefined) {
            const result = sortedEmployees(employees, column, order)
            setEmployees(result)
          } else {
            setEmployees(employees);
          }
        });
    }
  }, [option, value, filter, column, order]);

  useEffect(() => {
    if (sort) {
      const updatedEmployees = employees.map(employee => {
        const nameParts = employee.name.split(" ");
        const firstName = nameParts[0];
        const middleName = nameParts.slice(1, nameParts.length - 1).join(" ");
        const lastName = nameParts[nameParts.length - 1];
        return {
          ...employee,
          firstName,
          middleName,
          lastName,
        };
      });
      setEmployees([...updatedEmployees].sort((a, b) => (a[sortOption] > b[sortOption]) ? 1 : -1))
    }
  }, [sortOption]);

  useEffect(() => {
    fetchBrands()
      .then((brands) => setBrands(brands));
  }, []);
  

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={employees} brands={brands} onDelete={handleDelete} />;
};

export default EmployeeList;
