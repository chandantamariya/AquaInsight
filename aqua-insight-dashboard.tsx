import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Map, Droplet, Calendar, AlertTriangle, Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Constants
const FIELDS = ['Field 1', 'Field 2', 'Field 3'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateMoistureData = () => MONTHS.map((month, i) => ({
  month,
  value: Math.sin((i / 12) * Math.PI * 2) * 15 + 45 + (Math.random() * 5)
}));

const generatePrecipData = () => DAYS.map((day) => ({
  day,
  value: Math.max(0, Math.random() * 25 + Math.random() * 5)
}));

const MetricCard = ({ title, value, subtitle, icon: Icon, iconColor }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </CardContent>
  </Card>
);

const ChartCard = ({ title, data, dataKey, color }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const AquaInsight = () => {
  const [selectedField, setSelectedField] = useState(FIELDS[0]);
  const moistureData = useMemo(() => generateMoistureData(), []);
  const precipData = useMemo(() => generatePrecipData(), []);

  const recommendations = [
    { 
      icon: Droplet, 
      text: 'Delay irrigation until soil moisture drops below 40%' 
    },
    { 
      icon: Calendar, 
      text: 'Schedule next irrigation for Friday morning before the forecasted heatwave' 
    },
    { 
      icon: Map, 
      text: `Consider installing soil moisture sensors in the northwestern section of ${selectedField}` 
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AquaInsight Dashboard</h1>
          <p className="text-gray-600">Water Resource Management System powered by NASA Satellite Data</p>
        </div>
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {FIELDS.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Soil Moisture"
          value="47%"
          subtitle="Optimal range: 40-60%"
          icon={Droplet}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Precipitation Forecast"
          value='2.3"'
          subtitle="Expected over next 7 days"
          icon={Calendar}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Water Stress Index"
          value="Low"
          subtitle="Based on GRACE satellite data"
          icon={AlertTriangle}
          iconColor="text-yellow-500"
        />
        <MetricCard
          title="Irrigation Need"
          value='0.5"'
          subtitle="Recommended application"
          icon={Sprout}
          iconColor="text-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Soil Moisture Trends"
          data={moistureData}
          dataKey="month"
          color="#2563eb"
        />
        <ChartCard
          title="7-Day Precipitation Forecast"
          data={precipData}
          dataKey="day"
          color="#059669"
        />
      </div>

      <Alert className="mb-6" role="alert">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Water Conservation Alert</AlertTitle>
        <AlertDescription>
          Based on current soil moisture levels and forecasted precipitation, consider reducing irrigation for the next 48 hours to optimize water usage.
        </AlertDescription>
      </Alert>

      <div className="bg-white p-6 rounded-lg shadow" role="complementary">
        <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-center gap-2">
              <recommendation.icon className="h-4 w-4 text-blue-500" aria-hidden="true" />
              <span>{recommendation.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AquaInsight;
