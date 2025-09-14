// app/page.tsx
'use client';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Panel</h1>
      <p className="text-lg">
        Выберите раздел в меню: <strong>Products</strong>, <strong>Price Plans</strong> или <strong>Pages</strong>.
      </p>
        <div className="bg-blue-500 text-white p-10 rounded-lg">
        Tailwind работает 🎉
        </div>
    </div>
  );
}
