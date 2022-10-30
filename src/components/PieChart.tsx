import { Chart } from "react-google-charts"

interface PieChartProps {
  data: any[],
  options: any
}

export default function PieChart({ data, options }: PieChartProps) {
  return (
    <Chart
      width={'100%'}
      height={'100%'}
      chartType="PieChart"
      data={data}
      options={options}
    />
  )
}
