import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import { useCard } from '@/context/CardContext';

export default function Footer() {
  const { setIsNewCardModalOpen } = useCard();

  return (
    <footer className="flex justify-between px-5 py-4">
      <Button
        isIconOnly
        radius="full"
        size="sm"
        aria-label="Like"
        className="flex-shrink-0 md:hidden"
        onPress={() => setIsNewCardModalOpen(true)}
      >
        <Image
          src="/icons/plus.svg"
          width={20}
          height={20}
          alt="Picture of the author"
        />
      </Button>
      <div className="flex justify-end w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <Avatar
            alt="fffff"
            className="flex-shrink-0"
            size="sm"
            src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
            key={index}
          />
        ))}
      </div>
    </footer>
  );
}
