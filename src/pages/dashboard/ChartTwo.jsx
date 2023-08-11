import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    id: 'bar-chart',
  },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
};

const ChartTwo = () => {
  const [series, setSeries] = useState([
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ]);

  return (
    <div id="chartTwo" className="mx-auto">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ChartTwo;
