import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { useNavigate } from "react-router-dom";

function Captcha(props) {
  
    // const navigate = useNavigate();
    const doSubmit = () => {
        let user_captcha = document.getElementById("user_captcha_input").value;
    
        if (validateCaptcha(user_captcha) === true) {
           document.getElementById("user_captcha_input").value = "";
           props.checkdetails();
          
        } else {
          alert("Captcha Does Not Match");
          document.getElementById("user_captcha_input").value = "";
        }
      };

    

    useEffect(()=>
    {
        loadCaptchaEnginge(8);
    },[])

    
    return (
        <>
        <LoadCanvasTemplate />
        <input
                  placeholder="Enter Captcha"
                  id="user_captcha_input"
                  name="user_captcha_input"
                  type="text"
                ></input> 
        <button onClick={()=>doSubmit()}>Sign In</button>        
        </>
    
  );
}
export default Captcha;