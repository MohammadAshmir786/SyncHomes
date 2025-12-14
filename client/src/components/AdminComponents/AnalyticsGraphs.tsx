import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsGraphsProps {
  projectCount: number;
  clientCount: number;
  contactCount: number;
  subscriberCount: number;
}

export default function AnalyticsGraphs({
  projectCount,
  clientCount,
  contactCount,
  subscriberCount,
}: AnalyticsGraphsProps) {
  // Bar chart data - comparing all metrics
  const barData = [
    { name: "Projects", value: projectCount, fill: "#6366f1" },
    { name: "Clients", value: clientCount, fill: "#10b981" },
    { name: "Contacts", value: contactCount, fill: "#f59e0b" },
    { name: "Subscribers", value: subscriberCount, fill: "#8b5cf6" },
  ];

  // Pie chart data
  const pieData = [
    { name: "Projects", value: projectCount, color: "#6366f1" },
    { name: "Clients", value: clientCount, color: "#10b981" },
    { name: "Contacts", value: contactCount, color: "#f59e0b" },
    { name: "Subscribers", value: subscriberCount, color: "#8b5cf6" },
  ];

  // Line chart data - simulated weekly trend
  const lineData = [
    {
      week: "Week 1",
      Projects: Math.floor(projectCount * 0.6),
      Clients: Math.floor(clientCount * 0.5),
      Contacts: Math.floor(contactCount * 0.7),
      Subscribers: Math.floor(subscriberCount * 0.6),
    },
    {
      week: "Week 2",
      Projects: Math.floor(projectCount * 0.7),
      Clients: Math.floor(clientCount * 0.65),
      Contacts: Math.floor(contactCount * 0.8),
      Subscribers: Math.floor(subscriberCount * 0.75),
    },
    {
      week: "Week 3",
      Projects: Math.floor(projectCount * 0.85),
      Clients: Math.floor(clientCount * 0.8),
      Contacts: Math.floor(contactCount * 0.9),
      Subscribers: Math.floor(subscriberCount * 0.85),
    },
    {
      week: "Week 4",
      Projects: projectCount,
      Clients: clientCount,
      Contacts: contactCount,
      Subscribers: subscriberCount,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          📊 Overview Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          🥧 Distribution backend on 
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Full Width */}
      <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          📈 Monthly Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Projects"
              stroke="#6366f1"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Clients"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Contacts"
              stroke="#f59e0b"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Subscribers"
              stroke="#8b5cf6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
