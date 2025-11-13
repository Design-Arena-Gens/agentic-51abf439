import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const TrendChart = ({ data, lines, title }) => (
  <div className="glass-card p-6">
    <h3 className="font-heading text-2xl text-primary">{title}</h3>
    <div className="mt-6 h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9c9a9" />
          <XAxis
            dataKey="date"
            stroke="#2f5233"
            tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
          />
          <YAxis stroke="#2f5233" />
          <Tooltip
            contentStyle={{
              borderRadius: '16px',
              borderColor: '#a6905d',
              backgroundColor: '#fffaf0',
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={3}
              dot={{ r: 4 }}
              name={line.label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default TrendChart;

