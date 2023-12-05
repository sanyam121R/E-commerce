import React from 'react'
import { Fragment, useContext, useEffect } from 'react';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToCart } from '../redux/Slices/shoppingSlice';

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getToCart({userId: user.userId}));
    }, [user])

    return (
        <Fragment>
            <div>
                <div className='flex justify-between items-center bg-teal-600 px-10 py-16 max-sm:block'>
                    <div className='pl-8 text-white'>
                        <h1 className='text-6xl font-semibold my-8 max-sm:text-3xl max-md:text-4xl '>NEW ARRIVALS</h1>
                        <p className='text-4xl my-8 max-sm:text-2xl max-md:text-2xl'>Explore the latest collection now</p>
                        <button
                            className='bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-[#f39e3a] hover:text-white'
                            onClick={()=>{
                                navigate("/category");
                            }}
                        >
                            Shop Now
                        </button>
                    </div>
                    <div className=''>
                        <img src='https://www.freepnglogos.com/uploads/shopping-bag-png/shopping-bag-shopping-bags-transparent-png-svg-vector-8.png' alt='hero' className='max-sm: h-72 w-72 m-auto' />
                    </div>
                </div>

               <Category />

            </div>
        </Fragment>
    )
}

export default Home;