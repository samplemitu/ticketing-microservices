import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Receipt, ArrowRight, Plus, Calendar } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const { orders, isLoading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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

  const recentOrders = orders.slice(0, 3);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Account Type</p>
                    <p className="text-sm font-medium capitalize">{user?.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium">January 2024</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button asChild className="w-full btn-gradient">
                  <Link to="/tickets/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Sell a Ticket
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-3xl font-bold gradient-text">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-3xl font-bold gradient-text">
                  {orders.filter(o => o.status === 'complete').length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center col-span-2 md:col-span-1">
                <p className="text-3xl font-bold gradient-text">
                  {formatPrice(orders.reduce((sum, o) => sum + o.ticketPrice, 0))}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Receipt className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Recent Orders</h3>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/orders" className="text-primary">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 skeleton-pulse rounded-lg" />
                  ))}
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/orders/${order.id}/payment`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-sm group-hover:text-primary transition-colors">
                              {order.ticketTitle}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={order.status} size="sm" />
                          <span className="font-semibold text-sm">
                            {formatPrice(order.ticketPrice)}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Button asChild variant="outline">
                    <Link to="/">Browse Tickets</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
