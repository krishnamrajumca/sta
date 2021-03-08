import React from 'react';
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
export default class PieChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {

            series: [],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    // width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },


          };
        }
        static getDerivedStateFromProps(props,state){
          return{
            series: props.data,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: props.labels,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    // width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },

          }
        }


        render() {
          console.log("pieData",this.props)
          return (


      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="pie"  />
</div>


          );
        }
      }
