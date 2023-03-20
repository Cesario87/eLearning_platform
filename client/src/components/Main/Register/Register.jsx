import React, { useState, useEffect } from "react";
import { onRegistration } from '../../../api/auth';
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    username:'',
    HIV_relationship: '',
    identity: '',
    age: 0


  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => { 
    setValues({ ...values, [e.target.name]: e.target.value }) 
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)
      setError('')
      setSuccess(data.message)//mensaje para el usuario
      setValues({ email: '', password: '' })
    } catch (error) {
      console.log(error);
      setError(error.message)
      //mensaje de error para el usuario
      setSuccess('')
    }
  }

  const  handleGoogle = useFetch("http://localhost:5000/google/signup");


  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);






  return <section>

  <form onSubmit={(e) => onSubmit(e)} >
  <input type='email' onChange={(e) => onChange(e)} 
            required 
            placeholder="Email"  
            id='email'
            name='email'
            value={values.email}/>
  <input type='password' onChange={(e) => onChange(e)} 
            required 
            placeholder="Contraseña"
            value={values.password}
            id='password'
            name='password'/>
  <input type='text' onChange={(e) => onChange(e)} 
          required 
          placeholder="Nombre de usuario"
          id='username'
          name='username'
          value={values.username}/>
  <input type='text' onChange={(e) => onChange(e)} 
          required 
          placeholder="Relación son el VIH"
          id='HIV_relationship'
          name='HIV_relationship'
          value={values.HIV_relationship}/>
  <input type='text' onChange={(e) => onChange(e)} 
          placeholder="Identidad de género"
          value={values.identity}
          id='identity'
          name='identity'/>
  <input type='number' onChange={(e) => onChange(e)} 
          required 
          placeholder="age"
          value={values.age}
          id='age'
          name='age'/>
  <input type="submit" value="Enviar" />
  </form>

  <div>{error}</div>
  <div >{success}</div>




  <div id="signUpDiv" data-text="signup_with"></div>

</section>
};

export default Register;
