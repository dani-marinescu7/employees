const Filter = (props) => {

    return (
        <form onSubmit={(event) => props.onSubmit(event)}>
            <label htmlFor="filter">Filter by:</label>

            <select id="filter">
                <option value="position">Position</option>
                <option value="level">Level</option>
            </select>

            <input />

            <button type="submit">Apply Filter</button>
        </form>
    );
};
  
export default Filter;