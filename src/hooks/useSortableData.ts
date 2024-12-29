import { useState, useMemo } from 'react';

interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export function useSortableData<T>(items: T[], defaultSortKey: keyof T) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: defaultSortKey,
    direction: 'asc'
  });

  const sortedItems = useMemo(() => {
    const sortedData = [...items];
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (Array.isArray(aValue) && Array.isArray(bValue)) {
        return sortConfig.direction === 'asc'
          ? aValue.length - bValue.length
          : bValue.length - aValue.length;
      }

      return 0;
    });

    return sortedData;
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return {
    items: sortedItems,
    sortConfig,
    requestSort,
  };
} 