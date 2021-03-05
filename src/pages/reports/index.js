import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
const Reports = () => {
    const networks = ["MSC1", "MSC2"];
    const protocals = ["MAP", "CAMEL", "BSSAP", "RANAP", "ISUP", "SIP", "BICC", "H248"];
    const kpis = ["BCHI", "SRI", "BSC", "RNC", "SMS", "LU", "OCS", "GMSC", "SIP"];
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [network, setNetwork] = useState();
    const [protocal, setProtocal] = useState();
    const [kpi, setKPI] = useState();
    return (
        <div>
            <div>
                <div className="flex flex-row">
                    <div className="col-4 flex ai-center ">
                        <label htmlFor="time24" className="label">Start Time</label>
                        <Calendar id="time24" value={startTime} onChange={(e) => setStartTime(e.value)} showTime />
                    </div>
                    <div className="col-4 flex ai-center ">
                        <label htmlFor="time24" className="label">End Time</label>
                        <Calendar id="time24" value={endTime} onChange={(e) => setEndTime(e.value)} showTime />
                    </div>
                    <div className="col-4 flex ai-center ">
                        <label htmlFor="time24" className="label">Network</label>
                        <Dropdown value={network} options={networks} onChange={(e) => setNetwork(e.target.value)} placeholder="Select Network" style={{ width: 150 }} />
                    </div>
                </div>

                <div className="flex flex-row mt-20">
                    <div className="col-4 flex ai-center ">
                        <label htmlFor="time24" className="label">Protocal</label>
                        <Dropdown value={protocal} options={protocals} onChange={(e) => setProtocal(e.target.value)} placeholder="Select Protocal" style={{ width: 150 }} />
                    </div>
                    <div clasName="flex ai-center" style={{ width: 50 }}>(or)</div>
                    <div className="col-4 flex ai-center ">
                        <label htmlFor="time24" className="label">KPI</label>
                        <Dropdown value={kpi} options={kpis} onChange={(e) => setKPI(e.target.value)} placeholder="Select KPI" style={{ width: 150 }} />
                    </div>
                </div>
                <div className="flex flex-row jc-center" style={{ marginTop: 40, }}>
                    <Button label="SUBMIT" style={{ marginRight: 20 }} />
                    <Button label="DOWNLOAD" />
                </div>
            </div>
        </div>
    )
}
export default Reports;