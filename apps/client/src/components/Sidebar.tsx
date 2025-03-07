'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button, Avatar } from '@heroui/react';
import Link from 'next/link';

export default function SidebarButton() {
  const routes = [
    { name: 'List', href: '/list' },
    { name: 'Board', href: '/board' },
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
          return (
            <li key={index}>
              <Link
                className="block p-3 text-lg cursor-pointer hover:bg-[#E7EEF2] rounded-lg"
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
