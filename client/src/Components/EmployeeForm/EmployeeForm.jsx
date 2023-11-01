const EmployeeForm = ({ onSave, disabled, employee, brands, equipments, companies, onCancel }) => {

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
          disabled
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="company">Company:</label>
          <select name="company" id="company" defaultValue={employee?.company}>
            {companies?.map(company => <option key={company._id} value={company._id} >{company.name}</option>)}
          </select>
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
          <select name="equipment" id="equipments" defaultValue={employee?.equipment}>
            {equipments?.map((equipment) => <option key={equipment._id} value={equipment._id}>{equipment.name}</option>)}
          </select>
      </div>

      <div className="control">
        <label htmlFor="brand">Brand:</label>
          <select name="brand" id="brands" defaultValue={employee?.brand}>
            {brands?.map(brand => <option key={brand._id} value={brand._id} >{brand.name}</option>)}
          </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
