import React,{useState} from 'react'
import { useNavigate} from "react-router-dom";
const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,cpassword} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){

      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert("Sign up successfully","success")
    }
    else{
      props.showAlert("Not sign up successfully","success")

    }

  }
  const onChange = (e) => {

    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h1>Sign up to make your notes </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" onChange={onChange} className="form-control" name='name' id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onChange} className="form-control" name='password' id="password" required minLength={5}  />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="pcassword" onChange={onChange} className="form-control" name='cpassword' id="cpassword" required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup