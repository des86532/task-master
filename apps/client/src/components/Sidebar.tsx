'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function SidebarButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button isIconOnly aria-label="Like" onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/icons/bars.svg"
          width={24}
          height={24}
          alt="Picture of the author"
        />
      </Button>

      {/* 側邊欄 */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="mb-4 text-2xl font-bold">Sidebar</h2>
        <ul>
          <li>
            <Link
              className="block py-4 text-lg cursor-pointer hover:text-blue-300"
              href="/list"
            >
              List
            </Link>
          </li>
          <li>
            <Link
              className="block py-4 text-lg cursor-pointer hover:text-blue-300"
              href="/board"
            >
              Board
            </Link>
          </li>
        </ul>
      </div>

      {/* 遮罩層（當側邊欄開啟時顯示） */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
