import { useEffect, useState } from "react";

type UseFetch<T> = {
  loading: boolean;
  items: T[];
};

export const useFetch = <T,>(url: string, itemsKey: string): UseFetch<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);

  const getItems = async (): Promise<void> => {
    const request = await fetch(url);
    const data = await request.json();

    const dataItems = data[itemsKey] as T[];

    setItems(dataItems);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (!url) return setLoading(false);

    getItems();
  }, [url]);

  return {
    loading,
    items,
  };
};
