
import Login from "./Components/Login";
import Dashboard from "./Components/Dasboard";
import Error from "./Components/ErrorFile";
import {Routes,Route} from "react-router-dom";
import PasswordReset from "./Components/PasswordReset";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register"
function App() {
  return (
    <>
      {/* <Header/> */}

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dash" element={<Dashboard/>}/>
        <Route path="*" element={<Error/>}/>
        <Route path="/password-reset" element={<PasswordReset/>}/>
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
      </Routes>

    </>
  );


}

export default App;
