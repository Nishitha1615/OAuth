import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { api } from "../urlConfig";
import "../Components/mix.css";
const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();
  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      // toast.error("email is required!", {
      //     position: "top-center"
      // });
      alert("email is required!");
    } else if (!email.includes("@")) {
      // toast.warning("includes @ in your email!", {
      //     position: "top-center"
      // });
      alert("includes @ in your email!");
    } else if (password === "") {
      // toast.error("password is required!", {
      //     position: "top-center"
      // });
      alert("password is required!");
    } else if (password.length < 6) {
      // toast.error("password must be 6 char!", {
      //     position: "top-center"
      // });
      alert("password must be 6 char!");
    } else {
      // console.log("user login succesfully done");

      const data = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dash");
        setInpval({ ...inpval, email: "", password: "" });
      }
    }
  };

  return (
    <>
      {/* <section>
        <div className='form_data'>
            <div className='form_heading'>
                <h1> Login Page</h1>
                <p>Hello!!! You have landed to a login page</p>
            </div>

            <form >
                <div className='form_input'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name='email' value={inpval.email} onChange={setVal} id='email' placeholder='Enter Your email Address'/>
                </div>

                <div className='form_input'>
                    <label htmlFor='password'>Password</label>
                    <div className='two'>
                    <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name='password' id='password' placeholder='Enter Your password'/>
                    <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                        {!passShow ? "Show" :"Hide"}
                    </div>
                    </div>
                   
                </div>

                <button className='btn' onClick={loginuser} >Login</button>
                <p> Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
                <p style={{color:"black",fontWeight:"bold"}}> Forgot Password? <NavLink to="/password-reset">Click Here</NavLink></p>
            </form>
        </div>
    </section> */}

    <div className="card">
      <div className="login-screen">
        <form className="login-screen__from">
          <h3 className="login-screen__title">Login</h3>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              id="email"
              placeholder="Enter the Email"
              value={inpval.email}
              onChange={setVal}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password{" "}
              <Link
                className="login-screen__forgotpassword"
                to="/password-reset"
              >
                Forgot Password
              </Link>
            </label>
            <input
              type="password"
              name="password"
              required
              id="password"
              placeholder="Enter the password"
              value={inpval.password}
              onChange={setVal}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={loginuser}>
            Login
          </button>

          <span className="login-screen__subtext">
            Do Not Have An Account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
