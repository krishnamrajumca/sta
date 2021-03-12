import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import { Badge } from 'primereact/badge';
import moment from 'moment';
import Alert from './components/Alert'
import { useSelector, useDispatch } from 'react-redux';
const Header = () => {
    let history = useHistory();
    const [time, setTime] = useState("00:00");
    const [showAlert, setShowAlert] = useState(false);
    const [len, setLength] = useState(0)
    const username = useSelector(state => state.metaReducer.username)
    const alertsData = useSelector(state => state.metaReducer.alertsData);
    const dispatch = useDispatch()
    useEffect(() => {
        setInterval(() => {
            setTime(moment().format("HH:mm"))
        }, 1000)
    })
    useEffect(() => {
        const length = alertsData.msc1.length + alertsData.msc2.length + alertsData.gmsc.length;
        setLength(length)
    }, [alertsData])
    const onClose = (e) => {
        setShowAlert(false);
        const { msc1, msc2, gmsc } = alertsData;

        dispatch({ type: "ALERT_ACK", payload: e })
        dispatch({ type: "SET_ALERT_DATA", payload: { msc1: [], msc2: [], gmsc: [] } })
    }
    const open = () => {
        if (len !== 0) {
            setShowAlert(true)
        }
    }
    return (
        <div id="navHeader">
            <div className="p-grid p-d-flex p-sm-12 p-p-0" >
                <div className="p-sm-2">

                </div>
                <div className="p-md-5 p-sm-5 p-d-flex p-jc-center" style={{ fontWeight: 'bold', fontSize: 20 }}>
                    SMART ANALYSER
                </div>
                <div className="p-lg-1">
                    Time :{time}

                </div>

                <div className="p-md-3 p-sm-4 p-justify-end p-d-flex p-jc-end">
                    <span className="p-mr-2">{username}</span>
                    <i className="pi pi-power-off" onClick={() => history.push("/")}></i>
                </div>
                <div className="p-lg-1">

                    <i className="pi pi-bell p-mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.4rem' }} onClick={open}>
                        <Badge value={len} size="small"></Badge>
                    </i>
                </div>
            </div>
            {
                showAlert &&
                <Alert visible={showAlert} msc1={alertsData.msc1} msc2={alertsData.msc2} gmsc={alertsData.gmsc} onClose={onClose} time={time} onCloseWithoutAcknowledge={() => setShowAlert(false)} />
            }
        </div>
    )
}

export default Header