import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Placed Successfully',
  description: 'Your order has been confirmed',
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
