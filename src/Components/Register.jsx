import "../CSS/register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const checkdetails = () => {
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let contact = document.getElementById("contact").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let checky = document.getElementById("checky").checked;
    if (name.length === 0) {
      alert("please enter the name");
      return;
    }
    if (username.length === 0) {
      alert("please enter the username");
      return;
    }
    if (password.length < 8) {
      alert("Length of password should be more than 8");
      return;
    }
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      alert("Please enter the valid email");
      return;
    }
    if (checky === false) {
      alert("Please accept the terms and condition");
      return;
    }

    const user = { name, contact, username, password, email };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:1234/register", requestOptions)
      .then((response) => {
        console.log(response.status);
        if (response.status === 400)
          throw new Error("User already exist. Please sign in");
        else response.json();
      })
      .then((data) => {
        alert("you have successfully registered with our system");
        navigate("/signin");
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="container">
      <form id="signup">
        <div className="header">
          <h3>Sign Up</h3>

          <p>You want to fill out this form</p>
        </div>

        <div className="sep"></div>

        <div className="inputs">
          <input type="text" id="name" placeholder="Name" />
          <input
            type="text"
            maxLength="10"
            id="contact"
            placeholder="Contact number"
          />
          <input type="text" id="username" placeholder="UserName" />
          <input type="password" id="password" placeholder="Password" />
          <input type="email" id="email" placeholder="e-mail" />
          {/* <input type="image" alt="profile image" placeholder="Profile Image" /> */}

          <div className="checkboxy">
            <input name="cecky" id="checky" value="1" type="checkbox" />
            <label className="terms">I accept the terms of use</label>
          </div>

          <button type="button" onClick={checkdetails}>
            Sign Up
          </button>
          <Link to="/signin">
            <button type="button">Sign In</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
