import { useState } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useCard } from '@/context/CardContext';

export default function FloatingIcons() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(3);
  const { setIsNewCardModalOpen } = useCard();

  return (
    <div className="flex fixed right-4 top-1/2 z-10 flex-col items-center rounded-full -translate-y-1/2">
      <div
        className={`flex overflow-hidden relative flex-col gap-4 p-2 w-14 rounded-full duration-500 ease-in-out bg-slate-500 transition-height`}
        style={{
          height: isOpen ? `calc(${count * 56}px)` : '56px',
        }}
      >
        <Button
          isIconOnly
          radius="full"
          size="md"
          aria-label="Like"
          className="flex-shrink-0"
          onClick={() => setIsNewCardModalOpen(true)}
        >
          <Image
            src="/icons/plus.svg"
            width={24}
            height={24}
            alt="Picture of the author"
          />
        </Button>
        <Button
          isIconOnly
          radius="full"
          size="md"
          aria-label="Like"
          className="flex-shrink-0"
          onClick={() => setIsNewCardModalOpen(true)}
        >
          <Image
            src="/icons/plus.svg"
            width={24}
            height={24}
            alt="Picture of the author"
          />
        </Button>
        <Button
          isIconOnly
          radius="full"
          size="md"
          aria-label="Like"
          className="flex-shrink-0"
          onClick={() => setIsNewCardModalOpen(true)}
        >
          <Image
            src="/icons/plus.svg"
            width={24}
            height={24}
            alt="Picture of the author"
          />
        </Button>
      </div>
      {count > 1 && (
        <Button
          isIconOnly
          radius="full"
          size="sm"
          aria-label="Like"
          className="bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src="/icons/angle-down.svg"
            width={20}
            height={20}
            alt="Picture of the author"
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </Button>
      )}
    </div>
  );
}
