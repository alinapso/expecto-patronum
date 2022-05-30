import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
	labels,
	datasets: [
		{
			label: "Sponsored",
			data: [65, 59, 80, 81, 56, 55, 40],
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "New",
			data: [59, 80, 4, 56, 55, 40, 70],
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

const generateLineChart = () => {
	return <Line options={options} data={data} />;
};
export default generateLineChart;
