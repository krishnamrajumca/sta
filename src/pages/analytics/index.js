import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card'
import { useSelector } from 'react-redux'
const Analytics = () => {



    const [protocal, setProtocal] = useState();
    const [network, setNetwork] = useState();
    const [input, setInput] = useState();
    const [isStart, setStart] = useState(false);
    const [timeDuration, setTimeDuration] = useState();
    const [isStoped, setStoped] = useState(false)
    const { networks, protocals, input_crireria, timeDurations } = useSelector(state => state.metaReducer)
    const start = () => {
        if (protocal && networks && input && timeDuration) {
            setStart(true);
            setStoped(false);
        }

    }
    return (
        <div className="p-d-flex p-jc-center p-ai-center">
            <div className="p-col-4">
                <Card>
                    <div className="p-grid p-col-12">
                        <div className="p-col-12 p-mb-1  p-jc-center">
                            <div>Input Criteria</div>
                            <Dropdown value={input} options={input_crireria} onChange={(e) => setInput(e.target.value)} placeholder="Select Node" style={{ width: 250 }} />
                        </div>

                        <div className="p-col-12 p-mb-1  p-jc-center">
                            <div>Node</div>
                            <Dropdown value={network} options={networks} onChange={(e) => setNetwork(e.target.value)} placeholder="Select Node" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-1">
                            <div>Protocal</div>
                            <Dropdown value={protocal} options={protocals} onChange={(e) => setProtocal(e.target.value)} placeholder="Select Protocal" style={{ width: 250 }} />
                        </div>

                        <div className="p-col-12 p-mb-1">
                            <div>Time Duration</div>
                            <Dropdown value={timeDuration} options={timeDurations} onChange={(e) => setTimeDuration(e.target.value)} placeholder="Select Input Criteria" style={{ width: 250 }} />
                        </div>
                        <div className="p-col-12 p-mb-1" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button label="Start" style={{ width: 120, fontSize: 14, backgroundColor: isStart ? 'green' : 'blue' }} onClick={start}></Button>
                            <Button label="Stop" style={{ width: 120, fontSize: 14, backgroundColor: isStart ? 'red' : 'blue' }} onClick={() => { setStart(false); setStoped(true) }}></Button>
                        </div>
                        <div className="p-col-12 p-mb-2  p-jc-center" style={{ textAlign: 'center' }}>
                            {
                                (isStoped || true) && <a target="_blank" href="Mo_call_220.pcap">Open File</a>
                            }
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default Analytics;
