// app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to all-data page
  redirect('/all-data');
}