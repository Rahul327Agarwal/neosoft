import "../CSS/register.css";
import Captcha from "./Captcha";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const checkdetails = () => {
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      alert("Please enter the valid email");
      return;
    }
    if (password.length < 8) {
      alert("Length of password should be more than 8");
      return;
    }
    const user = { email, password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:1234/signin", requestOptions)
      .then((response) => {
        if (response.status === 400) throw new Error("Something went wrong");
        else return response.json();
      })
      .then((data) => {
        alert("you have successfully logged in");
        sessionStorage.setItem("user", email);
        navigate("/task");
      })
      .catch((error) => {
        alert(
          "You are not a registered user. PLease check your email/password or signup first"
        );
      });
  };

  return (
    <div className="container">
      <form id="signup">
        <div className="header">
          <h3>Sign In</h3>

          <p>You want to fill out this form</p>
        </div>

        <div className="sep"></div>

        <div className="inputs">
          <input type="email" id="email" placeholder="e-mail" />
          <input type="password" id="password" placeholder="Password" />
        </div>

        <Captcha checkdetails={checkdetails} />
      </form>
    </div>
  );
}
export default SignIn;
