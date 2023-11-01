const Sort = (props) => {

    return (
        <form onSubmit={(event) => props.onSubmit(event)}>
            <label htmlFor="filter">Sort by:</label>

            <select id="filter">
                <option value="firstName">First name</option>
                <option value="lastName">Last name</option>
                <option value="middleName">Middle name</option>
                <option value="position">Position</option>
                <option value="level">Level</option>
            </select>

            <button type="submit">Apply Sort</button>
        </form>
    );
};
  
export default Sort;