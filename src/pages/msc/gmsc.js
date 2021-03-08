import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ApexChart from '../../charts/areaChart'
import PieChart from '../../charts/pieChart'
import BarChart from '../../charts/barChart'
import MscCard from './MscCard'
import GMSCData from './gmscData';
let msc1 = new GMSCData("00:00", []);
const GMSC = () => {
    const [timeInterval, setTimeInterval] = useState("00:10");
    const [slots,setSlots] = useState([])
    const [mscData,setMscData] = useState(null)
    useEffect(() => {

        // console.log("ASAS", msc1.getFirstGraph())
        const interval = setInterval(() => {
            handleInterval()
        }, 2000);
    }, [])
    useEffect(() => {
        var times = moment(timeInterval, "HH:mm").subtract(1, "hours");
        var slots = [];
        for (var i = 0; i < 12; i++) {
            var timeSlot = times.add(5, "minutes").format("HH:mm");
            slots.push(timeSlot)
        }
        setSlots(slots)
        if(timeInterval){
          msc1.updateSlotData(timeInterval,slots)
          const msc = msc1.getData();
          console.log("first graph",msc )
          setMscData(msc)
        }


    }, [timeInterval])
    const handleInterval = () => {
        const hour = moment().format("HH");
        // handleFile()
        var min = Math.floor(parseInt(moment().format("mm")) / 5) * 5;
        min = min < 10 ? "0" + min : min

        var time = hour + ":" + min;
        setTimeInterval(time);
    }
    return (
        <div>
        {
        mscData !== null ?
        <div className="p-grid">
          <div className="p-col-12">GMSC</div>
          <div className="p-col-12" style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>

          <div className="p-col-3">
            <MscCard data={mscData.firstGraph.SRI_Succ_Rate} prefix="%"/>
          </div>
          <div className="p-col-3">
            <MscCard data={mscData.firstGraph.Camel_Succ_Rate} prefix="%"/>
          </div>
          </div>
          <div className="p-col-12 mtb-1">
              <ApexChart  data={mscData.firstGraph.graphData} slots={slots}/>
          </div>







          <div className="p-col-12 flex-row-wrap mtb-1">
                <div className="p-col-4 plr-1">
                    <div className="p-col-12 mtb-1 flex-row-wrap">
                        <div className="p-col-6 mlr-1">
                          <MscCard data={mscData.sixthGraph.ISUP_Succ_Rate} prefix="%"/>
                        </div>
                        <div className="p-col-6 mlr-1">
                          <MscCard data={mscData.sixthGraph.ISUP_Succ_Rate_CCR} prefix="%"/>
                        </div>
                    </div>
                    <div className="p-col-12 mtb-1">
                      <BarChart data={mscData.sixthGraph.graphData} labels={slots}/>
                    </div>
                    <div className="p-col-12 mtb-1">
                      <PieChart data={mscData.sixthGraph.pieData.data} labels={mscData.sixthGraph.pieData.labels}/>
                    </div>
                </div>

                <div className="p-col-4 plr-1">
                    <div className="p-col-12 mtb-1 flex-row-wrap">
                        <div className="p-col-6 mlr-1">
                          <MscCard data={mscData.seventhGraph.SIP_Succ_Rate} prefix="%"/>
                        </div>
                        <div className="p-col-6 mlr-1">
                          <MscCard data={mscData.seventhGraph.SIP_Succ_Rate_CCR} prefix="%"/>
                        </div>
                    </div>
                    <div className="p-col-12 mtb-1">
                      <BarChart data={mscData.seventhGraph.graphData} labels={slots}/>
                    </div>
                    <div className="p-col-12 mtb-1">
                      <PieChart data={mscData.seventhGraph.pieData.data} labels={mscData.seventhGraph.pieData.labels}/>
                    </div>
                </div>

                <div className="p-col-4 plr-1">
                    <div className="p-col-12 mtb-1 flex-row-wrap">
                        <div className="p-col-6 mlr-1">
                          <MscCard data={mscData.eightGraph.BICC_Succ_Rate} prefix="%"/>
                        </div>
                        <div className="p-col-6 mlr-1">
                          <MscCard data={mscData.eightGraph.BICC_Succ_Rate_CCR} prefix="%"/>
                        </div>
                    </div>
                    <div className="p-col-12 mtb-1">
                      <BarChart data={mscData.eightGraph.graphData} labels={slots}/>
                    </div>
                    <div className="p-col-12 mtb-1">
                      <PieChart data={mscData.eightGraph.pieData.data} labels={mscData.eightGraph.pieData.labels}/>
                    </div>
                </div>
          </div>


        </div>
        :
        null
        }
        </div>
    )
}

export default GMSC;
