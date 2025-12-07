import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useOrders } from '@/hooks/useOrders';
import { StatusBadge } from '@/components/common/StatusBadge';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OrdersPage() {
  const { orders, isLoading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
            </div>
            <p className="text-muted-foreground">Track and manage your ticket orders</p>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 skeleton-pulse rounded-xl" />
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/orders/${order.id}/payment`}>
                    <div className="glass-card rounded-xl p-4 md:p-6 card-hover group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                            <Receipt className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                              {order.ticketTitle}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Order #{order.id} • {formatDate(order.createdAt)}
                            </p>
                            <StatusBadge status={order.status} size="sm" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <span className="text-xl font-bold gradient-text">
                            {formatPrice(order.ticketPrice)}
                          </span>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-4 rounded-full bg-muted inline-block mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring events and make your first purchase!
              </p>
              <Button asChild className="btn-gradient">
                <Link to="/">Browse Tickets</Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
