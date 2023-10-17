import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {PostWithoutAuth } from "../../Services/HttpServices";

function Auth() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleUsername = (value) => {
    setUsername(value);
  }
  const handlePassword = (value) => {
    setPassword(value);
  }

  const login = () => {
    console.log(username);
    sendRequest("/authentication/login");
    setUsername("");
    setPassword("");
    navigate("/");
    window.location.reload();
  }

  const register = () => {
    console.log(username);
    sendRequest("/authentication/register");
    setUsername("");
    setPassword("");
    navigate("/");
    window.location.reload();
  }

  const sendRequest = (path) => {
    PostWithoutAuth((path), {
      username: username,
      password: password,
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("username", username);
      })
      .catch((err) => console.log(err))
  }

  return (
    <FormControl>
      <InputLabel>Username</InputLabel>
      <Input onChange={(i) => handleUsername(i.target.value)} />
      <InputLabel style={{ top: 80 }}>Password</InputLabel>
      <Input style={{ top: 40 }}
        onChange={(i) => handlePassword(i.target.value)} />
      <Button variant="contained"
        style={{
          marginTop: 60,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white'
        }}
        onClick={() => register()}>Register</Button>
      <FormHelperText style={{ margin: 20 }}>Are you already registered?</FormHelperText>
      <Button variant="contained"
        style={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white'
        }}
        onClick={() => login()}>Login</Button>
    </FormControl>
  )
}

export default Auth;