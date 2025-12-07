import { STATUS_COLORS } from '@/utils/constants';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.available;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const formattedStatus = status
    .replace(':', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colors.bg} ${colors.text} ${sizeClasses[size]}`}>
      {formattedStatus}
    </span>
  );
}
