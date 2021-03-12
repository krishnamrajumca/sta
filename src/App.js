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
import { useSelector, useDispatch } from 'react-redux';

let colorChange = new ColorChange();
// let colorChange = ColorChange.getInstance()
const customHistory = createBrowserHistory();

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
  const { thresholds, alertAcknowledged, alertsData } = useSelector(state => state.metaReducer);
  const dispatch = useDispatch()
  let history = useHistory();
  console.log("alertAcknowledged", alertAcknowledged)
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
  const onClose = (e) => {
    setShowAlert(false);
    dispatch({ type: "ALERT_ACK", payload: e })
  }
  useEffect(() => {
    if (time && thresholds) {

      colorChange.updateSlotData(time);
      const msc1 = colorChange.getData("MSC1", thresholds);
      const msc2 = colorChange.getData("MSC2", thresholds);
      const gmsc = colorChange.getData("GMSC", thresholds);


      setmsc1Color(msc1.color)
      setmsc2Color(msc2.color)
      setgmscColor(gmsc.color)

      if (msc1.degradeFileds.length > 0 || msc2.degradeFileds.length > 0 || gmsc.degradeFileds.length) {
        console.log(msc1, msc2, gmsc)
        setMSC1Degrades(msc1.degradeFileds);
        setMSC2Degrades(msc2.degradeFileds);
        setGMSCDegrades(gmsc.degradeFileds);
        const m1 = alertsData.msc1.concat(msc1.degradeFileds);
        const m2 = alertsData.msc2.concat(msc2.degradeFileds);
        const gm = alertsData.gmsc.concat(gmsc.degradeFileds);
        dispatch({ type: "SET_ALERT_DATA", payload: { msc1: m1, msc2: m2, gmsc: gm } })
        console.log(alertsData)
        // if (alertAcknowledged.indexOf(time) == -1) {
        //   setShowAlert(true)
        // }

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
        <Alert visible={showAlert} msc1={msc1Degrades} msc2={msc2Degrades} gmsc={gmscDegrades} onClose={onClose} time={time} />
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
