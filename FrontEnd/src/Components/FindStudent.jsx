import React, { useState } from "react";
import "../CSS/findStudent.css";

function FindStudent() {
  const [searchBy, setSearchBy] = useState({ key: "", value: "" }); // Initialize the selected search criteria
  const [searchValue, setSearchValue] = useState(""); // Initialize the search value

  const handleSearchByChange = (key, event) => {
    setSearchBy({ key, value: event.target.value });
  };

  const handleSearchValueChange = (event) => {
    if (searchBy.value === "isIndian") {
      if (event.target.value === "YES") setSearchValue(true);
      else setSearchValue(false);
      return;
    }
    setSearchValue(event.target.value);
  };

  const renderSearchInput = () => {
    if (searchBy.key === "marks") {
      return (
        <input
          type="number"
          placeholder={`Enter ${searchBy.value} here`}
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      );
    } else if (searchBy.value === "birthdate") {
      return (
        <input
          type="date"
          placeholder={`Enter ${searchBy.value} here`}
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      );
    } else if (searchBy.value === "contact") {
      return (
        <input
          type="number"
          placeholder={`Enter ${searchBy.value} here`}
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      );
    } else if (searchBy.value === "isIndian") {
      return (
        <select value={searchValue} onChange={handleSearchValueChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    } else
      return (
        <input
          type="text"
          placeholder={`Enter ${searchBy.value} here`}
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      );
  };

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:1234/studentRegistration?searchValue=${searchValue}&searchBy=${JSON.stringify(
        searchBy
      )}`
    );
    const data = await response.json();
    console.log("data", data);
  };

  return (
    <div className="find-student-page">
      <h2 className="title">Find Student</h2>
      <select
        value={searchBy.value}
        onChange={(e) => handleSearchByChange(e.target.value, e)}
      >
        <option value="">Select Search Criteria</option>
        <option value="name">Student Name</option>
        <option value="birthdate">Birthdate</option>
        <option value="contact">Contact</option>
        <option value="email">Email</option>
        <option value="isIndian">isIndian</option>
        <option value="address.street">Address (Street)</option>
        <option value="address.city">Address (City)</option>
        <option value="address.zip">Address (ZIP)</option>
        <option value="subjects">Subjects</option>
      </select>

      <select
        value={searchBy.value}
        onChange={(e) => handleSearchByChange("marks", e)}
      >
        <option value="">Select Compare Operator</option>
        <option value="gt">Greater Than</option>
        <option value="lt">Less Than</option>
        <option value="gte">Greater Than and Equal</option>
        <option value="lte">Less Than and Equal</option>
      </select>
      {renderSearchInput()}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FindStudent;
