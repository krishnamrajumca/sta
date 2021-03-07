import React from 'react';
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
export default class PieChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {

            series: this.props.data,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: this.props.labels,
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



        render() {
          console.log("pieData",this.props)
          return (


      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="pie"  />
</div>


          );
        }
      }
