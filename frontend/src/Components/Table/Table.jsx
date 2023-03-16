import React, { useEffect, useState } from 'react'
import axios from "axios"
import TableRow from '../TableRow/TableRow'
// import Datepicker from "../Datepicker/Datepicker";

import "./Table.css"

const toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt;
}

function Table(props) {
    const [brands, setBrands] = useState({});
    const [start, setStart] = useState((new Date().getTime()));
    const [end, setEnd] = useState((new Date().getTime()));
    const [update, setUpdate] = useState(false);
    
    const didUpdate = () => {
        setUpdate(!update);
    }

    const handleStartDate = (e) => {
        e.preventDefault();
        setStart(toTimestamp(e.target.value));
    }

    const handleEndDate = (e) => {
        e.preventDefault();
        setEnd(toTimestamp(e.target.value));
    }

    const fetchBrands = async () => {
        try {
            const res = await axios.get("http://localhost:3000/getBrands")
            const data = await res.data;

            setBrands(data);
            console.log(data);
        }
        catch(err) {
            console.error(err);
        }
    }

  

    useEffect(() => {
        fetchBrands();
    }, [])

    return (
        <div className="table-wrapper">
            <table className='table'>
                <thead>
                    <tr>
                        <td>Brand Name</td>
                        <td>Total Profiles</td>
                        <td>Total Fans</td>
                        <td>Total Engagement</td>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(brands) ? brands.map((elem) => {
                    return( 
                        <TableRow 
                            brand = {elem.brand_name}
                            profiles = {elem.profiles}
                            total_profiles = {elem.total_profiles}
                            start = {(start)}
                            end = {(end)}
                            update = {update}
                        />
                    )
                }) : <></>}
                </tbody>
            </table>
            <div className='datepicker-container'>
                <p>Start date:</p>
                <div className='date-container'>
                    <input type="datetime-local" onChange={handleStartDate} value={new Date().getTime()}/>
                    <p>{start}</p>
                </div>               
                <p>End date:</p>
                <div className='date-container'>
                    <input type="datetime-local" onChange={handleEndDate} value={new Date().getTime()} />
                    <p>{end}</p>
                </div>
                <button  onClick={didUpdate}> Update </button>
            </div>
        </div>
    )
}

export default Table