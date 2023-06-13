import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./Context/Context";
import { api } from "../urlConfig";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dasboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${api}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    // console.log(data);

    if (data.status == 401 || !data) {
      history("*");
      console.log("error page");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  const logout = () => {
    localStorage.removeItem("usersdatatoken");
    history("/");
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h1>User Name:{logindata ? logindata.ValidUserOne.fname : ""}</h1>{" "}
          <br />
          <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
          <div>
            <button type="submit" className="btn btn-primary" onClick={logout}>
              LogOut
            </button>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dasboard;
