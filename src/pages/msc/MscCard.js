import React from 'react';
import { Card } from 'primereact/card';
const MscCard = ({ data, prefix = "" }) => {

  let color = "green";
  if (data.value < 95) {
    color = "red";
  }
  else if (data.value >= 95 && data.value <= 98) {
    color = "orange"
  }
  return (
    <div className="p-col-12" style={{ padding: 5 }}>
      <Card>
        <div style={{ fontSize: 16, fontWeight: 'bold', color: "#999", marginBottom: 40 }}>{data.name}</div>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: color, textAlign: 'right' }} >{data.value}{prefix}</div>
      </Card>
    </div>
  )
}

export default MscCard;
