import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/Slices/shoppingSlice";
import ItemCard from "./ItemCard";
import { cart_api } from "../../redux/api";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.shopping.products);
  const user = useSelector(state=>state.user.user);

  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [userInfo, setUserInfo] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  })
  const [showForm, setShowForm] = useState(false);
  const [allFormData, SetAllFormData]=useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const toggleModal = (e) => {
    e.preventDefault();
    setShowForm(true);
  }

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId
    })
  }, [user.userLoaded]);
  
  useEffect(() => {
    let price = 0;
    products?.map((item) => {
      price += item?.price * item?.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  function handleChange(e){
    e.preventDefault()
    setUserInfo((prev)=>({...prev , [e.target.name]:e.target.value}))
  }

  const handleOnSubmitOrder = async (event) => {
    event.preventDefault();
    setShowForm(!showForm);
    
    products.map((item) => {
      setOrderProducts(prev=>([...prev, {productId: item.productId, quantity: item.quantity}]));
    })
    
    
    SetAllFormData({...userInfo, products: products})
    // navigate('/orders');
  };

  return (
    <div className="w-[700px] mx-60 px-4">
      <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
        <h1 className="text-5xl text-primeColor font-titleFont font-bold">
          Cart
        </h1>
      </div>
      {products.length > 0 ? (
        <>
          <div className="pb-20">
            <div className="w-full mt-5 flex flex-col gap-[15px]">
              {
                products.map((item, index) => (
                  <div key={index}>
                    <ItemCard item={item} />
                  </div>
                )) 
              }
            </div>
            {/* <button onClick={() => dispatch(resetCart())}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
              >
              Reset cart
            </button> */}
            <div className="w-full xl:max-w-7xl gap-4 flex mt-4">
              <div className="w-full flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-center">Cart totals</h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide font-titleFont">
                      ${totalAmt}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide font-titleFont">
                      ${shippingCharge}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-lg font-titleFont">
                      ${totalAmt + shippingCharge}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <a href="#modale">
                    <button onClick={toggleModal} className="w-52 h-10 bg-black text-white hover:bg-[#2b2b2b] duration-200">
                      Proceed to Checkout
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------------  Order Modale */}
          {showForm && (
            <>
              <div className="h-screen w-screen fixed flex top-0 left-0 right-0 bottom-0 items-center justify-center z-8 backdrop-blur-sm overflow-hidden"></div>
              <div id="modale" className="fixed translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] items-center justify-center w-auto h-auto z-10 bg-white rounded-md shadow-lg p-4">
                <div className="py-5 px-6 text-xl flex flex-row justify-between">
                  <h2>Address Details</h2>
                  <div onClick={toggleModal}>X</div>
                </div>
                <form
                  onSubmit = {handleOnSubmitOrder}
                  className="w-[450px] h-auto py-6 flex flex-col justify-center gap-4 px-12"
                >
                  <input className="bg-slate-200 px-2 py-1 rounded-lg" name="firstName" id="firstName" value={userInfo.firstName} onChange={handleChange} type="text" placeholder="First Name" />
                  <input className="bg-slate-200 px-2 py-1 rounded-lg" name="lastName" id="lastName"  value={userInfo.lastName} onChange={handleChange} type="text" placeholder="Last Name" />
                  <input className="bg-slate-200 px-2 py-1 rounded-lg"  name="email" id="email" value={userInfo.email} onChange={handleChange} type ="email" placeholder="Email" />
                  <input className="bg-slate-200 px-2 py-1 rounded-lg" name="phone" id="phone" value={userInfo.phone} onChange={handleChange} type="text" placeholder="Phone Number" />
                  <input className="bg-slate-200 px-2 py-1 rounded-lg" name="address" id="address" value={userInfo.address} onChange={handleChange} type="text" placeholder="Address" />
                  <button 
                    className="w-32 h-8 bg-black text-white hover:bg-[#2b2b2b] duration-200 rounded-lg"
                    type="submit"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col mdl:flex-row gap-4 pb-20 h-[417px]">
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <NavLink to="/category">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
