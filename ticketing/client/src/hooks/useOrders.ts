import { useState, useCallback } from 'react';
import { ORDER_STATUS, OrderStatus } from '@/utils/constants';

export interface Order {
  id: string;
  ticketId: string;
  ticketTitle: string;
  ticketPrice: number;
  status: OrderStatus;
  createdAt: string;
  expiresAt?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    ticketId: '1',
    ticketTitle: 'Taylor Swift - Eras Tour',
    ticketPrice: 299,
    status: ORDER_STATUS.COMPLETE,
    createdAt: '2024-01-15T10:00:00',
  },
  {
    id: 'ord-2',
    ticketId: '3',
    ticketTitle: 'Hamilton - Broadway',
    ticketPrice: 175,
    status: ORDER_STATUS.AWAITING_PAYMENT,
    createdAt: '2024-02-01T14:30:00',
    expiresAt: '2024-02-01T14:45:00',
  },
  {
    id: 'ord-3',
    ticketId: '6',
    ticketTitle: 'Coachella Weekend 1 Pass',
    ticketPrice: 549,
    status: ORDER_STATUS.CANCELLED,
    createdAt: '2024-01-25T09:15:00',
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setOrders(MOCK_ORDERS);
    setIsLoading(false);
  }, []);

  return { orders, isLoading, fetchOrders, setOrders };
}

export function useOrder(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const found = MOCK_ORDERS.find((o) => o.id === id);
    setOrder(found || null);
    setIsLoading(false);
  }, [id]);

  return { order, isLoading, fetchOrder, setOrder };
}
