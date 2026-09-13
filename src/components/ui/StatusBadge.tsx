import { useTranslation } from 'react-i18next';
import { cn, STATUS_CONFIG } from '../../utils';
import type { ApplicationStatus } from '../../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useTranslation();
  const cfg = STATUS_CONFIG[status];
  const translatedLabel = t(`status.${status}`, cfg.label);
  return (
    <span className={cn('status-badge', cfg.color, cfg.bg, className)}>
      {translatedLabel}
    </span>
  );
}
