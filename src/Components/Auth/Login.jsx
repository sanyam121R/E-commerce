import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/Slices/authSlice';
import { userDetails } from '../../redux/Slices/userSlice';
import { getToCart } from '../../redux/Slices/shoppingSlice';
// import { MdOutlineFacebook } from "react-icons/md";
// import { IoLogoLinkedin } from "react-icons/io5";
// import { SiGmail } from "react-icons/si";
// import useSignIn from "react-auth-kit"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  
  const auth = useSelector(state=> state.auth);
  
  useEffect(() => {
    if(auth.userLoaded){
      navigate("/");
    }
  }, [auth])
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(user));
    await dispatch(userDetails());
  }

  return (
    <div className="m-14">
      <div className="bg-color : bg-teal-600 (green) max-w-4xl m-auto rounded-xl shadow-lg shadow-teal-500/50">
        <div className="flex items-center justify-center content-center text-center  h-[600px] max-w-4xl rounded-xl">
          <div className="flex justify-center items-center bg-white basis-3/4  h-full rounded-l-xl">
            <div className=" bg-white basis-3/4">
              <div className='flex flex-col gap-4'>
                <h1 className="font-bold text-4xl text-center text-teal-600">
                  Sign in to Shopkart
                </h1>
                {/* <div className=" flex first-letter:font-bold text-2xl justify-center">
                  <a href="/"><MdOutlineFacebook /></a>
                  <a href="/" className="ml-3"><IoLogoLinkedin /></a>
                  <a href="/" className="ml-3"><SiGmail /></a>
                </div>
                <div className="">or use your email account</div> */}

                <form onSubmit={handleSignIn}>
                  <div className="grid gap-x-8 gap-y-4 grid-cols-1 pt-5 ">
                    <div className="flex justify-center items-center gap-x-2">
                      <div>
                        <FaUser />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="username"
                          className="w-72 px-2 py-1 rounded-lg bg-gray-200 border-[0.1px] border-[#9ca3af]"
                          required
                          onChange={(e)=>setUser({...user, email:e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-2">
                      <div>
                        <FaLock />
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-72 px-2 py-1 rounded-lg bg-gray-200 border-[0.1px] border-[#9ca3af]"
                          required
                          onChange={(e)=>setUser({...user, password:e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <a href="/">
                    <p class="mt-4">Forgot your password ?</p>
                  </a> */}
                  <button
                    type="submit"
                    className="bg-teal-600 (green) px-14 rounded-full py-2 mt-4 text-white"
                  >
                    {auth.loginStatus === "pending" 
                      ? "Logging..." 
                      : auth.loginStatus === "success" 
                        ? "Logged" 
                        : "Login"
                      }

                  </button>
                </form>
                { 
                  auth.loginStatus === "rejected" ? 
                    (<div className='mt-3 text-red-500'>{auth?.loginError?.message}</div>)
                  : auth.loginStatus === "success" ? 
                      (<div className='mt-3 text-green-500'>Submitted successfully</div>) 
                    : null
                }
              </div>
            </div>
          </div>
          <div>
            <div className="bg-color : bg-teal-600 (green) max-w-screen-md basis-2/4  h-[170px] ">
              <h1 className="font-bold text-4xl m-auto text-center text-white">
                Hello, Friend !
              </h1>
              <p className="m-auto text-center mt-8 text-white px-10">
                Enter your personal details and start journey with us
              </p>
              <NavLink to='/register'>
                <button className="rounded-full  border-solid border-2 border-white  px-10 py-1 text-center text-white mt-8">
                  Register
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
