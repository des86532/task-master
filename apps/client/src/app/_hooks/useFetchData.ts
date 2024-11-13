import useSWR, { SWRConfiguration } from 'swr';

// 封裝 fetcher 函數
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 自定義 Hook，封裝 useSWR 和 fetcher
const useFetchData = <T>(url: string, options?: SWRConfiguration) => {
  // 使用 useSWR 並傳入 URL、fetcher 和其他配置
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, options);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFetchData;
