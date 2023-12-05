import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/Slices/authSlice';
import { logoutUserShopping } from '../redux/Slices/shoppingSlice';
import { logoutUserDetails } from '../redux/Slices/userSlice';

const Navbar = () => {
  const products = useSelector((state) => state.shopping.products);
  const auth = useSelector(state => state.auth.userLoaded);
  const dispatch = useDispatch();

  return (
    <>
      <main className='bg-teal-600 text-white w-full p-5'>
        <nav className='h-[26px] flex flex-row justify-between'>
          <section className='bg-white flex justify-center w-[38px] h-[38px] m-[-5px] rounded-full'>
            <img className="" src='/shopping-cart.svg' width={'30px'}/>
          </section>
          <section>
            <ul className='flex gap-6 list-none'>
                <li className='hover:text-[#f39221] hover:border-b-2'>
                  <NavLink to='/'><span>Home</span></NavLink>
                </li>
                <li className='hover:text-[#f39221] hover:border-b-2'>
                  <NavLink to='/about'><span>About</span></NavLink>
                </li>
                <li className='hover:text-[#f39221] hover:border-b-2'>
                  <NavLink to='/contact'><span>Contact</span></NavLink>
                </li>
                <li className=''>
                  <NavLink to='/cart'>
                    <div className='h-[26px] flex flex-row gap-[4px] items-center'>
                      <p className='hover:text-[#f39221] hover:border-b-2'>Cart</p>
                      <p className='w-[20px] h-[20px] text-center text-xs border-2 bg-[#f39221] rounded-full'>{products?.length}</p>
                    </div>
                  </NavLink>
                </li>
                <li className=''>
                  <NavLink to='/orders'>
                    <div className='h-[26px] flex flex-row gap-[4px] items-center'>
                      <p className='hover:text-[#f39221] hover:border-b-2'> Orders </p>
                      {/* <p className='w-[20px] h-[20px] text-center text-xs border-2 bg-[#f39221] rounded-full'>{products?.length}</p> */}
                    </div>
                  </NavLink>
                </li>
                
                {
                  (auth)? (
                    <>
                      <li className='hover:text-[#f39221] hover:border-b-2'>
                        <NavLink to='/user/profile'> Profile </NavLink>
                      </li>
                      <li className='hover:text-[#f39221] hover:border-b-2'>
                        <NavLink to='/login' onClick={() => {
                          dispatch(logoutUser());
                          dispatch(logoutUserDetails());
                          dispatch(logoutUserShopping());
                        }}> 
                          Logout 
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className='hover:text-[#f39221] hover:border-b-2'>
                        <NavLink to='/login'>Login</NavLink>
                      </li>
                      <li className='hover:text-[#f39221] hover:border-b-2'>
                        <NavLink to='/register'>Register</NavLink>
                      </li>
                    </>
                  )
                }
            </ul>
          </section>
        </nav>
      </main>
    </>
  )
  
}

export default Navbar