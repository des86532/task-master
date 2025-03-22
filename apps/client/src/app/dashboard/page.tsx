'use client';
import { Card } from '@heroui/react';
import { getTaskStats, getTasksStatsMonthly } from '@/app/_api/task';
import { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { MonthTaskStatsType, TaskSummaryType } from '@task-master/shared';
import dayjs from 'dayjs';

// 註冊 Chart.js 的所有組件
Chart.register(...registerables);

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState<TaskSummaryType | null>(null);
  const [dataMonthly, setDataMonthly] = useState<MonthTaskStatsType[] | null>(
    null
  );

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const init = async () => {
    try {
      const response = await getTaskStats();
      setSummaryData(response);
    } catch (error) {
      console.error('Error fetching task stats:', error);
    }
  };

  const initMonthlyStats = async () => {
    try {
      const response = await getTasksStatsMonthly();
      setDataMonthly(response);
    } catch (error) {
      console.error('Error fetching monthly task stats:', error);
    }
  };

  useEffect(() => {
    init();
    initMonthlyStats();
  }, []);

  useEffect(() => {
    if (chartRef.current && dataMonthly) {
      // 銷毀舊的圖表實例
      if (chartInstance) {
        chartInstance.destroy();
      }

      // 創建新的圖表實例
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const newChartInstance = new Chart(ctx, {
          type: 'bar', // 主要圖表類型為長條圖
          data: {
            labels: dataMonthly.map(
              (stat) =>
                `${dayjs(stat.startDate).format('YYYY/MM/DD')} - ${dayjs(
                  stat.endDate
                ).format('YYYY/MM/DD')}`
            ), // X 軸為日期範圍
            datasets: [
              {
                type: 'line', // 折線圖
                label: 'Pending',
                data: dataMonthly.map((stat) => stat.pending), // Y 軸為 pending 數量
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                yAxisID: 'y',
              },
              {
                type: 'bar', // 長條圖 1
                label: 'Progress',
                data: dataMonthly.map((stat) => stat.progress), // Y 軸為 progress 數量
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y',
              },
              {
                type: 'bar', // 長條圖 2
                label: 'Completed',
                data: dataMonthly.map((stat) => stat.completed), // Y 軸為 completed 數量
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y',
              },
            ],
          },
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Monthly Task Statistics',
                font: {
                  size: 24,
                },
              },
            },
          },
        });
        setChartInstance(newChartInstance);
      }
    }

    // 組件卸載時銷毀圖表實例
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [dataMonthly]);

  const data = [
    {
      title: 'Pending',
      value: summaryData?.pending ?? 0,
    },
    {
      title: 'Progress',
      value: summaryData?.progress ?? 0,
    },
    {
      title: 'Daily Completed',
      value: summaryData?.completed.day ?? 0,
    },
    {
      title: 'Weekly Completed',
      value: summaryData?.completed.week ?? 0,
    },
    {
      title: 'Monthly Completed',
      value: summaryData?.completed.month ?? 0,
    },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-4xl font-bold mb-5">Dashboard</h2>
      <div className="px-2 flex flex-col gap-4">
        <div className="flex gap-4">
          {data.map((item, index) => (
            <Card
              className=" border border-transparent dark:border-default-100 flex-1"
              key={index}
            >
              <div className="flex p-4 h-full">
                <div className="flex flex-col gap-y-2 justify-between">
                  <dt className="text-small font-medium text-default-500">
                    {item.title}
                  </dt>
                  <dd className="text-2xl font-semibold text-default-700">
                    {item.value}
                  </dd>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <div className="p-4">
            <canvas ref={chartRef}></canvas>
          </div>
        </Card>
      </div>
    </div>
  );
}
