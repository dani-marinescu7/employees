import { Link, useNavigate } from "react-router-dom";
import "./EmployeeTable.css";
import { useState, useEffect } from "react";

const EmployeeTable = ({ employees, brands, onDelete }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentEmployees, setCurrentEmployees] = useState([]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  
  useEffect(() => {
    setCurrentEmployees(employees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    ))
  }, [currentPage]);

  const handleCheckboxChange = (event, employee) => {
    const isChecked = event.target.checked;
    isChecked
      ? (employee.status = "present")
      : (employee.status = "not present");
    fetch(`http://localhost:8080/missing/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNameClick = () => {
    if (sortOrder === "asc") {
      navigate("/name/desc");
      setSortOrder("desc");
    } else {
      navigate("/name/asc");
      setSortOrder("asc");
    }
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th onClick={handleNameClick}>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Favorite brand</th>
            <th>Present</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{brands && brands.find((brand) => brand._id === employee.brand).name}</td>
              <td>
                <input
                  type="checkbox"
                  id={`checkbox-option-${employee._id}`}
                  onChange={(event) => handleCheckboxChange(event, employee)}
                />
              </td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(employees.length / employeesPerPage) },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
