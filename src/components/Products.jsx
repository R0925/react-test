import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Products = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 10;

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/auth/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    limit,
                    skip: (currentPage - 1) * limit,
                },
            });
            setData(response.data.products);
            setTotalPages(Math.ceil(response.data.total / limit));

        } catch (error) {
            console.error(error);
            navigate('/')
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    className={`lg:w-[40px] lg:h-[40px] w-[25px] h-[25px] cursor-pointer border  ${currentPage === i ? 'bg-blue-300' : 'bg-white'}`}
                    key={i}
                    onClick={() => handlePageClick(i)}
                    disabled={i === currentPage}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className='bg-gray-100 flex flex-col items-center justify-center w-full h-full'>
            <table className='lg:w-[600px] '>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>price</th>
                </tr>
                {data.map((product, index) => (
                    <tr className={`text-center ${!(index % 2) ? 'bg-blue-100' : ''}`}>
                        <td className='px-5'>{product.id}</td>
                        <td  className=' px-5'>{product.title}</td>
                        <td  className=' px-5'>{product.price}</td>
                    </tr>
                ))}
            </table>
            <div className='mt-10'>
                <button onClick={handlePreviousPage} className='lg:w-[40px] lg:h-[40px] cursor-pointer border bg-white' disabled={currentPage === 1}>
                    {'<'}
                </button>
                {renderPageNumbers()}
                <button onClick={handleNextPage} className='lg:w-[40px] lg:h-[40px] cursor-pointer border bg-white' disabled={currentPage === totalPages}>
                    {'>'}
                </button>
            </div>
        </div>

    )
}

export default Products