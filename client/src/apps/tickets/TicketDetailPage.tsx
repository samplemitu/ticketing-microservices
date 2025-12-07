import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useTicket } from '@/hooks/useTickets';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Tag, ArrowLeft, Edit, Trash2, 
  ShoppingCart, Share2, Heart, Clock, User 
} from 'lucide-react';

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ticket, isLoading, fetchTicket } = useTicket(id || '');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) fetchTicket();
  }, [id, fetchTicket]);

  const isOwner = user?.id === ticket?.userId;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to purchase tickets');
      navigate('/auth/signin');
      return;
    }
    toast.success('Redirecting to checkout...');
    navigate(`/orders/${ticket?.id}/payment`);
  };

  const handleDelete = () => {
    toast.success('Ticket deleted successfully');
    navigate('/');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-32 skeleton-pulse" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 skeleton-pulse rounded-xl" />
              <div className="h-96 skeleton-pulse rounded-xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!ticket) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Ticket not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tickets
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Hero Image */}
            <div 
              className="h-64 md:h-80 rounded-xl overflow-hidden relative mb-6"
              style={{ background: 'var(--gradient-hero)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <StatusBadge status={ticket.status} />
                <div className="flex gap-2">
                  <Button size="icon" variant="secondary" className="h-9 w-9">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-9 w-9">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Title & Category */}
            <div className="mb-6">
              {ticket.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                  <Tag className="h-3 w-3" />
                  {ticket.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{ticket.title}</h1>
            </div>

            {/* Event Details */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Event Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formatDate(ticket.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{formatTime(ticket.date)}</p>
                  </div>
                </div>
                {ticket.venue && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-medium">{ticket.venue}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {ticket.description && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-3">About this event</h3>
                <p className="text-muted-foreground leading-relaxed">{ticket.description}</p>
              </div>
            )}
          </motion.div>

          {/* Sidebar - Purchase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Price per ticket</p>
                <p className="text-4xl font-bold gradient-text">{formatPrice(ticket.price)}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Sold by verified seller</span>
                </div>
              </div>

              {ticket.status === 'available' && (
                <Button
                  onClick={handlePurchase}
                  className="w-full btn-accent h-12 text-base"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Purchase Ticket
                </Button>
              )}

              {ticket.status === 'reserved' && (
                <Button disabled className="w-full h-12 text-base">
                  Currently Reserved
                </Button>
              )}

              {ticket.status === 'sold' && (
                <Button disabled className="w-full h-12 text-base">
                  Sold Out
                </Button>
              )}

              {isOwner && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">Manage your listing</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(`/tickets/${ticket.id}/edit`)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleDelete}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
