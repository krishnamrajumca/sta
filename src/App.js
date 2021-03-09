import React, { useEffect, useState } from 'react';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import dataset from './data.json'
import SideBar from './sidebar'
import Header from './header'
import 'primeflex/primeflex.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import ApexChart from './charts/areaChart'
import BarChart from './charts/barChart'
import Cards from './cards/cards'
import moment from 'moment';

import { Provider } from 'react-redux';
import StoreConfig from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Card } from 'primereact/card';

import Reports from './pages/reports';
import Analytics from './pages/analytics'
import Login from './pages/login'
import MSC1 from './pages/msc/msc1';
import MSC2 from './pages/msc/msc2'
import GMSC from './pages/msc/gmsc'
import ColorChange from './components/degrade'
import Alert from './components/Alert'
import { useSelector } from 'react-redux';

let colorChange = new ColorChange();
// let colorChange = ColorChange.getInstance()
const customHistory = createBrowserHistory();
const Dashboard1 = () => {
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

const Dashboard = () => {
  const [selected, setSelected] = useState(null)
  const [time, setTime] = useState(null)
  const [msc1Color, setmsc1Color] = useState("white")
  const [msc2Color, setmsc2Color] = useState("white")
  const [gmscColor, setgmscColor] = useState("white")
  const [msc1Degrades, setMSC1Degrades] = useState([]);
  const [msc2Degrades, setMSC2Degrades] = useState([])
  const [gmscDegrades, setGMSCDegrades] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [height, setHeight] = useState(518);
  const [width, setWidth] = useState(1383);
  const { thresholds } = useSelector(state => state.metaReducer);
  let history = useHistory();
  useEffect(() => {
    console.log(selected)
    if (selected) {
      history.push("/Home/" + selected)
    }
  }, [selected])
  useEffect(() => {
    setInterval(() => {
      const hour = moment().format("HH");
      const w = window.innerWidth - 250;
      const h = (w / 1383) * 518;
      setWidth(w); setHeight(h);
      var min = Math.floor(parseInt(moment().format("mm")) / 5) * 5;
      min = min < 10 ? "0" + min : min

      var time = hour + ":" + min;
      setTime(time)
    }, 1000)
    window.addEventListener('resize', handleResize)
  }, [])
  const handleResize = () => {
    const w = window.innerWidth - 250;
    const h = (w / 1383) * 518;
    setWidth(w); setHeight(h);
  }
  useEffect(() => {
    if (time && thresholds) {

      colorChange.updateSlotData(time);
      const msc1 = colorChange.getData("MSC1", thresholds);
      const msc2 = colorChange.getData("MSC2", thresholds);
      const gmsc = colorChange.getData("GMSC", thresholds);
      console.log(msc1, msc2, gmsc)

      setmsc1Color(msc1.color)
      setmsc2Color(msc2.color)
      setgmscColor(gmsc.color)

      if (msc1.degradeFileds.length > 0 || msc2.degradeFileds.length > 0 || gmsc.degradeFileds.length) {
        setMSC1Degrades(msc1.degradeFileds);
        setMSC2Degrades(msc2.degradeFileds);
        setGMSCDegrades(gmsc.degradeFileds);
        setShowAlert(true)
      }
    }

  }, [time])
  console.log(msc1Degrades, msc2Degrades, gmscDegrades, "In App")
  return (
    <div className="p-col-12 " style={{ position: 'relative' }}>
      <div className="p-col-12">
        <div className="dashbaord-image" style={{ width: width, height: height }} />
      </div>
      <div className="p-col-12 flex-row-wrap" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div className="p-col-2" onClick={() => history.push("/Home/MSC1")}>
          <Panel className="flex-row-wrap jc-center ai-center" style={{ height: 50, width: 100, fontWeight: 'bold', backgroundColor: msc1Color, borderRadius: 10 }} >
            MSC1
          </Panel>
        </div>

        <div className="p-col-2" onClick={() => history.push("/Home/MSC2")}>
          <Panel className="flex-row-wrap jc-center ai-center" style={{ height: 50, width: 100, fontWeight: 'bold', backgroundColor: msc2Color, borderRadius: 10 }}>
            MSC2
          </Panel>
        </div>

        <div className="p-col-2" onClick={() => history.push("/Home/GMSC")}>
          <Panel className="flex-row-wrap jc-center ai-center" style={{ height: 50, width: 100, fontWeight: 'bold', backgroundColor: gmscColor, borderRadius: 10 }} onClick={() => history.push("/Home/GMSC")}>
            GMSC
          </Panel>
        </div>
      </div>
      {
        showAlert &&
        <Alert visible={showAlert} msc1={msc1Degrades} msc2={msc2Degrades} gmsc={gmscDegrades} onClose={() => setShowAlert(false)} />
      }
    </div>
  )
}

const Home = () => {


  return (
    <div>
      <Header />
      <SideBar />
      <div>

        <div style={{ marginLeft: 200, padding: 20, marginTop: 80, height: '90vh' }}>

          <Route path="/Home/Dashboard" >
            <Dashboard />
          </Route>
          <Route path="/Home/Reports">
            <Reports />
          </Route>
          <Route path="/Home/MSC1">
            <MSC1 />
          </Route>

          <Route path="/Home/MSC2" >
            <MSC2 />
          </Route>
          <Route path="/Home/GMSC">
            <GMSC />
          </Route>
          <Route path="/Home/Analytics">
            <Analytics />
          </Route>


        </div>
      </div>

    </div>

  )
}

const App = () => {
  return (
    <Provider store={StoreConfig.store}>
      <PersistGate loading={null} persistor={StoreConfig.persistor}>
        <Router history={customHistory}>
          <Switch>
            <Route path="/Home" >
              <Home />
            </Route>
            <Route path="/" exact={true}>
              <Login />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}
export default App
