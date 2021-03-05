import React, { useEffect, useState } from 'react';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import dataset from './data.json'
import SideBar from './sidebar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from "history";


import { Dropdown } from 'primereact/dropdown';

import ApexChart from './charts/areaChart'
import BarChart from './charts/barChart'
import Cards from './cards/cards'
import moment from 'moment';
import Reports from './pages/reports';
import Analytics from './pages/analytics'
const customHistory = createBrowserHistory();
const Dashboard = () => {
  const [selectedProtocal, setSelectedProtocal] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [timeInterval, setTimeInterval] = useState("00:00");
  const timeslace = 5;
  const data = [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  },
  {
    name: 'series3',
    data: [41, 21, 55, 22, 31, 52, 141]
  }]
  const notInclue = ["Start Time", "Interval", "End Time", "Node Name", "Access_Type", "Protocol"]
  const protocals = ["MAP", "CAMEL", "BSSAP", "RANAP", "ISUP", "SIP", "BICC", "H248"];
  const networks = ["MSC1", "MSC2"]
  useEffect(() => {
    console.log(timeInterval, selectedProtocal)
    if (selectedProtocal !== "" && selectedNetwork !== "") {
      var mscData = dataset[selectedNetwork];
      setCradsData(mscData);
      setGraphData(mscData)
    }
  }, [timeInterval, selectedProtocal, selectedNetwork])
  const setGraphData = (mscData) => {
    var times = moment(timeInterval, "HH:mm").subtract(1, "hours");
    var slots = [];
    for (var i = 0; i < 12; i++) {
      var timeSlot = times.add(5, "minutes").format("HH:mm");
      slots.push(timeSlot)
    }
    protocals.map(proc => {
      var obj = { name: proc };
      var arr = [];
      slots.map(slot => {
        const data = mscData.filter((d) => {
          return d["Interval"] === slot && d["Protocol"] === proc
        });
        if (data.length > 0) {

        }
      })
    })
    console.log(times)
  }
  const setCradsData = (mscData) => {
    console.log(timeInterval, selectedProtocal)
    const data = mscData.filter((d) => {
      // console.log(d);
      return d["Interval"] === timeInterval && d["Protocol"] === selectedProtocal
    });
    var temp = [];
    if (data.length > 0) {

      var row = data[0];
      for (const property in row) {
        if (notInclue.indexOf(property) === -1) {
          temp.push({ name: property, value: row[property] })
        }

      }

    }
    setFilteredData(temp);
    console.log(data)
  }
  useEffect(() => {

    const interval = setInterval(() => {
      handleInterval()
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  const handleInterval = () => {
    const hour = moment().format("HH");
    // handleFile()
    var min = Math.floor(parseInt(moment().format("mm")) / timeslace) * timeslace;
    min = min < 10 ? "0" + min : min

    var time = hour + ":" + min;
    setTimeInterval(time);
  }

  const onProtocalChange = (e) => {
    console.log(e.target.value)
    setSelectedProtocal(e.target.value)
  }
  const onNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
  }
  return (
    <div>
      <div className="p-grid">
        <div className="p-col-12">
          <div className="p-col-6" style={{ display: 'flex', flexDirection: 'row', width: '33%', minWidth: 350, maxWidth: 400, marginBottom: 30 }}>
            <div className="p-col-6" style={{ marginRight: 20 }}>
              <Dropdown value={selectedNetwork} options={networks} onChange={onNetworkChange} placeholder="Select Network" style={{ width: 150 }} />
            </div>
            <div className="p-col-6">
              <Dropdown value={selectedProtocal} options={protocals} onChange={onProtocalChange} placeholder="Select Protocal" style={{ width: 150 }} />
            </div>
          </div>
        </div>
        <div className="p-col-12">
          <Cards filteredData={filteredData} />
        </div>
        <div className="p-col-12">
          <ApexChart data={data} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: '100%' }}>
          <div style={{ width: '30%' }}>
            <ApexChart height={200} data={[data[0], data[1]]} />
          </div>
          <div style={{ width: '30%' }} >
            <ApexChart height={200} data={[data[2], data[0]]} />
          </div>
          <div style={{ width: '30%' }}>
            <BarChart height={200} />
          </div>
        </div>
      </div>
    </div>

  )
}


const App = () => {


  return (
    <div>
      <Router history={customHistory}>
        <SideBar />
        <div>
          <div id="navHeader">
            STA DEMO
          </div>
          <div style={{ marginLeft: 200, padding: 20, marginTop: 80, height: '90vh' }}>

            <Switch>
              <Route path="/" exact={true}>
                <Dashboard />
              </Route>
              <Route path="/Reports">
                <Reports />
              </Route>
              <Route path="/Analytics">
                <Analytics />
              </Route>
            </Switch>

          </div>
        </div>
      </Router>
    </div>

  )
}
export default App
