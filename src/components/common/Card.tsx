
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  footer,
  children,
  className,
  hover = false,
  glass = false,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl border border-border p-6 shadow-sm transition-all duration-300",
        hover && "hover:shadow-md hover:translate-y-[-2px]",
        glass && "bg-white/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="flex-shrink-0 mt-1 rounded-lg bg-primary/10 p-2 text-primary">
              {icon}
            </div>
          )}
          <div>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
          </div>
        </div>
      )}
      
      {children}
      
      {footer && (
        <div className="mt-6 pt-4 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};
