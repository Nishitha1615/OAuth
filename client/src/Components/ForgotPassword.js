import React from "react";
import { api } from "../urlConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Components/mix.css";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const [password, setPassword] = useState("");

  const userValid = async () => {
    const res = await fetch(`${api}/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status == 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`${api}/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.status == 201) {
      setPassword("");
      setMessage(true);
    } else {
      alert("! Token Expired generate new LInk");
    }
    // }
  };

  useEffect(() => {
    userValid();
    // setTimeout(() => {
    //     setData(true)
    // }, 3000)
  }, []);

  return (
    <>
      <div className="forgotpassword__card">
        <div className="resetpassword-screen">
          <form className="resetpassword-screen__form">
            <h3 className="resetpassword-screen__title">Forgot Password</h3>
            {message ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                pasword reset Succsfully done...
              </p>
            ) : (
              ""
            )}

            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter new password"
                autoComplete="true"
                value={password}
                onChange={setval}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={sendpassword}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
