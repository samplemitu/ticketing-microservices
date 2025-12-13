import { useState, useCallback } from 'react';
import { TICKET_STATUS, TicketStatus, PAGINATION } from '@/utils/constants';

export interface Ticket {
  id: string;
  title: string;
  price: number;
  date: string;
  description?: string;
  status: TicketStatus;
  userId: string;
  createdAt: string;
  image?: string;
  venue?: string;
  category?: string;
}

// Mock data for demo
const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Taylor Swift - Eras Tour',
    price: 299,
    date: '2024-08-15T19:00:00',
    description: 'Experience the iconic Eras Tour live! An unforgettable journey through Taylor\'s musical evolution.',
    status: TICKET_STATUS.AVAILABLE,
    userId: '1',
    createdAt: '2024-01-15',
    venue: 'MetLife Stadium, NJ',
    category: 'Concert',
  },
  {
    id: '2',
    title: 'NBA Finals Game 7',
    price: 450,
    date: '2024-06-20T20:00:00',
    description: 'Witness history in the making at the NBA Finals Game 7. Premium courtside experience.',
    status: TICKET_STATUS.AVAILABLE,
    userId: '2',
    createdAt: '2024-01-20',
    venue: 'Chase Center, SF',
    category: 'Sports',
  },
  {
    id: '3',
    title: 'Hamilton - Broadway',
    price: 175,
    date: '2024-07-10T14:00:00',
    description: 'The revolutionary musical that changed Broadway forever. Orchestra seating available.',
    status: TICKET_STATUS.RESERVED,
    userId: '1',
    createdAt: '2024-02-01',
    venue: 'Richard Rodgers Theatre, NYC',
    category: 'Theater',
  },
  {
    id: '4',
    title: 'Coldplay - Music of the Spheres',
    price: 189,
    date: '2024-09-05T20:00:00',
    description: 'A spectacular light show and musical journey through Coldplay\'s greatest hits.',
    status: TICKET_STATUS.AVAILABLE,
    userId: '3',
    createdAt: '2024-02-10',
    venue: 'SoFi Stadium, LA',
    category: 'Concert',
  },
  {
    id: '5',
    title: 'Super Bowl LVIII',
    price: 2500,
    date: '2024-02-11T18:30:00',
    description: 'The biggest sporting event of the year. Club level seating with all-inclusive food & drinks.',
    status: TICKET_STATUS.SOLD,
    userId: '2',
    createdAt: '2024-01-01',
    venue: 'Allegiant Stadium, LV',
    category: 'Sports',
  },
  {
    id: '6',
    title: 'Coachella Weekend 1 Pass',
    price: 549,
    date: '2024-04-12T12:00:00',
    description: 'Full weekend pass to Coachella 2024. Access to all stages and VIP areas.',
    status: TICKET_STATUS.AVAILABLE,
    userId: '1',
    createdAt: '2024-01-25',
    venue: 'Empire Polo Club, Indio',
    category: 'Festival',
  },
];

interface UseTicketsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
}

export function useTickets(params: UseTicketsParams = {}) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_TICKETS];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchLower) ||
        t.venue?.toLowerCase().includes(searchLower)
      );
    }

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(t => t.status === params.status);
    }

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(t => t.category === params.category);
    }

    const page = params.page || PAGINATION.DEFAULT_PAGE;
    const limit = params.limit || PAGINATION.DEFAULT_LIMIT;
    const start = (page - 1) * limit;
    const end = start + limit;

    setTotalPages(Math.ceil(filtered.length / limit));
    setTickets(filtered.slice(start, end));
    setIsLoading(false);
  }, [params.search, params.status, params.category, params.page, params.limit]);

  return { tickets, isLoading, totalPages, fetchTickets, setTickets };
}

export function useTicket(id: string) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTicket = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const found = MOCK_TICKETS.find(t => t.id === id);
    setTicket(found || null);
    setIsLoading(false);
  }, [id]);

  return { ticket, isLoading, fetchTicket, setTicket };
}
