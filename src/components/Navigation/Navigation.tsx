// components/Navigation/Navigation.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEntitiesStore } from '@/stores/useEntitiesStore';

export default function Navigation() {
  const pathname = usePathname();
  const { setCurrentEntity } = useEntitiesStore();

  const navItems = [
    { href: '/products', label: 'Products' },
    { href: '/price-plans', label: 'Price Plans' },
    { href: '/pages', label: 'Pages' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded hover:bg-gray-700 ${
              pathname === item.href ? 'bg-gray-700' : ''
            }`}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => setCurrentEntity(item.href.slice(1) as any)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}