import { useState } from 'react';
import validator from 'validator';
import SwichBtn from '../components/SwichBtn';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import ServerResponse from '../components/ServerResponse';
import { useNavigate } from 'react-router-dom';



const LandingPage = ({ setIsAuthenticated, setUserRole }) => {

  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('user');
  const [details, setDetails] = useState({ name: '', email: '', password: '', role: 'user' });
  const [serverRes, setServerRes] = useState('')
  const [inValidEmail, setInValidEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)



  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setDetails({ ...details, role: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" && !validator.isEmail(value)) { setInValidEmail(true) }
    else { setInValidEmail(false) }
    setDetails({ ...details, [name]: value });
  };



  const SignLogIn = async () => {

    try {
      const url = `http://localhost:5000/api/users/${isSignUp ? 'register' : 'login'}`;
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      const info = await response.json();
      console.log(info.role);

      if (info.role === "admin") {
        console.log("admin is here!");
        setUserRole("admin")
        setTimeout(()=>{
          navigate('/admin')
        }, 500)
      }

      console.log('Response:', info.message);
      setServerRes(info.message)

      !isSignUp ? setTimeout(() => {
        setIsAuthenticated(true);
      }, 1500) :
        ''

    } catch (error) {
      console.error('Error Loading user:', error);
      setServerRes("invalid Datailes!")
    }
  };


  const toolsSignUp = {
    SignLogIn, details, inValidEmail,
    showPassword, handleChange,
    setShowPassword
  }

  const toolsLogIn = {
    handleChange, details, SignLogIn,
    role, handleRoleChange,
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-96">

        < SwichBtn setIsSignUp={setIsSignUp} isSignUp={isSignUp} />

        {isSignUp ? <SignUp toolsSignUp={toolsSignUp} /> : <LogIn toolsLogIn={toolsLogIn} />}

        {serverRes && <ServerResponse setServerRes={setServerRes} serverRes={serverRes} />}
      </div>
    </div>
  );
};

export default LandingPage;
