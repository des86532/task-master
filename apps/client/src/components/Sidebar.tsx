'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const routes = [
    { name: 'List', href: '/list' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Chat', href: '/chat' },
    { name: 'Setting', href: '/setting' },
  ];

  return (
    <div
      className={`h-full w-64 bg-white text-gray-800 transform transition-transform duration-300 ease-in-out z-50`}
    >
      <ul>
        {routes.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index}>
              <Link
                className={`block p-3 text-lg cursor-pointer rounded-lg ${
                  isActive ? 'bg-custom text-default-500' : ''
                }`}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
