import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../redux/Slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const orders = useSelector(state => state.orders);

    const [totalAmount, setTotalAmount] = useState();

    useEffect(()=>{
        dispatch(getOrders({userId: user.userId}));
    }, [user.userLoaded]);
    
    return (
        <>
        <div className="flex flex-col items-center">
            <div className='text-left mx-10 mb-2 item-left'>
                <h1 className='text-3xl font-semibold py-8 text-teal-600'>Ordered Products</h1>
            </div>
            <div>
                <h3 className='mx-10 text-xl font-normal'>Total Orders: {orders?.orderedProducts.length}</h3>
            </div>
            {
                orders.ordersLoaded ?
                    orders?.orderedProducts.map((order, index)=>{
                        return (
                            <>
                                <div className='m-6 w-[85%] bg-teal-200 rounded-lg shadow-lg'>
                                    <div className='mx-5 p-4'>
                                        <div className='text-base font-normal flex gap-4'>
                                            <div><span className='font-bold'>Name: </span>{user?.firstName} {user?.lastName}</div>
                                            <div><span className='font-bold'>Address:</span> {order?.address}</div>
                                            <div><span className='font-bold'>Contact:</span> {order?.contactNo}</div>
                                            <div><span className='font-bold'>Ordered Date:</span> {order?.date}</div>
                                        </div>
                                        <div>
                                            <div><span className='font-bold'>Email:</span> {user?.email}</div>
                                            <div><span className='font-bold'>Total Amount:</span> {} </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap mx-10' key={index+2}>
                                        {
                                            order.products.length && order.products.map((product, index) => {
                                                return (
                                                    <div
                                                        onClick={()=>{
                                                            navigate(`/product/${product?.productId}`);
                                                        }} 
                                                        key={index} 
                                                        className='cursor-pointer bg-white w-80 truncate p-3 m-6 flex flex-col gap-4 rounded-lg shadow-lg'
                                                    >
                                                        <div>
                                                            <img src={product.image} alt={product.title} className='h-32 align-left rounded-lg shadow-lg' />
                                                        </div>
                                                        <div className='w-72 text-base font-normal'>
                                                            <p className='font-bold truncate'>{product.title}</p>
                                                            <div className='flex flex-row justify-between'>
                                                                <p><span className='font-semibold'> Price: </span> {product.price}</p>
                                                                <p><span className='font-semibold'> Quantity: </span> {product.quantity}</p>
                                                            </div>
                                                            <p><span className='font-semibold'> Sub-Total: </span> {product.price * product.quantity}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                
                            </>
                        )
                    })
                : null
            }
        </div>
        </>

    )
}

export default Orders