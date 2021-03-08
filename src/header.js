import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import moment from 'moment';
import { useSelector } from 'react-redux'
const Header = () => {
    let history = useHistory();
    const [time, setTime] = useState("00:00");
    const username = useSelector(state => state.metaReducer.username)
    useEffect(() => {
        setInterval(() => {
            setTime(moment().format("HH:mm"))
        }, 1000)
    })
    return (
        <div id="navHeader">
            <div className="p-grid p-d-flex p-sm-12 p-p-0" >
                <div className="p-sm-2">

                </div>
                <div className="p-md-7 p-sm-5 p-d-flex p-jc-center" style={{ fontWeight: 'bold', fontSize: 20 }}>
                    SMART ANALYSER
                </div>
                <div className="p-lg-1">
                    Time :{time}
                </div>
                <div className="p-md-2 p-sm-4 p-justify-end p-d-flex p-jc-end">
                    <span className="p-mr-2">{username}</span>
                    <i className="pi pi-power-off " onClick={() => history.push("/")}></i>
                </div>
            </div>

        </div>
    )
}

export default Header