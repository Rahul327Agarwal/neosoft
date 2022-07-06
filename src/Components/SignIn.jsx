import "../CSS/register.css";
import Captcha from "./Captcha";


function SignIn() {
  

  const checkdetails = () => {
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) alert("Please enter the valid email");
    if (password.length < 8) alert("Length of password should be more than 8");
  };

  return (
    <div class="container">
      <form id="signup">
        <div class="header">
          <h3>Sign In</h3>

          <p>You want to fill out this form</p>
        </div>

        <div class="sep"></div>

        <div class="inputs">
          <input type="email" id="email" placeholder="e-mail" autofocus />
          <input
            type="password"
            id="password"
            placeholder="Password"
            autofocus
          />
        </div>
        <Captcha checkdetails={checkdetails} />
      </form>
    </div>
  );
}
export default SignIn;
