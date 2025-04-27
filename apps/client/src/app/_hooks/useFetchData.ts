import useSWR, { SWRConfiguration } from 'swr';
import axiosInstance from '@/app/_api/axiosInstance';

// 封裝 fetcher 函數
const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

// 自定義 Hook，封裝 useSWR 和 fetcher
const useFetchData = <T>(
  url: string,
  query?: Record<string, any>,
  options?: SWRConfiguration
) => {
  // 格式化查詢參數
  const queryString = query ? `?${new URLSearchParams(query).toString()}` : '';
  const fullUrl = `${url}${queryString}`;

  // 使用 useSWR 並傳入完整的 URL、fetcher 和其他配置
  const { data, error, isLoading, mutate } = useSWR<T>(
    fullUrl,
    fetcher,
    options
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFetchData;
