import { useEffect, useState } from "react";
function Captcha(props) {
  const [captcha, setCaptcha] = useState("");
  function GenerateCaptcha() {
    var chr1 = Math.ceil(Math.random() * 10) + "";
    var chr2 = Math.ceil(Math.random() * 10) + "";
    var chr3 = Math.ceil(Math.random() * 10) + "";

    var str = new Array(4).join().replace(/(.|$)/g, function () {
      return ((Math.random() * 36) | 0)
        .toString(36)
        [Math.random() < 0.5 ? "toString" : "toUpperCase"]();
    });
    var captchaCode = str + chr1 + " " + chr2 + " " + chr3;
    setCaptcha(captchaCode);
    
  }
  function ValidCaptcha() {
    var str1 = removeSpaces(captcha);
    var str2 = removeSpaces(document.getElementById("txt").value);

    if (str1 == str2) {
      props.checkdetails();
    } else alert("Please enter the correct captcha");
  }

  /* Remove spaces from Captcha Code */
  function removeSpaces(string) {
    return string.split(" ").join("");
  }

  useEffect(() => GenerateCaptcha(), []);
  return (
    <>
      <p style={{ color: "red", fontSize: "20px" }}>
        <span style={{ color: "black" }}>Verify captcha---- </span>
        {captcha}
      </p>
      <p style={{ color: "blue" }} onClick={() => GenerateCaptcha()}>
        Reload Captcha
      </p>
      <input id="txt" type="text" placeholder="enter your captcha here" />
      <button type="button" onClick={() => ValidCaptcha()}>
        SignIn
      </button>
    </>
  );
}
export default Captcha;
