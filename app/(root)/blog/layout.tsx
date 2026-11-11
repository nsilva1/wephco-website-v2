import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Wephco',
  description:
    'Corporate milestones, luxury real estate advisory and investment insights from Wephco.',
};

// The <html> and <body> tags, the navbar and the footer all come from the
// parent layouts, so this layout must not render them again.
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
