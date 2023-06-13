import React, { useState } from 'react'
import { NavLink ,Link} from 'react-router-dom'
import {api} from "../urlConfig"
// import { ToastContainer, toast } from 'react-toastify';
import "../Components/mix.css";

const Register = () => {
    const [passShow,setPassShow]=useState(false)
    const [cpassShow,setCPassShow]=useState(false)

    const[inpval,setInpval]=useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
    });

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            // toast.warning("fname is required!", {
            //     position: "top-center"
            // });

            alert("Please enter your name")
        } else if (email === "") {
            // toast.error("email is required!", {
            //     position: "top-center"
            // });

            alert("Please enter your email");
        } else if (!email.includes("@")) {
            // toast.warning("includes @ in your email!", {
            //     position: "top-center"
            // });

            alert("enter the valid email")
        } else if (password === "") {
            // toast.error("password is required!", {
            //     position: "top-center"
            // });

            alert("Please  your password")

        } else if (password.length < 6) {
            // toast.error("password must be 6 char!", {
            //     position: "top-center"
            // });

            alert("password must be 6 char")
        } else if (cpassword === "") {
            // toast.error("cpassword is required!", {
            //     position: "top-center"
            // });

            alert("cpassword is required!")
        }
        else if (cpassword.length < 6) {
            // toast.error("confirm password must be 6 char!", {
            //     position: "top-center"
            // });

            alert("confirm password must be 6 char!")
        } else if (password !== cpassword) {
            // toast.error("pass and Cpass are not matching!", {
            //     position: "top-center"
            // });
            alert("pass and Cpass are not matching!")
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch(`${api}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  fname, email, password, cpassword
                })
            });

            const res = await data.json();
            console.log(res);

            if (res.status === 201) {
                // toast.success("Registration Successfully done 😃!", {
                //     position: "top-center"
                // });
                alert("user registration Successfully done 😃!")
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            }
        }
    }


  return (
    <>
      {/* <section>
        <div className="form_data">
          <div className="form_heading">
            <h1> Sign Up</h1>
            <p>Hello!! Register the Page Before You login..</p>
          </div>

          <form>

          <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text" onChange={setVal} value={inpval.fname}
                name="fname"
                id="fname"
                placeholder="Enter Your Name"
              />
            </div>


            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email" onChange={setVal} value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Your email Address"
              />
            </div>

            

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>Register</button>
            <p> Already have an Account? <NavLink to="/">Log In</NavLink></p>
          </form>
        </div>
      </section> */}

      <div className="card">
      <div className="register-screen">
      <form className="register-screen__from">
        <h3 className="register-screen__title">Register</h3>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="fname"
            required
            id="fname"
            placeholder="Name"
            onChange={setVal}
            value={inpval.fname}
          />
        </div>


        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            name="email"
            placeholder="Enter the Email"
            onChange={setVal}
            value={inpval.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="Enter the password"
            onChange={setVal} value={inpval.password}
          />
        </div>


        <div className="form-group">
          <label htmlFor="confrimpassword">Confrim Password</label>
          <input
            type="password"
            required
            name="cpassword"
            id="cpassword"
            placeholder="Enter the Confrim Password"
            onChange={setVal} value={inpval.cpassword}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={addUserdata}>Register</button>

        <span className="register-screen__subtext">Already Have An Account? <Link to="/">Login</Link></span>
      </form>
    </div>
    </div>
    </>
  );
};

export default Register;
