import React from 'react';
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series:  [],
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
                    categories:  [],
                },
                yaxis: {

                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {

                    }
                }
            },


        };
    }

    static getDerivedStateFromProps(props,state){
      return{
        series: props.data || [],
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
                categories: props.labels || [],
            },
            yaxis: {

            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {

                }
            }
        },

      }
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={this.props.height || 350} />
            </div>


        );
    }
}
