import { Avatar } from '@nextui-org/react';

export default function Footer() {
  return (
    <footer className="flex justify-end px-5 py-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Avatar
          alt="fffff"
          className="flex-shrink-0"
          size="sm"
          src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
          key={index}
        />
      ))}
    </footer>
  );
}
