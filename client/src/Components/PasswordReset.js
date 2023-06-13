import React , { useState } from 'react'
import {api} from "../urlConfig"
import "../Components/mix.css"
const PasswordReset = () => {
    const [email,setEmail]=useState("");
    const [message, setMessage] = useState("");

    const setVal=(e)=>
    {
        setEmail(e.target.value)
    }

    const sendlink=async (e)=>
    {
        e.preventDefault();

        if (email === "") {
            // toast.error("email is required!", {
            //     position: "top-center"
            // });
            alert("email is required!")
        } else if (!email.includes("@")) {
            // toast.warning("includes @ in your email!", {
            //     position: "top-center"
            // });
            alert("includes @ in your email!")
        } else {
            const res = await fetch(`/sendpasswordlink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status == 201) {
                setEmail("");
                setMessage(true)
            } else {
                // toast.error("Invalid User",{
                //     position: "top-center"
                // })
                alert("Invalid User")   
            }
        }
    }
  return (
    <>
        {/* <section>
        <div className='form_data'>
            <div className='form_heading'>
                <h1> Enter Your email</h1>
             
            </div>

            {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}

            <form >
                <div className='form_input'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name='email' value={email} onChange={setVal} id='email' placeholder='Enter Your email Address'/>
                </div>


                <button className='btn' onClick={sendlink} >Send</button>
                
            </form>
        </div>
    </section> */}

    <div className="forgotpassword__card">
    <div className="forgotpassword-screen">
      <form
        
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>

        {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
        
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            name='password'
            id="email"
            placeholder="Email address"
            value={email} 
            onChange={setVal}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={sendlink}>
          Send Email
        </button>
      </form>
    </div>
    </div>
    </>
  )
}

export default PasswordReset
