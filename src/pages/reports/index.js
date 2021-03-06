import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import { useSelector } from 'react-redux'
const Reports = () => {

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [network, setNetwork] = useState();
    const [protocal, setProtocal] = useState();
    const [kpi, setKPI] = useState();
    const { networks, protocals, kpis } = useSelector(state => state.metaReducer)
    console.log("counter", networks, protocals, kpis)
    return (
        <div className="p-d-flex p-jc-center p-ai-center">
            <div className="p-col-4">
                <Card>
                    <div className="p-grid p-col-12">
                        <div className="p-col-12 p-mb-1 p-jc-center">
                            <div>Start Date Time</div>
                            <Calendar id="starttime" value={startTime} onChange={(e) => setStartTime(e.value)} showTime yearRange="2000:2022" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-1 p-jc-center">
                            <div>End Date Time</div>
                            <Calendar id="endtime" value={endTime} onChange={(e) => setEndTime(e.value)} showTime yearRange="2000:2022" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-1  p-jc-center">
                            <div>Node</div>
                            <Dropdown value={network} options={networks} onChange={(e) => setNetwork(e.target.value)} placeholder="Select Node" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-1">
                            <div>Protocal</div>
                            <Dropdown value={protocal} options={protocals} onChange={(e) => setProtocal(e.target.value)} placeholder="Select Protocal" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-2 p-d-flex p-jc-center" >
                            (OR)
                        </div>
                        <div className="p-col-12 p-mb-1">
                            <div>KPI</div>
                            <Dropdown value={kpi} options={kpis} onChange={(e) => setKPI(e.target.value)} placeholder="Select KPI" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-1" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button label="SUBMIT" style={{ width: 120, fontSize: 14 }}></Button>
                            <Button label="DOWNLOAD" style={{ width: 120, fontSize: 14 }}></Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default Reports;