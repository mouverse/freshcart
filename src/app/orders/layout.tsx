import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View your order history and track deliveries',
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
