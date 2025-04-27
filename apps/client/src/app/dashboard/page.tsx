'use client';
import { Card, Spinner } from '@heroui/react';
import { TASK_API } from '@/app/_api/task';
import { useEffect, useRef, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { MonthTaskStatsType, TaskSummaryType } from '@task-master/shared';
import dayjs from 'dayjs';
import useFetchData from '@/app/_hooks/useFetchData';

// 註冊 Chart.js 的所有組件
Chart.register(...registerables);

export default function Dashboard() {
  const { data: summaryData, isLoading: isLoadingSummary } =
    useFetchData<TaskSummaryType>(TASK_API.taskSummary);

  const { data: dataMonthly, isLoading: isLoadingMonthly } = useFetchData<
    MonthTaskStatsType[]
  >(TASK_API.taskSummaryMonthly);

  const loading = useMemo(
    () => isLoadingMonthly || isLoadingSummary,
    [isLoadingMonthly, isLoadingSummary]
  );

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  // 更新圖表
  useEffect(() => {
    let newChart: Chart | null = null;

    if (!loading && chartRef.current && dataMonthly) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        newChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dataMonthly.map(
              (stat) =>
                `${dayjs(stat.startDate).format('YYYY/MM/DD')} - ${dayjs(
                  stat.endDate
                ).format('YYYY/MM/DD')}`
            ),
            datasets: [
              {
                type: 'line',
                label: 'Pending',
                data: dataMonthly.map((stat) => stat.pending),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                yAxisID: 'y',
              },
              {
                type: 'bar',
                label: 'Progress',
                data: dataMonthly.map((stat) => stat.progress),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y',
              },
              {
                type: 'bar',
                label: 'Completed',
                data: dataMonthly.map((stat) => stat.completed),
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
      }
    }

    return () => {
      newChart?.destroy();
    };
  }, [dataMonthly, loading]);

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
      value: summaryData?.completed?.day ?? 0,
    },
    {
      title: 'Weekly Completed',
      value: summaryData?.completed?.week ?? 0,
    },
    {
      title: 'Monthly Completed',
      value: summaryData?.completed?.month ?? 0,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-bold mb-5">Dashboard</h2>
      <div className="p-2 flex flex-col gap-4 flex-1">
        <div className="flex gap-4">
          {data.map((item, index) => (
            <Card
              className="border border-transparent dark:border-default-100 flex-1"
              key={index}
              shadow="sm"
            >
              <div className="flex p-4 h-full">
                <div className="flex flex-col gap-y-2 justify-between">
                  <dt className="text-small font-medium text-default-500">
                    {item.title}
                  </dt>
                  <dd className="text-2xl font-semibold text-default-700">
                    {loading ? <Spinner size="sm" /> : item.value}
                  </dd>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="flex-1 flex justify-center items-center" shadow="sm">
          <div className="p-4 flex justify-center items-center w-full h-full">
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <canvas ref={chartRef} style={{ width: '100%' }}></canvas>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
