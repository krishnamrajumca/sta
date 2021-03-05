import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
const Cards = ({ filteredData }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const d = [
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
            { name: "MAP", value: 89 },
        ]
        setData(d)
    }, [])
    return (
        <div className="p-d-flex" style={{ marginBottom: 30 }}>
            {
                filteredData.length > 0 ?

                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {

                            filteredData.map((d, index) => {
                                return (
                                    <Card key={index} className="p-mb-2 p-mr-2 p-col-2" style={{ width: '15.3%', margin: '0.6%' }}>
                                        <div style={{ fontSize: 16, fontWeight: 'bold', color: "#999" }}>{d.name}</div>
                                        <div style={{ fontSize: 13, color: "#A7A7A7" }}>{d.value}</div>

                                    </Card>
                                )
                            })
                        }
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', width: "100%", padding: 20 }}>No Data Available</div>
            }
        </div>
    )
}
export default Cards