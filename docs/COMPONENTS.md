# Component Library Documentation

## Overview

HelprX frontend includes a comprehensive component library built with React, TypeScript, and Tailwind CSS.

---

## UI Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- All standard button HTML attributes

**Usage:**
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="outline" isLoading={true}>
  Loading...
</Button>

<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>
```

---

### Input

Form input with label, error states, and helper text.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- All standard input HTML attributes

**Usage:**
```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We'll never share your email"
  required
/>
```

---

### Card

Container component for content sections.

**Props:**
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean
- `onClick`: () => void
- `className`: string

**Usage:**
```tsx
import { Card } from '@/components/ui/Card';

<Card padding="md" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<Card padding="lg" onClick={handleClick}>
  Clickable card
</Card>
```

---

### Badge

Status indicator component.

**Props:**
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info'
- `className`: string

**Usage:**
```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Pending</Badge>
```

---

### Modal

Dialog/popup component.

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'

**Usage:**
```tsx
import { Modal } from '@/components/ui/Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

---

## Form Components

### Select

Dropdown selection component.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `options`: Array<{ value: string; label: string }>
- All standard select HTML attributes

**Usage:**
```tsx
import { Select } from '@/components/forms/Select';

<Select
  label="Service Type"
  options={[
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' }
  ]}
  error={errors.serviceType}
  required
/>
```

---

### Textarea

Multi-line text input component.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- All standard textarea HTML attributes

**Usage:**
```tsx
import { Textarea } from '@/components/forms/Textarea';

<Textarea
  label="Description"
  rows={4}
  placeholder="Describe the issue..."
  error={errors.description}
  required
/>
```

---

## Feedback Components

### Loader

Loading spinner component.

**Props:**
- `size`: 'sm' | 'md' | 'lg'

**Usage:**
```tsx
import { Loader, PageLoader } from '@/components/feedback/Loader';

// Inline loader
<Loader size="md" />

// Full page loader
<PageLoader />
```

---

### Rating

Interactive star rating component.

**Props:**
- `value`: number (1-5)
- `onChange`: (value: number) => void
- `readonly`: boolean
- `size`: 'sm' | 'md' | 'lg'
- `showValue`: boolean

**Usage:**
```tsx
import { Rating } from '@/components/feedback/Rating';

// Interactive rating
const [rating, setRating] = useState(5);
<Rating value={rating} onChange={setRating} size="lg" />

// Read-only rating
<Rating value={4.5} readonly showValue />
```

---

### EmptyState

Component for no-data scenarios.

**Props:**
- `icon`: LucideIcon
- `title`: string
- `description`: string
- `action`: { label: string; onClick: () => void }

**Usage:**
```tsx
import { EmptyState } from '@/components/feedback/EmptyState';
import { Briefcase } from 'lucide-react';

<EmptyState
  icon={Briefcase}
  title="No jobs found"
  description="You don't have any active jobs"
  action={{
    label: 'Create Job',
    onClick: () => router.push('/user/search')
  }}
/>
```

---

## Styling Guidelines

### Using Tailwind Classes

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Title
  </h2>
  <p className="text-gray-600">
    Description text
  </p>
</div>
```

### Conditional Classes

Use the `cn()` utility for conditional classes:

```tsx
import { cn } from '@/lib/utils/common';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)}>
  Content
</div>
```

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text */}
</div>
```

---

## Color Palette

### Primary Colors
- `primary-50` to `primary-900`
- Main brand color (Blue)

### Secondary Colors
- `secondary-50` to `secondary-900`
- Accent color (Orange)

### Semantic Colors
- Success: `green-*`
- Warning: `yellow-*`
- Error: `red-*`
- Info: `blue-*`

---

## Icons

Using Lucide React icons:

```tsx
import { User, MapPin, Star, Phone } from 'lucide-react';

<User className="w-5 h-5 text-gray-600" />
<MapPin className="w-4 h-4 text-primary-600" />
<Star className="w-6 h-6 text-yellow-400" />
```

---

## Best Practices

1. **Reuse components** - Don't recreate UI elements
2. **Use TypeScript** - Type all props
3. **Follow naming** - Use PascalCase for components
4. **Keep components small** - Single responsibility
5. **Use Tailwind** - Avoid custom CSS when possible
6. **Make accessible** - Add ARIA labels
7. **Test responsiveness** - Check mobile/tablet/desktop

---

## Creating New Components

### Template

```tsx
import React from 'react';
import { cn } from '@/lib/utils/common';

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  description,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn('base-styles', className)}
      onClick={onClick}
    >
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};
```

### Checklist

- [ ] TypeScript interface for props
- [ ] Proper prop types
- [ ] Default values where needed
- [ ] Tailwind CSS styling
- [ ] Responsive design
- [ ] Accessibility attributes
- [ ] Export from index file
- [ ] Document usage

---

## Component Composition

Build complex UIs by composing simple components:

```tsx
<Card>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">Job Details</h2>
    <Badge variant="success">Active</Badge>
  </div>
  
  <div className="space-y-3">
    <Input label="Title" value={title} onChange={setTitle} />
    <Textarea label="Description" value={desc} onChange={setDesc} />
    <Select label="Service" options={services} />
  </div>
  
  <div className="flex space-x-3 mt-6">
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
    <Button variant="ghost" onClick={handleCancel}>
      Cancel
    </Button>
  </div>
</Card>
```

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
