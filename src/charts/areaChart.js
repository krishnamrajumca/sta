import React from 'react';
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Dialog } from 'primereact/dialog';
export default class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isexpand: false,
            series: this.props.data,
            options: {
                chart: {
                    // height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },


        };
    }

    expand = () => {
        this.setState({ isexpand: !this.state.isexpand })
    }

    render() {
        var height = this.state.isexpand ? 500 : this.props.height ? this.props.height : 350;
        return (


            <div id="chart" >
                <div className="toolbar">
                    <i className="pi pi-window-maximize" style={{ 'fontSize': '1em' }} onClick={this.expand}></i>
                </div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={this.props.height || 350} />
                <Dialog visible={this.state.isexpand} style={{ width: '100vw', height: '90vh' }} onHide={() => this.setState({ isexpand: false })}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={height} />
                </Dialog>
            </div>


        );
    }
}