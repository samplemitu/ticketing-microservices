import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Ticket, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email & password required');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.message || 'Invalid credentials'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Panel - Branding */}
      <div
        className='hidden lg:flex lg:w-1/2 relative overflow-hidden'
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl' />
          <div className='absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl' />
        </div>
        <div className='relative z-10 flex flex-col justify-center px-16 text-primary-foreground'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center gap-3 mb-8'>
              <div className='p-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm'>
                <Ticket className='h-8 w-8' />
              </div>
              <span className='text-3xl font-bold'>TicketPro</span>
            </div>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 leading-tight'>
              Your Gateway to
              <br />
              <span className='text-accent'>Unforgettable</span> Events
            </h1>
            <p className='text-lg text-primary-foreground/80 max-w-md'>
              Access thousands of live events, concerts, sports games, and more.
              Buy and sell tickets with confidence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-background'>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
          <div className='lg:hidden flex items-center gap-2 mb-8 justify-center'>
            <div className='p-2 rounded-lg btn-gradient'>
              <Ticket className='h-5 w-5 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold gradient-text'>TicketPro</span>
          </div>

          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold mb-2'>Welcome back</h2>
            <p className='text-muted-foreground'>
              Sign in to your account to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='space-y-5'
          >
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-10 input-focus'
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  to='#'
                  className='text-sm text-primary hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10 input-focus'
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type='submit'
              className='w-full btn-gradient h-11'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <>
                  Sign In
                  <ArrowRight className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </form>

          <p className='text-center text-sm text-muted-foreground mt-6'>
            Don't have an account?{' '}
            <Link
              to='/auth/signup'
              className='text-primary font-medium hover:underline'
            >
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
