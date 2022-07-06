import '../CSS/register.css';
import { Link } from "react-router-dom";

function Register() {
  
    const checkdetails=()=>
    {
      let name=document.getElementById("name").value;
      let username=document.getElementById("username").value;
      let password=document.getElementById("password").value;
      let email=document.getElementById("email").value;
      let checky=document.getElementById("checky").checked;
      if(name.length===0)alert("please enter the name");
      if(username.length===0)alert("please enter the username");
      if(password.length<8)alert("Length of password should be more than 8");
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!email.match(validRegex))alert("Please enter the valid email");
      if(checky===false)alert("Please accept the terms and condition");
      
    }

    return (
    <div class="container">

<form id="signup">

    <div class="header">
    
        <h3>Sign Up</h3> 
        
        <p>You want to fill out this form</p>
        
    </div>
    
    <div class="sep"></div>

    <div class="inputs">

    <input type="text" id="name" placeholder="Name" autofocus />
    <input type="text" maxLength="10" placeholder="Contact number" autofocus />
    <input type="text" id="username" placeholder="UserName" autofocus />
    <input type="password" id="password" placeholder="Password" autofocus />
    <input type="email" id="email" placeholder="e-mail" autofocus />
    {/* <input type="image" alt="profile image" placeholder="Profile Image" /> */}
        
        <div class="checkboxy">
            <input name="cecky" id="checky" value="1" type="checkbox" /><label class="terms">I accept the terms of use</label>
        </div>
        
        <button type="button" onClick={checkdetails}> Sign Up</button>
        <Link to="/signin">
        <button type="button">Sign In</button>
        </Link>
    
    </div>

</form>

</div>
      

  );
}

export default Register;
