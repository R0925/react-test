import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridProducts = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        { field: 'id', filter: true, floatingFilter: true },
        { field: 'title', filter: true, floatingFilter: true },
        { field: 'price', filter: true, floatingFilter: true }
    ]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/auth/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRowData(response.data.products);

        } catch (error) {
            console.error(error);
            navigate('/')
        }
    };

    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className='flex justify-center w-full'>
            <div className="ag-theme-alpine w-[600px] h-[500px]">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
        </div>
    )
}

export default GridProducts