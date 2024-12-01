
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { useEffect, useState } from 'react';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const PieChart = () => {
  const [dir,setDir] = useState({d:"left"})
  useEffect(()=>{
    const handleRes = ()=>{
      if(window.innerWidth <600){
        setDir({d:"bottom"})
      }else{
        setDir({d:"right"})

      }
    }
  window.addEventListener("resize",handleRes)
    return ()=>window.removeEventListener("resize",handleRes)
},[dir])
const data = {
    labels: ['Business', 'fiction', 'horror','adventure'], // Labels for segments
    datasets: [
      {
        label: 'Categories', // Optional label for the chart
        data: [4, 6, 3, 2], // Data values for each segment
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', 
          'rgba(54, 162, 235, 0.2)', 
          'rgba(255, 206, 86, 0.2)', 
          'rgba(75, 192, 192, 0.2)', 
        ], // Colors for segments
        borderColor: [
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)', 
          'rgba(255, 206, 86, 1)', 
          'rgba(75, 192, 192, 1)', 
        ], // Border colors
        borderWidth: 1, // Border width
      },
    ],
};
const options = {
    responsive: true, // Makes the chart responsive
    plugins: {
      legend: {
        position:dir.d, // Position of the legend
        onClick: (e, legendItem, legend) => {
          },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => ` ${tooltipItem.label}: ${tooltipItem.raw}  Books` , // Custom tooltips
        },
      },
    },
};

    return (
        <div className='w-80 h-80 '>
        <Pie data={data} options={options} width={50} height={50} />
        </div>
);
};

export default PieChart;
