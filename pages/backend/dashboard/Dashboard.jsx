import React, { useState } from 'react';
import { FaUsers, FaCube, FaChartLine, FaClock } from 'react-icons/fa';
import DashboardBox from './DashboardBox';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { name: '5k', value: 20 },
  { name: '10k', value: 45 },
  { name: '15k', value: 35 },
  { name: '20k', value: 64 },
  { name: '25k', value: 40 },
  { name: '30k', value: 50 },
  { name: '35k', value: 20 },
  { name: '40k', value: 35 },
  { name: '45k', value: 60 },
  { name: '50k', value: 50 },
  { name: '55k', value: 48 },
  { name: '60k', value: 52 },
];

const Dashboard = () => {
  const [month] = useState('October');

  return (
    <div className="container-fluid py-4">
      {/* Dashboard Boxes */}
      <div className="row g-3">
        <div className="col-md-6 col-lg-3 box1">
          <DashboardBox
            title="Listed Properties"
            value="40,689"
            icon={<FaUsers />}
            percentage="↑ 8.5%"
            changeText="Up from yesterday"
            iconBg="#f0eaff"
            iconColor="#7759f3"
          />
        </div>
        <div className="col-md-6 col-lg-3 box2">
          <DashboardBox
            title="Rented Properties"
            value="10,293"
            icon={<FaCube />}
            percentage="↑ 1.3%"
            changeText="Up from past week"
            iconBg="#fff4d3"
            iconColor="#f5bd00"
          />
        </div>
        <div className="col-md-6 col-lg-3 box3">
          <DashboardBox
            title="Earning"
            value="₹89,000"
            icon={<FaChartLine />}
            percentage="↓ 4.3%"
            changeText="Down from yesterday"
            iconBg="#d3fff1"
            iconColor="#3acbb1"
          />
        </div>
        <div className="col-md-6 col-lg-3 box4">
          <DashboardBox
            title="Pending Amount"
            value="2040"
            icon={<FaClock />}
            percentage="↑ 1.8%"
            changeText="Up from yesterday"
            iconBg="#ffe4e4"
            iconColor="#ff7452"
          />
        </div>
      </div>

      {/* Sales Chart */}
      <div className="card shadow mt-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Sales Details - {month}</h5>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f8df5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4f8df5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4f8df5"
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
