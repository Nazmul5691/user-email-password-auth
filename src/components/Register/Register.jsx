import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("form submitting");
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    const name = e.target.name.value;
    console.log(email, password, accepted, name);

    //reset error
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } 
    else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one uppercase character"
      );
      return;
    }
    else if(!accepted){
        setRegisterError('Please accept our terms and condition')
        return;
    }

    // const checkPasswordValidity = (password) => {
    //     const isNonWhiteSpace = /^\S*$/;
    //     if (!isNonWhiteSpace.test(password)) {
    //       return "Password must not contain Whitespaces.";
    //     }

    //     const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    //     if (!isContainsUppercase.test(password)) {
    //       return "Password must have at least one Uppercase Character.";
    //     }

    //     const isContainsLowercase = /^(?=.*[a-z]).*$/;
    //     if (!isContainsLowercase.test(password)) {
    //       return "Password must have at least one Lowercase Character.";
    //     }

    //     const isContainsNumber = /^(?=.*[0-9]).*$/;
    //     if (!isContainsNumber.test(password)) {
    //       return "Password must contain at least one Digit.";
    //     }

    //     const isContainsSymbol =
    //       /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    //     if (!isContainsSymbol.test(password)) {
    //       return "Password must contain at least one Special Symbol.";
    //     }

    //     const isValidLength = /^.{10,16}$/;
    //     if (!isValidLength.test(password)) {
    //       return "Password must be 10-16 Characters Long.";
    //     }

    //     return null;
    //   }

    //   const message = checkPasswordValidity(password);

    // if (!message) {
    //      console.log("Hurray! Your Password is Valid and Strong.");
    // }
    // else {
    //      setRegisterError(message)
    //      return;
    // }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user created successfully");

        updateProfile(result.user, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => console.log('profile updated'))
        .catch(() =>console.log('none'))


        //send verification email
        sendEmailVerification(result.user)
        .then(()=>{
            alert('please check your email and verify your account');
        })
      })

      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-4">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="bg-gray-200 mb-4 w-full px-4 py-2"
            type="text"
            name="name"
            id=""
            placeholder="Your Name"
            required
          />
          <br />
          <input
            className="bg-gray-200 mb-4 w-full px-4 py-2"
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            required
          />
          <br />
          <div className="relative border mb-1">
            <input
              className="bg-gray-200  w-full px-4 py-2"
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              placeholder="Password"
              required
            />
            <span
              className="absolute top-3 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible></AiFillEyeInvisible>
              ) : (
                <AiFillEye></AiFillEye>
              )}
            </span>
            
          </div>

          <br />

          <div className="mb-3">
          <input  type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">Accept our <a href="">terms and condition</a></label>
            <br />
          </div>

          <input
              className="btn btn-primary mb-4 w-full"
              type="submit"
              value="register"
            />
        </form>

        {registerError && (
          <p className="text-red-800 font-bold">{registerError}</p>
        )}
        {
            success && <p className="text-green-500 font-bold">{success}</p>
            
        }
        <p>Already have an account? Please <Link to="/login">Login</Link> </p>  
      </div>

    </div>
  );
};

export default Register;
