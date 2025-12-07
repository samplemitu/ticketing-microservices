import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Ticket, DollarSign, Calendar, MapPin, Tag, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CreateTicketPage() {
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Ticket created successfully!');
    navigate('/');
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-xl btn-gradient mb-4">
              <Ticket className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create New Ticket</h1>
            <p className="text-muted-foreground">List your ticket for sale and reach thousands of buyers</p>
          </div>

          {/* Form */}
          <div className="glass-card rounded-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Event Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Taylor Swift - Eras Tour"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`input-focus ${errors.title ? 'border-destructive' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Price & Category Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className={`input-focus ${errors.price ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                    min="0"
                    step="0.01"
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price}</p>
                  )}
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

              {/* Date & Time Row */}
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
                  {errors.date && (
                    <p className="text-sm text-destructive">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className={`input-focus ${errors.time ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.time && (
                    <p className="text-sm text-destructive">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Venue */}
              <div className="space-y-2">
                <Label htmlFor="venue" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Venue (Optional)
                </Label>
                <Input
                  id="venue"
                  placeholder="e.g., Madison Square Garden, NYC"
                  value={formData.venue}
                  onChange={(e) => handleChange('venue', e.target.value)}
                  className="input-focus"
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details about the ticket..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="input-focus min-h-[100px] resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full btn-gradient h-12 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Ticket...
                  </>
                ) : (
                  'Create Ticket'
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
