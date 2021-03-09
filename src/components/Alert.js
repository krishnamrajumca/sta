import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const Alert = ({ visible = false, msc1 = [], msc2 = [], gmsc = [], onClose }) => {

    const [msc1Data, setMsc1Data] = useState([]);
    const [msc2Data, setMsc2Data] = useState([]);
    const [gmscData, setgmscData] = useState([]);
    const [enableClose, setEnableClose] = useState(false)
    useEffect(() => {
        setMsc1Data(msc1);
        setMsc2Data(msc2);
        setgmscData(gmsc);
    }, [msc1, msc2, gmsc])
    const ackMSC = (msc, index) => {
        if (msc == "msc1") {
            const data = [...msc1Data];
            data.splice(index, 1)
            setMsc1Data(data);
        }
        if (msc == "msc2") {
            const data = [...msc2Data];
            data.splice(index, 1)
            setMsc2Data(data);
        }
        if (msc == "gmsc") {
            const data = [...gmscData];
            data.splice(index, 1)
            setgmscData(data);
        }

    }
    useEffect(() => {
        if (msc1Data.length == 0 && msc2Data.length == 0 && gmscData.length == 0) {
            setEnableClose(true)
        }
        else {
            setEnableClose(false)
        }

    }, [msc1Data, msc2Data, gmscData])
    const renderFooter = (isEnable) => {

        return (
            <div>
                <Button label="Close" icon="pi pi-check" onClick={onClose} autoFocus disabled={!isEnable} />
            </div>
        );
    }
    return (
        <Dialog header="Acknowledgement" visible={visible} style={{ width: '50vw' }} footer={renderFooter(enableClose)} onHide={() => console.log()}>
            {
                msc1Data.length > 0 &&
                <div className="p-col-12 mtb-1">
                    {
                        msc1Data.map((m, index) => {
                            return (
                                <div className="p-col-12" key={index} style={{ padding: 10, marginBottom: 10, backgroundColor: m.color, borderRadius: 10, color: 'white' }}>
                                    MSC1  KPI:<span style={{ fontWeight: 'bold' }}>{m.field}</span> is beging degraded to below threshold value KPI value:<span style={{ fontWeight: 'bold' }}>{m.value}</span>
                                    <div className="p-col-12" style={{ textAlign: 'right', color: 'blue', cursor: 'pointer' }} onClick={() => ackMSC('msc1', index)}>Acknowledge</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                msc2Data.length > 0 &&
                <div className="p-col-12 mtb-1">
                    {
                        msc2Data.map((m, index) => {
                            return (
                                <div className="p-col-12" key={index} style={{ padding: 10, marginBottom: 10, backgroundColor: m.color, borderRadius: 10, color: 'white' }}>
                                    MSC2  KPI:<span style={{ fontWeight: 'bold' }}>{m.field}</span> is beging degraded to below threshold value KPI value:<span style={{ fontWeight: 'bold' }}>{m.value}</span>
                                    <div className="p-col-12" style={{ textAlign: 'right', color: 'blue', cursor: 'pointer' }} onClick={() => ackMSC('msc2', index)}>Acknowledge</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                gmscData.length > 0 &&
                <div className="p-col-12 mtb-1">
                    {
                        gmscData.map((m, index) => {
                            return (
                                <div className="p-col-12" key={index} style={{ padding: 10, marginBottom: 10, backgroundColor: m.color, borderRadius: 10, color: 'white' }}>
                                    GMSC  KPI:<span style={{ fontWeight: 'bold' }}>{m.field}</span> is beging degraded to below threshold value KPI value:<span style={{ fontWeight: 'bold' }}>{m.value}</span>
                                    <div className="p-col-12" style={{ textAlign: 'right', color: 'blue', cursor: 'pointer' }} onClick={() => ackMSC('gmsc', index)}>Acknowledge</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </Dialog>
    )
}
export default Alert;