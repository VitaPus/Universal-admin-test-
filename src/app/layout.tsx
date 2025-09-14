import './globals.css';
import Navigation from '@/components/Navigation/Navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <Navigation />
        <main className="p-6 sm:p-10">{children}</main>
      </body>
    </html>
  );
}
