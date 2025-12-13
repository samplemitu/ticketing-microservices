export const TICKET_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  SOLD: 'sold',
  CANCELLED: 'cancelled',
} as const;

export type TicketStatus = typeof TICKET_STATUS[keyof typeof TICKET_STATUS];

export const ORDER_STATUS = {
  CREATED: 'created',
  AWAITING_PAYMENT: 'awaiting:payment',
  COMPLETE: 'complete',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  available: { bg: 'bg-success/10', text: 'text-success' },
  reserved: { bg: 'bg-warning/10', text: 'text-warning' },
  sold: { bg: 'bg-muted', text: 'text-muted-foreground' },
  cancelled: { bg: 'bg-destructive/10', text: 'text-destructive' },
  created: { bg: 'bg-primary/10', text: 'text-primary' },
  'awaiting:payment': { bg: 'bg-warning/10', text: 'text-warning' },
  complete: { bg: 'bg-success/10', text: 'text-success' },
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
};
