import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const Analytics = () => {
    const networks = ["MSC1", "MSC2"];
    const protocals = ["MAP", "CAMEL", "BSSAP", "RANAP", "ISUP", "SIP", "BICC", "H248"];
    const inputs = ["MSISDN", "IMSI", "SUBSCRIPTION-ID", "IMEI"]
    const timeDurations = ["30 SEC", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "% MIN"]
    const [protocal, setProtocal] = useState();
    const [network, setNetwork] = useState();
    const [input, setInput] = useState();
    const [timeDuration, setTimeDuration] = useState();
    return (
        <div>


            <div className="flex flex-row mt-20">
                <div className="col-6 flex ai-center ">
                    <label htmlFor="time24" className="label">Input Criteria</label>
                    <Dropdown value={input} options={inputs} onChange={(e) => setInput(e.target.value)} placeholder="Select Input Criteria" style={{ width: 150 }} />
                </div>
                <div className="col-6 flex ai-center ">
                    <label htmlFor="time24" className="label">Node Name</label>
                    <Dropdown value={network} options={networks} onChange={(e) => setNetwork(e.target.value)} placeholder="Select Node Name" style={{ width: 150 }} />
                </div>
            </div>
            <div className="flex flex-row mt-20">
                <div className="col-6 flex ai-center ">
                    <label htmlFor="time24" className="label">Protocal</label>
                    <Dropdown value={protocal} options={protocals} onChange={(e) => setProtocal(e.target.value)} placeholder="Select Protocal" style={{ width: 150 }} />
                </div>
                <div className="col-6 flex ai-center ">
                    <label htmlFor="time24" className="label">Time Duration</label>
                    <Dropdown value={timeDuration} options={timeDurations} onChange={(e) => setTimeDuration(e.target.value)} placeholder="Select Time Duration" style={{ width: 150 }} />
                </div>
            </div>
            <div className="flex flex-row jc-center" style={{ marginTop: 40, }}>
                <Button label="START" style={{ marginRight: 20 }} />
                <Button label="STOP" />
            </div>
        </div>
    )
}
export default Analytics;