import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./home.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";
// interface lar
interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ChartPoint {
  name: string;
  value: number;
}

interface PeriodData {
  chartData: ChartPoint[];
  amount: string;
  percentage: string;
  stats: StatCard[];
}

type PeriodKey = "weekly" | "monthly" | "yearly";

// Chart ma'lumotlari
const RevenueChart: React.FC<{ data: ChartPoint[] }> = ({ data }) => (
    <ResponsiveContainer width="100%" height={280}>
        {/* Chart komponenti bu yerda */}
        <LineChart data={data} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical = {true} />
                <XAxis dataKey="name" stroke="#999" tick={{ fill: '#999', fontSize: 12 }} />
                <YAxis stroke="#999" tick={{ fill: '#999', fontSize: 12 }} />
                <Tooltip 
                     contentStyle={{ 
                     backgroundColor: '#9B74F0', 
                     border: 'none', 
                     borderRadius: '8px',
                     color: 'white',
                     padding: '8px 12px'
                     }}
                     formatter={(value: any) => [`${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="value" stroke="#ffffff" dot={false} strokeWidth={2} />
                {/* Line komponenti bu yerda */}
        </LineChart>

    </ResponsiveContainer>
);


const Home: React.FC  = () => {
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("weekly");

    const PeriodData: Record<PeriodKey, PeriodData> = {
       weekly: {
            chartData: [
                { name: 'ЯНВ', value: 400 },
                { name: 'ФЕБ', value: 1398 },
                { name: 'МАР', value: 9800 },
                { name: 'АПР', value: 3908 },
                { name: 'МАЙ', value: 4800 },
                { name: 'ИЮНЬ', value: 3800 },
                { name: 'ИЮЛЬ', value: 4300 },
                { name: 'АВГ', value: 2300 },
                { name: 'СЕНТ', value: 2300 },
                { name: 'ОКТ', value: 4300 },
                { name: 'НОЯБРЬ', value: 2300 },
                { name: 'ДЕК', value: 2300 },
            ],
             amount: '12,7 млн. сум',
             percentage: '+12%',
             stats: [
                { label: 'activeMembers', value: '8', icon: '👥', color: '#e8e5e5' },
                { label: 'expiredMembers', value: '8', icon: '⏰', color: '#e8e5e5' },
                { label: 'todayVisits', value: '8', icon: '👁️', color: '#e8e5e5' },
                { label: 'outOfStockProducts', value: '8', icon: '🛒', color: '#e8e5e5' },
             ]
    },         
    monthly: {
            chartData: [
                { name: 'ЯНВ', value: 15400 },
                { name: 'ФЕБ', value: 12398 },
                { name: 'МАР', value: 18800 },
                { name: 'АПР', value: 16908 },
                { name: 'МАЙ', value: 14800 },
                { name: 'ИЮНЬ', value: 10800 },
                { name: 'ИЮЛЬ', value: 17300 },
                { name: 'АВГ', value: 15300 },
                { name: 'СЕНТ', value: 16300 },
                { name: 'ОКТ', value: 14300 },
                { name: 'НОЯБРЬ', value: 3000 },
                { name: 'ДЕК', value: 10300 },
            ],
            amount: '45,2 млн. сум',
            percentage: '+28%',
            stats: [
                { label: 'activeMembers', value: '156', icon: '👥', color: '#e8e5e5' },
                { label: 'expiredMembers', value: '42', icon: '⏰', color: '#e8e5e5' },
                { label: 'todayVisits', value: '287', icon: '👁️', color: '#e8e5e5' },
                { label: 'outOfStockProducts', value: '23', icon: '🛒', color: '#e8e5e5' },
            ]
        },
         yearly: {
            chartData: [
                { name: '2015', value: 25000 },
                { name: '2016', value: 52000 },
                { name: '2017', value: 58000 },
                { name: '2018', value: 62000 },
                { name: '2019', value: 68000 },
                { name: '2020', value: 100000 },
                { name: '2021', value: 68000 },
                { name: '2022', value: 85000 },
                { name: '2023', value: 92000 },
                { name: '2024', value: 98000 },
                { name: '2025', value: 165000 },
            ],
            amount: '750,5 млн. сум',
            percentage: '+45%',
            stats: [
                { label: 'activeMembers', value: '1,245', icon: '👥', color: '#e8e5e5' },
                { label: 'expiredMembers', value: '342', icon: '⏰', color: '#e8e5e5' },
                { label: 'todayVisits', value: '3,456', icon: '👁️', color: '#e8e5e5' },
                { label: 'outOfStockProducts', value: '187', icon: '🛒', color: '#e8e5e5' },
            ]
        }
};
        const currentData = PeriodData[selectedPeriod];


return (
     <div className="dashboard">
          <h1 className="dashboard-title">{t('receiveMoney')}</h1>

           <div className="top-stats">
                <div className="top-stats-content">
                    <p className="stats-period">{t('sales2022')}</p>
                    <div className="stats-amount">
                        <span className="amount" style={{fontFamily: 'Josefin Sans'}}>{currentData.amount}</span>
                        <span className="percentage">{currentData.percentage} {t('comparedToLastYear')}</span>
                    </div>
                </div>

                {/* Period Toggle Buttons */}
                <div className="period-buttons">
                    {(['weekly', 'monthly', 'yearly'] as PeriodKey[]).map(period => (
                        <button
                            key={period}
                            className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
                            onClick={() => setSelectedPeriod(period)}
                        >
                            {t(period)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Section */}
            <div className="chart-container">
                <RevenueChart data={currentData.chartData} />
            </div>

            {/* Stats Cards Section */}
            <div className="bottom-stats-cards">
                {currentData.stats.map(card => (
                    <div key={card.label} className="stat-card">
                        <div className="stat-card-header">
                            <span className="stat-card-icon" style={{ color: card.color }}>
                                {card.icon}
                            </span>
                            <span className="stat-card-label">{t(card.label)}</span>
                        </div>
                        <p className="stat-card-value">{card.value}</p>
                    </div>
                ))}
            </div>
     </div>
)
}

export default Home;