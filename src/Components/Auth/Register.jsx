import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from '../../redux/Slices/authSlice';
import { MdOutlineFacebook } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiGmail } from "react-icons/si";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const auth = useSelector(state=> state.auth);

  useEffect(() => {
    if(auth.userLoaded){
      navigate("/");
    }
    
    if(auth.registerStatus === "success"){
      navigate("/login");
    }
  }, [auth.registerStatus, auth])
  
  // console.log("🚀 ~ file: Register.jsx:31 ~ Register ~ auth?.registerError:", auth?.registerError)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user))
  }

  return (
    <div className="border-teal-600 bg-cover m-14 rounded-xl">
      <div className="md:bg-color: bg-teal-600 (green) max-w-4xl m-auto rounded-xl shadow-lg shadow-teal-500/50">
        <div className="md:flex items-center justify-center content-center text-center  h-[600px] max-w-4xl">
          <div>
            <div className="md:bg-color : bg-teal-600 (green) max-w-screen-md basis-2/4  h-[170px] max-w-screen border-transparent">
              <h1 className="font-bold text-4xl m-auto text-center text-white">
                Welcome back
              </h1>
              <p className="m-auto text-center mt-8 text-white px-5">
                To keep connected with us please login with your personal info
              </p>
              <NavLink to='/login'>
                <button
                  // onClick={ () => clickHandle()}
                  className="rounded-full  border-solid border-2 border-white  px-6 py-1 text-center text-white mt-8"
                >
                  Login
                </button>
              </NavLink>
            </div>
          </div>
          <div className=" bg-white basis-3/4  h-full ">
            <div className="flex flex-col gap-2 bg-white basis-3/4  h-[400px] mt-[25%]">
              <div>
                <h1 className="font-bold text-4xl m-auto text-center text-teal-600">
                  Create Account
                </h1>
              </div>
                {/* <div className=" flex first-letter:font-bold text-2xl  mt-5  justify-center">
                    <a href="/">
                      <MdOutlineFacebook />
                    </a>
                    <a href="/" className="ml-3">
                      <IoLogoLinkedin />
                    </a>
                    <a href="/" className="ml-3">
                      <SiGmail />
                    </a>
                  </div> 
                  <p className="mt-3">or use your email for registration</p>
                */}
              <div>
                <form onSubmit={handleSubmit}>
                  <div className=" mt-5 grid gap-x-8 gap-y-4 grid-cols-1 ">
                    <div>
                      <input
                        className="text-sm w-72 px-4 py-2 rounded-lg bg-gray-200 border-[#9ca3af]"
                        type="text"
                        placeholder="First Name"
                        required
                        onChange={(e)=>setUser({...user, firstName:e.target.value})}
                      />
                      </div>
                    <div>
                      <input
                        className="text-sm w-72 px-4 py-2 rounded-lg bg-gray-200 border-[#9ca3af]"
                        type="text"
                        placeholder="Last Name"
                        required
                        onChange={(e)=>setUser({...user, lastName:e.target.value})}
                      />
                    </div>
                    <div>
                      <input
                        className="text-sm w-72 px-4 py-2 rounded-lg bg-gray-200 border-[#9ca3af]"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e)=>setUser({...user, email:e.target.value})}
                      />
                    </div>
                    <div>
                      <input
                        className="text-sm w-72 px-4 py-2 rounded-lg bg-gray-200 border-[#9ca3af]"
                        type="Password"
                        placeholder="Password"
                        required
                        onChange={(e)=>setUser({...user, password:e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <button className="bg-teal-600 (green) px-14 rounded-full py-2 mt-8 text-white">
                    {auth.registerStatus === "pending" ? "Submitting" : auth.registerStatus === "success" ? "Submitted" : "Register"}
                  </button>
                </form>

                { 
                  auth.registerStatus === "rejected" 
                    // ? (<div className='mt-3 text-red-500'>{auth?.registerError?.message}</div>)
                    ? (<div className='mt-3 text-red-500'>{auth?.registerError?.message }</div>)

                    : auth.registerStatus === "success" 
                      ? (<div className='mt-3 text-green-500'>Submitted successfully</div>) 
                      : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;