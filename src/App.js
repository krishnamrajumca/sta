import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import dataset from './data.json'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

import ApexChart from './charts/areaChart'
import BarChart from './charts/barChart'
import Cards from './cards/cards'
import XLSX from 'xlsx';
import moment from 'moment';
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
  const networks = ["MSC1"]
  useEffect(() => {
    console.log(timeInterval, selectedProtocal)
    if (selectedProtocal !== "" && selectedNetwork !== "") {
      console.log(timeInterval, selectedProtocal)
      const data = dataset.filter((d) => {
        // console.log(d);
        return d["Interval"] == timeInterval && d["Protocol"] == selectedProtocal
      });
      var temp = [];
      if (data.length > 0) {

        var row = data[0];
        for (const property in row) {
          if (notInclue.indexOf(property) == -1) {
            temp.push({ name: property, value: row[property] })
          }

        }

      }
      setFilteredData(temp);
      console.log(data)
    }
  }, [timeInterval, selectedProtocal, selectedNetwork])
  useEffect(() => {
    handleCsvFile()
    const interval = setInterval(() => {
      handleInterval()
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [])
  const handleCsvFile = () => {
    var allText = [];
    var allTextLines = [];
    var Lines = [];

    var txtFile = new XMLHttpRequest();

    txtFile.open("GET", "https://docs.google.com/spreadsheets/d/1uBLZgUGp1AdAR-SVmkycsjhYbDIuDzwz/edit#gid=1047264679", true);
    // console.log(txtFile)
    txtFile.onreadystatechange = function () {
      allText = txtFile.responseText;
      console.log(allText)
      allTextLines = allText.split(/\r\n|\n/);
    };
    txtFile.onerror = function () {
      console.log("error")
    }
    txtFile.onload = function (params) {
      console.log(params)
    }
  }
  const handleInterval = () => {
    const hour = moment().format("HH");
    // handleFile()
    var min = Math.floor(parseInt(moment().format("mm")) / timeslace) * timeslace;
    min = min < 10 ? "0" + min : min

    var time = hour + ":" + min;
    // console.log(time, timeInterval)
    setTimeInterval(time);
  }
  const handleFile = () => {


    var request = new XMLHttpRequest();
    request.open('GET', "https://docs.google.com/spreadsheets/d/1uBLZgUGp1AdAR-SVmkycsjhYbDIuDzwz/edit#gid=1047264679", true);
    request.responseType = 'blob';
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    request.onload = function () {
      var reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload = function (e) {
        console.log('DataURL:', e.target.result);
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });

        const wsname = wb.SheetNames[1];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(data)
      };
    };
    request.send();
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

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
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

const Reports = () => {
  return (<div>Reports</div>)
}
const Analytics = () => {
  return (<div>Analytics</div>)
}
const App = () => {
  const [visibleLeft, setVisibleLeft] = useState(true);
  return (
    <div>
      <Router>
        <Sidebar visible={visibleLeft} baseZIndex={100000} style={{ width: 200, zIndex: 99 }} showCloseIcon={false}>
          <div className="sidebar-item">
            <Link to="/">Dashboard</Link>
          </div>
          <div className="sidebar-item">
            <Link to="/Reports">Reports</Link>
          </div>
          <div className="sidebar-item">
            <Link to="/Analytics">Analytics</Link>
          </div>
        </Sidebar>
        <div>
          <div style={{ marginLeft: 200, padding: 20 }}>

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
