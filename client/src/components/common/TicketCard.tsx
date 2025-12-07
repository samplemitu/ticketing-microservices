import { Link } from 'react-router-dom';
import { Ticket } from '@/hooks/useTickets';
import { STATUS_COLORS } from '@/utils/constants';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface TicketCardProps {
  ticket: Ticket;
  index?: number;
}

export function TicketCard({ ticket, index = 0 }: TicketCardProps) {
  const statusColor = STATUS_COLORS[ticket.status] || STATUS_COLORS.available;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/tickets/${ticket.id}`}>
        <div className="group glass-card rounded-xl overflow-hidden card-hover">
          {/* Image/Gradient Header */}
          <div className="h-40 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
            </div>
            {ticket.category && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-card/80 backdrop-blur-sm text-foreground">
                  <Tag className="h-3 w-3" />
                  {ticket.category}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {ticket.title}
            </h3>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary/70" />
                <span>{formatDate(ticket.date)}</span>
              </div>
              {ticket.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  <span className="line-clamp-1">{ticket.venue}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-2xl font-bold gradient-text">
                {formatPrice(ticket.price)}
              </span>
              <span className="text-sm text-muted-foreground">per ticket</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
