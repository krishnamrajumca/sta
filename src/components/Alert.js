import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import moment from 'moment'
const Alert = ({ visible = false, msc1 = [], msc2 = [], gmsc = [], onClose, time = "", onCloseWithoutAcknowledge }) => {
    console.log(msc1)
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
                <Button label="Close" icon="pi pi-check" onClick={() => onClose(time)} autoFocus disabled={!isEnable} />
            </div>
        );
    }
    return (
        <Dialog header="Alerts" visible={visible} style={{ width: '50vw' }} footer={renderFooter(enableClose)} onHide={onCloseWithoutAcknowledge}>
            {
                msc1Data.length > 0 &&
                <div className="p-col-12 mtb-1">
                    {
                        msc1Data.map((m, index) => {
                            return (
                                <Msg key={index} field={m.field} msc="MSC1" time={time} value={m.value} onClick={() => ackMSC('msc1', index)} color={m.color} />
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
                                <Msg key={index} field={m.field} msc="MSC2" time={time} value={m.value} onClick={() => ackMSC('msc2', index)} color={m.color} />
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
                                <Msg key={index} field={m.field} msc="GMSC" time={time} value={m.value} onClick={() => ackMSC('gmsc', index)} color={m.color} />
                            )
                        })
                    }
                </div>
            }
        </Dialog>
    )
}
const Msg = ({ field, msc, time, value, onClick, color }) => {
    const onAck = () => {
        console.log("onAck");
        onClick();
    }
    return (
        <div className="p-col-12" style={{ padding: 10, marginBottom: 10, backgroundColor: color, borderRadius: 10, color: 'white' }}>
            <div>ALERT :GMSC {field} Degreded to Below threshold value</div>
            <div>Start Time: {moment().format("DD/MM/YYYY")} {time} KPI value :{value}%</div>
            <div>Probable reason: No response from VMSC/HLR</div>
            <div>Analytic Views: 5 times occured in last 30 days</div>
            <div className="p-col-12" style={{ textAlign: 'right', color: 'blue', cursor: 'pointer' }} onClick={onAck}>Acknowledge</div>
        </div>
    )
}
export default Alert;
