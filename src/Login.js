import React, { useState } from "react";
import './Login.css';
import signInImage from './signup.jpg'
import Go from './G_icon.png';

const Login = () => {
    
   
    return (
      <div className="auth__form-container">
        <div className="auth__form-container_fields">
          
            <img src={Go}/>

            <div className="auth__form-container_fields-content_button items-center">
              <a href="https://ninth-bonito-377309.el.r.appspot.com/auth/google"><button className="center">
             Sign-in using Google</button></a>
            </div>
            
        </div>
         <div className="auth__form-container_image">
          <img src={signInImage} alt="Sign In"/>
          </div> 
      </div>
    )
  }
  

export default Login;