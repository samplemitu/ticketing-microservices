import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useTicket } from '@/hooks/useTickets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Edit, DollarSign, Calendar, MapPin, Tag, FileText } from 'lucide-react';

export function EditTicketPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ticket, isLoading: isLoadingTicket, fetchTicket } = useTicket(id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    if (id) fetchTicket();
  }, [id, fetchTicket]);

  useEffect(() => {
    if (ticket) {
      const dateObj = new Date(ticket.date);
      setFormData({
        title: ticket.title,
        price: ticket.price.toString(),
        date: dateObj.toISOString().split('T')[0],
        time: dateObj.toTimeString().slice(0, 5),
        venue: ticket.venue || '',
        category: ticket.category || '',
        description: ticket.description || '',
      });
    }
  }, [ticket]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Ticket updated successfully!');
    navigate(`/tickets/${id}`);
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isLoadingTicket) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 skeleton-pulse" />
            <div className="h-64 skeleton-pulse rounded-xl" />
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
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to={`/tickets/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ticket
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <Edit className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Edit Ticket</h1>
            <p className="text-muted-foreground">Update your ticket listing details</p>
          </div>

          <div className="glass-card rounded-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`input-focus ${errors.title ? 'border-destructive' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className={`input-focus ${errors.price ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    Category
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleChange('category', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Concert">Concert</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Theater">Theater</SelectItem>
                      <SelectItem value="Festival">Festival</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Event Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={`input-focus ${errors.date ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="input-focus"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Venue
                </Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => handleChange('venue', e.target.value)}
                  className="input-focus"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="input-focus min-h-[100px] resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/tickets/${id}`)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 btn-gradient"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
