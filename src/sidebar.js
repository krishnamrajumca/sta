import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import {
    useHistory
} from "react-router-dom";
const SideBar = () => {
    const [visibleLeft, setVisibleLeft] = useState(true);
    const [activeLink, setActiveLink] = useState("Dashboard");
    let history = useHistory();

    const onClickNav = (e) => {
        var id = e.target.id;
        setActiveLink(id);

        history.push("/Home/" + id)
    }
    return (
        <Sidebar visible={visibleLeft} baseZIndex={100000} style={{ width: 200, zIndex: 99 }} showCloseIcon={false}>
            <div style={{ height: 60 }}></div>
            <div className={activeLink === "Dashboard" ? "sidebar-item active" : "sidebar-item"} id="Dashboard" onClick={onClickNav}>
                <i className="pi pi-home"></i> Dashboard
          </div>
            <div className={activeLink === "MSC1" ? "sidebar-item active" : "sidebar-item"} id="MSC1" onClick={onClickNav}>
                <i className="pi pi-palette"></i> MSC1
          </div>
            <div className={activeLink === "MSC2" ? "sidebar-item active" : "sidebar-item"} id="MSC2" onClick={onClickNav}>
                <i className="pi pi-palette"></i> MSC2
          </div>
          <div className={activeLink === "GMSC" ? "sidebar-item active" : "sidebar-item"} id="GMSC" onClick={onClickNav}>
              <i className="pi pi-palette"></i> GMSC
        </div>
            <div className={activeLink === "Reports" ? "sidebar-item active" : "sidebar-item"} id="Reports" onClick={onClickNav}>
                <i className="pi pi-list"></i> Reports
          </div>
            <div className={activeLink === "Analytics" ? "sidebar-item active" : "sidebar-item"} id="Analytics" onClick={onClickNav}>
                <i className="pi pi-th-large"></i> Smart Analyiser
          </div>

        </Sidebar>
    )
}

export default SideBar
