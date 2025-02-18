import {
  Listbox,
  ListboxItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from '@heroui/react';
import { Avatar } from '@heroui/react';
import IconMoreAlt from '@/icons/iconMoreAlt';
import IconTrash from '@/icons/iconTrash';
import { TaskType } from '@task-master/shared';
import dayjs from 'dayjs';
import { useCard } from '@/context/CardContext';

export default function BoardCardList({
  list,
  onDelete,
}: {
  list?: TaskType[];
  onDelete?: (card: TaskType) => void;
}) {
  const { setIsCardModalOpen, setActiveCard } = useCard();

  const handleOpenCard = (card: TaskType) => {
    if (!card) return;

    setActiveCard(card);
    setIsCardModalOpen(true);
  };

  const handleDeleteCard = async (card: TaskType) => {
    if (!card) return;

    if (onDelete) {
      onDelete(card);
      return;
    }
    window.alert(`刪除卡片 card: ${card.id}`);
  };

  return (
    <Listbox
      aria-label="Actions"
      classNames={{
        base: 'flex-1 overflow-auto scrollbar-hide',
        list: 'gap-4 py-4',
      }}
      itemClasses={{
        base: 'shadow-medium p-4',
      }}
    >
      {(list ?? []).map((card, _) => (
        <ListboxItem
          key={card.id}
          textValue={card.title}
          className="h-[104px]"
          onPress={() => handleOpenCard(card)}
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <Avatar
                alt="fffff"
                className="flex-shrink-0"
                size="md"
                src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png"
              />
              <span className="overflow-hidden flex-1 whitespace-nowrap text-ellipsis">
                {card.title}
              </span>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    className="w-6 h-6 min-w-6 min-h-6"
                  >
                    <IconMoreAlt className="w-6 h-6" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit">Edit file</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="flex gap-4 items-center">
              <span className="overflow-hidden flex-1 whitespace-nowrap text-ellipsis">
                {dayjs(card.expired_at).format('YYYY/MM/DD HH:mm')}
              </span>
              <Button
                isIconOnly
                variant="light"
                className="w-6 h-6 min-w-6 min-h-6"
                onPress={() => handleDeleteCard(card)}
              >
                <IconTrash className="w-6 h-6 text-danger" />
              </Button>
            </div>
          </div>
        </ListboxItem>
      ))}
    </Listbox>
  );
}
