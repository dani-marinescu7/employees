import { Link } from "react-router-dom";
import { useState } from "react";
import Filter from "./Filter";
import EmployeeList from "../EmployeeList";
import Sort from "./Sort";

import "./Layout.css";

function Layout() {
  const [option, setOption] = useState("");
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [sort, setSort] = useState(false);

  const handleFilter = (event) => {
    event.preventDefault();
    setOption(event.target[0].value);
    setValue(event.target[1].value);
    setFilter(true);
  };

  const handleSort = (event) => {
    event.preventDefault();
    setSortOption(event.target[0].value);
    setSort(true);
  };

  return (
    <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Sort onSubmit={handleSort}/>
        </li>
        <li>
          <Filter onSubmit={handleFilter}/>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/create-company">
            <button type="button">Create Company</button>
          </Link>
        </li>
      </ul>
    </nav>
    <EmployeeList option={option} value={value} filter={filter} sortOption={sortOption} sort={sort} />
  </div>
  );
};

export default Layout;
