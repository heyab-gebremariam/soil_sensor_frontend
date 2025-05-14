import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled, { createGlobalStyle } from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #1a1a1a;
    min-height: 100vh;
  }
`;

const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: #1a1a1a;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  gap: 20px;
`;

const MetricCard = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const IconWrapper = styled.span`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
`;

const DeviceInfoCard = styled(MetricCard)`
  padding: 25px;
`;

const ChartCard = styled(MetricCard)`
  grid-column: 2;
  grid-row: 1 / 3;
  padding: 25px;
`;

const AlertCard = styled(MetricCard)`
  flex-direction: row;
  gap: 15px;
  padding: 25px;
`;

const Value = styled.span`
  font-size: 48px;
  font-weight: 500;
`;

const Unit = styled.span`
  font-size: 24px;
  color: #888;
`;

const MinMax = styled.div`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  gap: 10px;
  justify-content: center;
  
  .max { color: #ff6b6b; }
  .min { color: #4dabf7; }
`;

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 8px 0;
  color: #888;
  font-size: 14px;
`;

const DeviceTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 16px;
  text-align: center;
`;

const AlertContent = styled.div`
  text-align: left;
`;

const TimeCard = styled(MetricCard)`
  padding: 25px;
  
  .year {
    font-size: 14px;
    color: #888;
    margin-bottom: 5px;
  }
  
  .day {
    font-size: 48px;
    font-weight: 300;
    line-height: 1;
  }
  
  .month {
    font-size: 24px;
    margin-left: 5px;
  }
  
  .time {
    font-size: 36px;
    font-weight: 500;
    margin-top: 5px;
  }
  
  .period {
    font-size: 20px;
    color: #888;
    margin-left: 5px;
  }
`;

const App: React.FC = () => {
  const [temperature] = useState(24);
  const [humidity] = useState(50);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chartData] = useState({
    labels: ['05 Mar', '06 Mar', '07 Mar', '08 Mar', '09 Mar', '10 Mar', '11 Mar', '12 Mar', '13 Mar'],
    datasets: [{
      label: 'Humidity %',
      data: [55, 58, 40, 38, 40, 42, 45, 38, 25],
      borderColor: '#4dabf7',
      tension: 0.4,
    }]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Dynamic Updating Chart',
        color: 'white',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#333'
        },
        ticks: {
          color: '#888'
        }
      },
      x: {
        grid: {
          color: '#333'
        },
        ticks: {
          color: '#888'
        }
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <DashboardContainer>
        <GridLayout>
          <LeftColumn>
            <MetricCard>
              <IconWrapper role="img" aria-label="temperature">
                🌡️
              </IconWrapper>
              <MetricContent>
                <ValueContainer>
                  <Value>{temperature}</Value>
                  <Unit>°C</Unit>
                </ValueContainer>
                <MinMax>
                  <span className="max">~ 30°</span>
                  <span className="min">~ 17°</span>
                </MinMax>
              </MetricContent>
            </MetricCard>

            <MetricCard>
              <IconWrapper role="img" aria-label="humidity">
                💧
              </IconWrapper>
              <MetricContent>
                <ValueContainer>
                  <Value>{humidity}</Value>
                  <Unit>%</Unit>
                </ValueContainer>
                <MinMax>
                  <span className="max">~ 60%</span>
                  <span className="min">~ 30%</span>
                </MinMax>
              </MetricContent>
            </MetricCard>

            <DeviceInfoCard>
              <DeviceTitle>Device</DeviceTitle>
              <DeviceInfo>
                <span>📱</span>
                <span>ESP32</span>
                <span>192.168.1.150</span>
              </DeviceInfo>
              <DeviceInfo>
                <span>📶</span>
                <span>-65 dBm</span>
                <span>2 days, 14 hours</span>
              </DeviceInfo>
            </DeviceInfoCard>

            <TimeCard>
              <div className="year">{currentTime.getFullYear()}</div>
              <div>
                <span className="day">{currentTime.getDate()}</span>
                <span className="month">{currentTime.toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div>
                <span className="time">
                  {currentTime.toLocaleString('default', { hour: 'numeric', minute: '2-digit', hour12: true }).split(' ')[0]}
                </span>
                <span className="period">
                  {currentTime.toLocaleString('default', { hour: 'numeric', minute: '2-digit', hour12: true }).split(' ')[1]}
                </span>
              </div>
            </TimeCard>
          </LeftColumn>

          <RightColumn>
            <ChartCard>
              <Line data={chartData} options={chartOptions} />
            </ChartCard>

            <AlertCard>
              <IconWrapper role="img" aria-label="alert" style={{ margin: 0 }}>⚠️</IconWrapper>
              <AlertContent>
                <h4 style={{ margin: '0', fontSize: '16px' }}>Low Humidity Detected</h4>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#888' }}>
                  The current humidity level is slightly low, which can sometimes cause discomfort and
                  dry out mucous membranes. Consider using a humidifier to increase moisture in the air.
                </p>
              </AlertContent>
            </AlertCard>
          </RightColumn>
        </GridLayout>
      </DashboardContainer>
    </>
  );
};

export default App;

