import React, { useEffect, useState } from 'react'
import axios from "axios"


function TableRow(props) {
    const [engagement, setEngagement] = useState(0);
    const [fans, setFans] = useState(0);
    const [update, setUpdate] = useState(true);
    console.log(props.start + " | " + props.end)

    const didUpdate = () => {
        setUpdate(!update);
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            let res = await axios.post("http://localhost:3000/getProfiles", {
                "profiles": props.profiles,
                "date": {
                    "start": props.start,
                    "end": props.end,
                    "timezone": "Europe/London"
                }
            })
            let data = await res.data;
            setEngagement(data.engagement);
            setFans(data.fans);
            console.log(fans + " | " + engagement);
        }
        fetchProfileData();
    }, [update])

    return (
        <tr>
            <td>
                {props.brand}
            </td>
            <td>
                {props.total_profiles}
            </td>
            <td>
                {fans}
            </td>
            <td>
                {engagement}
            </td>

        </tr>

    )
}

export default TableRow