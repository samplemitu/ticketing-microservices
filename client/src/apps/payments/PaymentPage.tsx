import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useOrder } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react';

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading, fetchOrder } = useOrder(id ? `ord-${id}` : '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (id) fetchOrder();
  }, [id, fetchOrder]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    toast.success('Payment successful!');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 max-w-lg">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 skeleton-pulse" />
            <div className="h-64 skeleton-pulse rounded-xl" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isComplete) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <div className="p-4 rounded-full bg-success/10 inline-block mb-4">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your tickets have been confirmed. Check your email for details.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link to="/orders">View Orders</Link>
              </Button>
              <Button asChild className="btn-gradient">
                <Link to="/">Browse More Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  // Mock order data if not found (for direct navigation)
  const orderData = order || {
    id: id,
    ticketTitle: 'Event Ticket',
    ticketPrice: 99,
  };

  const serviceFee = orderData.ticketPrice * 0.1;
  const total = orderData.ticketPrice + serviceFee;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to="/orders"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-xl btn-gradient mb-4">
              <CreditCard className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground">Secure checkout powered by Stripe</p>
          </div>

          {/* Order Summary */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{orderData.ticketTitle}</span>
                <span>{formatPrice(orderData.ticketPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span>{formatPrice(serviceFee)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg gradient-text">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="glass-card rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  className="input-focus"
                  required
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  className="input-focus"
                  required
                  disabled={isProcessing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="input-focus"
                    required
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="input-focus"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-accent h-12 text-base"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay {formatPrice(total)}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your payment is secured with 256-bit SSL encryption
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
