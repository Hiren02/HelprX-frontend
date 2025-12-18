'use client';

import { useEffect, useState } from 'react';
import { formatDateTime, formatDate, formatTime, formatTimeAgo, formatRelativeDate } from '@/lib/utils/date';

interface FormattedDateProps {
  date: string | Date;
  mode?: 'datetime' | 'date' | 'time' | 'ago' | 'relative';
  className?: string;
}

export const FormattedDate = ({ date, mode = 'datetime', className = '' }: FormattedDateProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>Loading...</span>;
  }

  let formattedString = '';
  switch (mode) {
    case 'date':
      formattedString = formatDate(date);
      break;
    case 'time':
      formattedString = formatTime(date);
      break;
    case 'ago':
      formattedString = formatTimeAgo(date);
      break;
    case 'relative':
      formattedString = formatRelativeDate(date);
      break;
    case 'datetime':
    default:
      formattedString = formatDateTime(date);
      break;
  }

  return <span className={className}>{formattedString}</span>;
};
