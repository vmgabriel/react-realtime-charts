// Develop: vmgabriel

// Libraries
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Chart } from "react-google-charts";
import socketIOClient from 'socket.io-client';

const apiUrl = "http://localhost:3000";

const ChartRealTime = () => {
  const history = useHistory();
  const [data, setData] = React.useState([
    [
      { type: 'date', label: 'Day' },
      'Average temperature',
      'Average hours of daylight',
    ]
  ]);

  const options = {
    chart: {
      title:
        'Average Temperatures and Daylight in Iceland Throughout the Year',
    },
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: 'Temps' },
      1: { axis: 'Daylight' },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Temps: { label: 'Temps (Celsius)' },
        Daylight: { label: 'Daylight' },
      },
    },
  };

  React.useEffect(() => {
    const socket = socketIOClient(apiUrl);
    socket.on('send_data', result => {
      console.log('data --- ', data);
      console.log('result - ', result);

      const nData = [[new Date(result[0]), parseFloat(result[1]), parseFloat(result[2])]];
      setData((dt) => {
        return dt.concat(nData);
      });
      setLength(data.length);
    });
  }, []);

  const handleToBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h3>Chart Real Time</h3>
      <p>
        A chart as real time
      </p>

      <p>
       {'' + data.length}
      </p>

      {(data.length > 1)
      ? <Chart
          chartType="Line"
          data={data}
          options={options}
          loader={<p>Loading...</p>}
          width="80%"
          height="400px"
          legendToggle
      />
      : <p>No data</p>}
    </div>
  );
};


export default ChartRealTime;

