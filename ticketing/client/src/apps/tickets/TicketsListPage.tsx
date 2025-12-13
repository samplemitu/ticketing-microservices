import { useEffect, useState, useCallback } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { TicketCard } from '@/components/common/TicketCard';
import { TicketCardSkeleton } from '@/components/common/TicketCardSkeleton';
import { SearchFilter } from '@/components/common/SearchFilter';
import { Pagination } from '@/components/common/Pagination';
import { useTickets } from '@/hooks/useTickets';
import { motion } from 'framer-motion';
import { Ticket, Sparkles } from 'lucide-react';

export function TicketsListPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const { tickets, isLoading, totalPages, fetchTickets } = useTickets({
    search,
    status,
    category,
    page,
    limit: 6,
  });

  const debouncedFetch = useCallback(() => {
    const timer = setTimeout(() => {
      fetchTickets();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchTickets]);

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  useEffect(() => {
    setPage(1);
  }, [search, status, category]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-float delay-300" />
        </div>
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Discover amazing events</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Find Your Next<br />
              <span className="text-accent">Unforgettable Experience</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Browse thousands of tickets for concerts, sports, theater, and more. 
              Buy with confidence and create memories that last a lifetime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <SearchFilter
            searchValue={search}
            onSearchChange={setSearch}
            statusValue={status}
            onStatusChange={setStatus}
            categoryValue={category}
            onCategoryChange={setCategory}
          />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TicketCardSkeleton key={i} />
            ))}
          </div>
        ) : tickets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tickets.map((ticket, index) => (
                <TicketCard key={ticket.id} ticket={ticket} index={index} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="p-4 rounded-full bg-muted inline-block mb-4">
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </section>
    </MainLayout>
  );
}
