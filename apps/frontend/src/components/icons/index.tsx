// apps/frontend/src/components/icons/index.tsx
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
};

export const TicketIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M2 9a3 3 0 0 1 0 6v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4a3 3 0 0 1 0-6V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4z" />
    <line x1="9" y1="5" x2="9" y2="19" strokeDasharray="2 2" />
  </svg>
);

export const TransferArrowsIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M4 8h14M14 4l4 4-4 4" />
    <path d="M20 16H6M10 20l-4-4 4-4" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <rect x="5" y="11" width="14" height="10" rx="1" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="1" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const SeatIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M6 4h12v9a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V4z" />
    <path d="M4 11h2M18 11h2" />
    <path d="M8 17v4M16 17v4" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const ReceiptIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M4 2v20l3-2 3 2 3-2 3 2 4-2V2l-4 2-3-2-3 2-3-2-3 2z" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="12" y2="16" />
  </svg>
);

export const ScanIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <path d="M3 7V3h4" />
    <path d="M17 3h4v4" />
    <path d="M21 17v4h-4" />
    <path d="M7 21H3v-4" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ArrowUpRightIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} {...baseProps} className={className} {...props}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const VerifiedSealGlyph: React.FC<IconProps> = ({ size = 16, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
    <path
      d="M8 1l1.8 1.4 2.3-.4.8 2.2 2.1 1-.2 2.3 1.4 1.8-1.4 1.8.2 2.3-2.1 1-.8 2.2-2.3-.4L8 15l-1.8-1.4-2.3.4-.8-2.2-2.1-1 .2-2.3L0 7.7l1.4-1.8-.2-2.3 2.1-1 .8-2.2 2.3.4L8 1z"
      fill="currentColor"
    />
    <path
      d="M5.5 8l2 2 3.5-3.5"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

// Convenient Aliases
export const IconTicket = TicketIcon;
export const IconTransfer = TransferArrowsIcon;
export const IconShield = ShieldIcon;
export const IconLock = LockIcon;
export const IconClock = ClockIcon;
export const IconPin = PinIcon;
export const IconCalendar = CalendarIcon;
export const IconSeat = SeatIcon;
export const IconBell = BellIcon;
export const IconSearch = SearchIcon;
export const IconFilter = FilterIcon;
export const IconShare = ShareIcon;
export const IconHeart = HeartIcon;
export const IconUser = UserIcon;
export const IconReceipt = ReceiptIcon;
export const IconScan = ScanIcon;
export const IconCheck = CheckIcon;
export const IconClose = CloseIcon;
export const IconPlus = PlusIcon;
export const IconMinus = MinusIcon;
export const IconArrowUpRight = ArrowUpRightIcon;
export const IconVerifiedSeal = VerifiedSealGlyph;
