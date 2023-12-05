import { FaLocationDot } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiGmail } from "react-icons/si";
import { MdOutlineFacebook } from "react-icons/md";

import { IoIosPhonePortrait } from "react-icons/io";
import { IoIosMail } from "react-icons/io";


export default function Footer(){
    return(
        <div className="h-64 bg-teal-600 flex align-middle w-full">
            <div className="bg-teal-600 basis-1/3 border-r-[1.5px] ">
                <div className='py-12 px-7 text-white '>
                    <h1 className='text-3xl font-medium'>Shopkart</h1>
                    <div className='flex list-none mt-5 '>
                       <a href="#"><li className='mr-2 hover:text-[#f39e3a]'>Home</li></a>|
                       <a href="#"><li className='mr-2 ml-2 hover:text-[#f39e3a]'>Blog</li></a>|
                       <a href="#"><li className='mr-2 ml-2 hover:text-[#f39e3a]'>Pricing</li></a>|
                       <a href="#"><li className='mr-2 ml-2 hover:text-[#f39e3a]'>Contact</li></a>|
                    </div>
                    <p className='mt-5'>Powered By CloudEQ</p>
            
                </div>
            </div>
            <div className="bg-teal-600 basis-1/3 border-r-2"> 
                <div className='py-12 px-7   '>
                    <div className='flex'>
                        <div className='p-2 h-9 w-9 text-xl rounded-full bg-white'>
                            <FaLocationDot/>
                        </div>
                        <div className="text-white ml-5">
                            <p>70, Industrial Area Phase I, Ind, Area, Chandigarh, 160101</p>
                        </div>
                    </div>
                    <div className='flex mt-5 '>
                        <div className='p-2 h-9 w-9 text-xl rounded-full bg-white'>
                            <IoIosPhonePortrait />
                        </div>
                        <div className='ml-5 mt-1'>
                            <p className="text-white">+91-7878789778</p>
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <div className='p-2 h-9 w-9 text-xl rounded-full bg-white'>
                            <IoIosMail/>
                        </div>
                        <div className='ml-5 mt-1'>
                            <p className="text-white">support@cloudeq.com</p>
                        </div>
                    </div>
                   
                    
                </div>
            </div>
            <div className="bg-teal-600 basis-1/3">
                <div className='py-9 px-7 m-auto'>
                    <h1 className='text-2xl font-medium text-white'>About the Company</h1>
                    <p className='mt-5  text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores eaque rem at nisi atque facere neque amet deleniti, ratione illum.</p>
                    <div className='flex mt-5 text-2xl '>
                        <a href="#"><SiGmail className='p-2 h-9 w-9 text-xl rounded-full bg-white mr-3 hover:bg-[#f39e3a] hover:text-teal-600'/></a>
                        <a href="#"><IoLogoLinkedin className='p-2 h-9 w-9 text-xl rounded-full bg-white mr-3 hover:bg-[#f39e3a] hover:text-teal-600'/></a>
                        <a href="#"><MdOutlineFacebook className='p-2 h-9 w-9 text-xl rounded-full bg-white mr-3 hover:bg-[#f39e3a] hover:text-teal-600'/></a>

                    </div>
                </div>
            </div>
        </div>
    )
}