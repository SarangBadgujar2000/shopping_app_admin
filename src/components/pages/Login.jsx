import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constant';
import Notify from '../common/Notify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate=useNavigate();
  const [logInFormData, setLogInFormData] = useState({
        email: '',
        password: ''
  })

  const setFormData = (e) => {
    setLogInFormData({...logInFormData, [e.target.name]: e.target.value})
  }

  const [showNotify,setShowNotify] = useState(false)
  const [notifyData,setNotifyData] = useState({
    type: '',
    message: ''
  })

  const loginUser = async (e) => {
    try{
        e.preventDefault();
        const data = await apiConnection(apiEndpoints.LOGIN_USER_ENDPOINT,httpMethods.POST,logInFormData)
        console.log("Log for LoginUser",data);
        if(data.status === 200){
            navigate("/");
            setShowNotify(true)
            setNotifyData({...notifyData, message: data.data.message, type: 'success' })
        } else {
          setShowNotify(true)
          setNotifyData({...notifyData, message: 'ERROR: Please reload your application', type: 'danger' })
        }
    }
    catch {
        setShowNotify(true)
        setNotifyData({...notifyData, message: 'ERROR: Please reload your application', type: 'danger' })
    }
  }


  return (
    <div className='logIn w-m-25 p-5 border border-dark m-5'>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setFormData(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>loginUser(e)}>
                Login
            </Button>
        </Form>
        <br></br>
        <div className={"d-flex align-item-center"}>
          <p style={{ marginRight: '8px' }}>Don't have an account?</p>
          <Button variant='info' type='submit' onClick={()=>navigate("/signup")}>
            SignUp
          </Button>
        </div>
       { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
    </div>
  )
}