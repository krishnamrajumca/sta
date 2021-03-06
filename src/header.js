import React from 'react';
import {
    useHistory
} from "react-router-dom";
import { useSelector } from 'react-redux'
const Header = () => {
    let history = useHistory();
    const username = useSelector(state => state.metaReducer.username)
    return (
        <div id="navHeader">
            <div className="p-grid p-d-flex p-sm-12 p-p-0" >
                <div className="p-sm-2">

                </div>
                <div className="p-md-8 p-sm-6 p-d-flex p-jc-center">
                    SMART ANALYSER
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