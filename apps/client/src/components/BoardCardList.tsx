import { Listbox, ListboxItem } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import IconMoreAlt from '@/icons/iconMoreAlt';
import IconTrash from '@/icons/iconTrash';

export default function BoardCardList() {
  return (
    <Listbox
      aria-label="Actions"
      onAction={(key) => alert(key)}
      classNames={{
        list: 'gap-4 py-4',
      }}
      itemClasses={{
        base: 'shadow-medium p-4',
      }}
    >
      <ListboxItem key="new">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Avatar
              alt="fffff"
              className="flex-shrink-0"
              size="md"
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
            />
            <span className="overflow-hidden flex-1 whitespace-nowrap text-ellipsis">
              title
            </span>
            <IconMoreAlt className="w-6 h-6" />
          </div>
          <div className="flex gap-4 items-center">
            <span className="overflow-hidden flex-1 whitespace-nowrap text-ellipsis">
              time
            </span>
            <IconTrash className="w-6 h-6 text-danger" />
          </div>
        </div>
      </ListboxItem>
    </Listbox>
  );
}
