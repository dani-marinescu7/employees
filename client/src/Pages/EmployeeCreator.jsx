import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipments = () => {
  return fetch(`/api/equipments/`).then((res) => res.json());
};

const fetchBrands = () => {
  return fetch("/api/brands").then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState(null);
  const [brands, setBrands] = useState(null);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  useEffect(() => {
    fetchBrands()
        .then((brands) => setBrands(brands));
    
    fetchEquipments()
      .then((data) => setEquipments(data));
  }, []);

  return (
    <EmployeeForm
      brands={brands}
      equipments={equipments}
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default EmployeeCreator;
