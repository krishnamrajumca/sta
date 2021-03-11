import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import { useSelector } from 'react-redux'
import dataset from '../../data.json'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import DownloadBtn from './DownloadBtn'
const Reports = () => {

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [network, setNetwork] = useState();
    const [protocal, setProtocal] = useState();
    const [kpi, setKPI] = useState();
    const [filteredColumns, setColumns] = useState([]);
    const [filterData, setFilterData] = useState([])
    const { networks, protocals, kpis, kpisList } = useSelector(state => state.metaReducer)
    console.log("counter", moment(startTime).format("HH:mm"), moment(endTime).format("HH:mm"), kpis)
    const reset = ()=>{
      setStartTime("");
      setEndTime("");

    }
    const submit = () => {
        if (startTime && endTime && network) {
            const st = roundedTime(startTime);
            const end = roundedTime(endTime);
            const mscData = dataset[network];
            console.log("network data", mscData, st, end)
            const filtered = mscData.filter(m => m["Interval"] >= st && m["End Interval"] <= end)
            console.log("filtered", filtered)
            if (protocal || kpi) {
                if (protocal) {
                    const protocalData = filtered.filter(m => m["Protocol"] == protocal);
                    console.log(protocalData)
                    getColumnsOfProtocal(protocalData)
                }
                else {
                    const kpiName = kpisList.filter(k => k.id == kpi);
                    if (kpiName.length) {
                        const kpiKey = kpiName[0].key;
                        const protocalData = filtered.filter(m => typeof m[kpiKey] !== "undefined");
                        console.log(protocalData)
                        getColumnsOfKpi(protocalData)
                    }
                }
            }
        }
    }

    const getColumnsOfKpi = (data) => {
        const columns = ["Start Time", "Interval", "End Time","End Interval"];
        data.map(d=>{

        })
        data.map(d => {
            for (var cl in d) {
                if (cl.indexOf(kpi) !== -1) {

                    if (columns.indexOf(cl) == -1){
                      columns.push(cl);
                    }
                    if(!isNaN(d[cl])){
                      d[cl] = Math.floor(parseFloat(d[cl])*100)/100
                    }
                }
            }
        })
        const t = columns.map(c => {
            return { field: c, header: c }
        });
        console.log(t);
        setColumns(t);
        setFilterData(data);
    }
    const getColumnsOfProtocal = (data) => {
        const columns = ["Start Time", "Interval", "End Time","End Interval"];
        let notInclude = ["Node Name", "Access_Type", "Protocol"];
        var temp = []
        data.map((d,i) => {
            for (var cl in d) {
                if (notInclude.indexOf(cl) == -1) {
                    if (cl.indexOf("Rate") !== -1 || cl.indexOf("rate") !== -1 || cl.indexOf("%") !== -1) {
                        if (columns.indexOf(cl) == -1) {
                            columns.push(cl)
                        }
                        if(!isNaN(d[cl])){
                          d[cl] = Math.floor(parseFloat(d[cl])*100)/100
                        }
                    }


                }

            }
            temp.push(d)
        })
        console.log("Temo",temp)
        const t = columns.map(c => {
            return { field: c, header: c }
        });
        console.log(t);
        setColumns(t);
        setFilterData(temp);
    }
    const download = (type) => {
        if (filterData.length) {
            if (type == "csv") {
                exportToCsv("report.csv", filterData, filteredColumns)
            }
        }

    }
    const exportToCsv = (filename, rows, columns) => {
        var processRow = function (row) {
            var finalVal = '';
            var j = 0;

            for (var k = 0; k < columns.length; k++) {
                console.log(columns[k])
                var property = columns[k].field;

                console.log(`${property}: ${row[property]}`);
                var innerValue = (row[property] === null || typeof row[property] == "undefined") ? '' : row[property].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[property].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                j++;
                finalVal += result;
            }

            return finalVal + '\n';
        };

        var csvFile = '';
        for (var a = 0; a < columns.length; a++) {
            if (a > 0)
                csvFile += ","
            csvFile += columns[a].header;


        }
        csvFile += "\n"
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }
        console.log(csvFile, rows, columns)
        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    const roundedTime = (time) => {
        var hh = moment(time).format("HH");
        var mm = moment(time).format("mm");
        var rm = Math.floor(parseInt(mm) / 5) * 5
        rm = rm < 10 ? "0" + rm : rm;
        return (hh + ":" + rm)
    }
    const dynamicColumns = filteredColumns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div className="p-d-flex">
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
                            <Button label="SUBMIT" style={{ width: 120, fontSize: 14 }} onClick={submit}></Button>
                            {
                                filterData.length !== 0 && <DownloadBtn onClick={download} />
                            }
<Button label="Reset" style={{ width: 120, fontSize: 14 }} onClick={reset}></Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="p-col-12">
            {
              filterData.length > 0 ?
              <DataTable value={filterData}>
                  {dynamicColumns}
              </DataTable>
              :
              <div>No Data Found</div>
            }
            </div>
        </div>
    )
}
export default Reports;
