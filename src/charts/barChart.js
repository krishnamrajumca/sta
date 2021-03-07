import React from 'react';
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: this.props.data || [],
            options: {
                chart: {
                    type: 'bar',
                    // height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: this.props.labels || [],
                },
                yaxis: {
                    
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
            },


        };
    }



    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={this.props.height || 350} />
            </div>


        );
    }
}
