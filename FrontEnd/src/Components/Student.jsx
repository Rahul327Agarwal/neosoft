import React, { useState } from "react";
import "../CSS/studentForm.css";
import { Link } from "react-router-dom";

function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    birthdate: "",
    contact: 0,
    email: "",
    password: "",
    address: {
      country: "",
      city: "",
      zip: "",
    },
    marks: 0,
    isIndian: true,
    subjects: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "address.country" ||
      name === "address.city" ||
      name === "address.zip"
    ) {
      const address = { ...student.address, [name.split(".")[1]]: value };
      setStudent({ ...student, address });
    } else if (name === "subjects") {
      setStudent({ ...student, subjects: value.split(",") });
    } else if (name === "isIndian") {
      console.log("+++came inside", value);
      if (value === "Yes") setStudent({ ...student, [name]: true });
      else setStudent({ ...student, [name]: false });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    };
    try {
      const response = await fetch(
        "http://localhost:1234/studentRegistration",
        requestOptions
      );
      const data = await response.json();
      console.log("response", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="birthdate">Date of Birth:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={student.birthdate}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="number"
          id="contact"
          name="contact"
          value={student.contact}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={student.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="address.country">Country:</label>
        <input
          type="text"
          id="country"
          name="address.country"
          value={student.address.country}
          onChange={handleChange}
        />

        <label htmlFor="address.city">City:</label>
        <input
          type="text"
          id="city"
          name="address.city"
          value={student.address.city}
          onChange={handleChange}
        />

        <label htmlFor="address.city">Marks:</label>
        <input
          type="number"
          id="marks"
          name="marks"
          value={student.marks}
          onChange={handleChange}
        />

        <label htmlFor="address.zip">ZIP Code:</label>
        <input
          type="text"
          id="zip"
          name="address.zip"
          value={student.address.zip}
          onChange={handleChange}
        />

        <label htmlFor="isIndian">Is Indian:</label>
        <select
          id="isIndian"
          name="isIndian"
          // value={student.isIndian}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="subjects">Subjects (comma-separated):</label>
        <input
          type="text"
          id="subjects"
          name="subjects"
          value={student.subjects.join(",")}
          onChange={handleChange}
        />

        <input type="submit" value="Add Student" />
        <Link to="/findStudent">
          <button className="findStudent" type="button">
            Find Student
          </button>
        </Link>
      </form>
    </div>
  );
}

export default StudentForm;
