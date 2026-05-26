import { Crown } from 'lucide-react';

interface PointValueProps {
  value: number;
  className?: string;
  iconClassName?: string;
  hideZero?: boolean;
}

export function PointValue({
  value,
  className = '',
  iconClassName = 'size-3 text-amber-300',
  hideZero = true,
}: PointValueProps) {
  if (hideZero && value === 0) return null;

  return (
    <span className={['inline-flex items-center gap-0.5', className].join(' ')}>
      <Crown className={iconClassName} aria-hidden />
      <span>{value}</span>
      <span className="sr-only">점</span>
    </span>
  );
}
