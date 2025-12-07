import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
  categoryValue: string;
  onCategoryChange: (value: string) => void;
}

export function SearchFilter({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  categoryValue,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events, venues..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 input-focus"
        />
      </div>
      <Select value={statusValue} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="reserved">Reserved</SelectItem>
          <SelectItem value="sold">Sold</SelectItem>
        </SelectContent>
      </Select>
      <Select value={categoryValue} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Concert">Concert</SelectItem>
          <SelectItem value="Sports">Sports</SelectItem>
          <SelectItem value="Theater">Theater</SelectItem>
          <SelectItem value="Festival">Festival</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
