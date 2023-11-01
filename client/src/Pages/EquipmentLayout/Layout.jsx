import { Link } from "react-router-dom";
import EquipmentList from "../EquipmentList";

import "./Layout.css";

function Layout() {

  return (
    <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/equipments">Equipments</Link>
        </li>
        <li>
          <Link to="/create-equipment">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <EquipmentList />
  </div>
  );
};

export default Layout;
