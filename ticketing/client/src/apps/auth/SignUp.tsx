import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Ticket,
  Mail,
  Lock,
  User,
  Loader2,
  ArrowRight,
  Check,
} from 'lucide-react';

const FEATURES = [
  'Buy tickets to thousands of events',
  'Sell your tickets securely',
  'Get personalized recommendations',
  'Track your orders in real-time',
];

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (
      password.length < 8 ||
      password.length > 20 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      toast.error(
        'Password must be 8-20 chars with upper, lower, number & special char'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(email, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch {
      toast.error('Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Panel - Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-background'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
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
            <h2 className='text-2xl font-bold mb-2'>Create your account</h2>
            <p className='text-muted-foreground'>
              Start your journey with TicketPro today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='space-y-5'
          >
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='pl-10 input-focus'
                  disabled={isSubmitting}
                />
              </div>
            </div>

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
              <Label htmlFor='password'>Password</Label>
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
              <p className='text-xs text-muted-foreground'>
                Must be at least 6 characters
              </p>
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
                  Create Account
                  <ArrowRight className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </form>

          <p className='text-center text-sm text-muted-foreground mt-6'>
            Already have an account?{' '}
            <Link
              to='/auth/signin'
              className='text-primary font-medium hover:underline'
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Features */}
      <div
        className='hidden lg:flex lg:w-1/2 relative overflow-hidden'
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl' />
          <div className='absolute bottom-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl' />
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
              Join Millions of
              <br />
              <span className='text-accent'>Event Lovers</span>
            </h1>
            <ul className='space-y-4'>
              {FEATURES.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className='flex items-center gap-3'
                >
                  <div className='p-1 rounded-full bg-accent'>
                    <Check className='h-4 w-4 text-accent-foreground' />
                  </div>
                  <span className='text-primary-foreground/90'>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
