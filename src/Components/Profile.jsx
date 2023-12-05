import { useState, useEffect } from "react";
import axios from "axios";
import { auth_api } from "../redux/api";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector(state=>state.user);
  // const auth = useSelector(state=>state.auth);

  const [userInfo, setUserInfo] = useState({});
  console.log("🚀 ~ file: Profile.jsx:11 ~ Profile ~ userInfo:", userInfo)
  
  useEffect(() => {
    const fetchUserData = async () => {
      await setUserInfo(user.user);
    };

    fetchUserData();
  }, []);
  
  return (
    <div className="m-16">
      <div className="flex h-[500px] max-w-4xl m-auto  rounded-2xl shadow-2xl">
        <div className="bg-teal-600 rounded-2xl basis-1/3 pt-8">
          <div className="h-[200px] rounded-full max-w-[200px] m-auto bg-contain bg-no-repeat bg-[url('https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg')]"></div>
          {/* <div className="text-center">
            <button className="m-auto bg-blue-400 px-8 mt-5 rounded-full gap-5 text-center py-1">
              Connect to linkedIn
            </button>
          </div> */}
        </div>
        <div className=" bg-white basis-2/3 pt-12 rounded-r-2xl">
          <div className=" text-4xl max-w-md  m-auto">
            <h1 className="font-bold">My Profile</h1>
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              <div>
                <label
                  className="block text-sm font-bold "
                  for="username"
                >
                  First Name
                </label>
                <input
                  className="shadow pl-2 appearance-none font-bold border rounded-md w-full text-sm cursor-not-allowed py-1"
                  id="username"
                  type="text"
                  placeholder=""
                  value={userInfo?.firstName}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-bold"
                  for="username"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none pl-2 border font-bold rounded-md w-full cursor-not-allowed text-sm py-1"
                  id="username"
                  type="text"
                  placeholder=""
                  value={userInfo?.lastName}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-bold"
                  for="username"
                >
                  Time Zone
                </label>
                <input
                  className="shadow appearance-none pl-2  border font-bold rounded-md w-full text-sm py-1 cursor-not-allowed"
                  id="username"
                  type="text"
                  placeholder="UTC+5:30"
                  value=""
                />
              </div>
              <div>
                <label
                  className="block text-sm font-bold"
                  for="username"
                >
                  Phone No
                </label>
                <input
                  className="shadow appearance-none pl-2 border font-bold rounded-md w-full cursor-not-allowed text-sm py-1"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  className="block text-sm font-bold"
                  for="username"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border pl-2 font-bold rounded-md w-full text-sm   cursor-not-allowed  py-1"
                  id="username"
                  type="text"
                  placeholder=""
                  value={userInfo?.email}
                />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
