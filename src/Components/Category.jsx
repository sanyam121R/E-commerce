import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { prod_api } from '../redux/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Category = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    }
    const auth = useSelector(state => state.auth);
    // console.log("🚀 ~ file: Category.jsx:14 ~ Category ~ auth:", auth)
    
    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await axios.get(`${prod_api}/all-categories`, {
                headers: {
                    authorization: `${auth.accessToken}`,
                },
            });
            setCategories(response.data.data)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        }

        fetchCategories();
      }, []);

    return (
        <div>
            <div className='pt-16'>
                <div className='text-center'>
                    <h2 className='text-4xl font-semibold py-8 text-teal-600'>Product Categories</h2>
                    
                </div>
                <div className='flex flex-wrap justify-center text-center gap-8'>
                    {
                        categories.length > 0 && categories.map( cat => {
                            return (
                                <div 
                                    key={cat.id} 
                                    className='p-4 cursor-pointer hover:scale-105 transition duration-500'
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    <img src={cat.image} alt={cat.name} className='h-[260px] w-[260px] rounded-lg shadow-lg ' />
                                    <p className='text-2xl font-medium pt-5'>{cat.name}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Category