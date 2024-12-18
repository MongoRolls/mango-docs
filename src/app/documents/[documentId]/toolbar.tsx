'use client';
import {
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquareIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon
} from 'lucide-react';
import { type Level } from '@tiptap/extension-heading';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/store/use-editor-store';
import { useRef } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: '正文', value: 0, fontSize: '16px' },
    { label: '标题一', value: 1, fontSize: '36px' },
    { label: '标题二', value: 2, fontSize: '24px' },
    { label: '标题三', value: 3, fontSize: '20px' },
    { label: '标题四', value: 4, fontSize: '18px' },
    { label: '标题五', value: 5, fontSize: '16px' }
  ];

  const getCurrentHeadingLevel = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive(`heading`, { level: level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal text';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'h-7 min-w-7 shrink-0  flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
          )}
        >
          <span className="truncate">{getCurrentHeadingLevel()}</span>
          <ChevronDownIcon className="size-4 shrink-0 ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              (value === 0 && !editor?.isActive('heading')) ||
                (value !== 0 && editor?.isActive('heading', { level: value }))
                ? 'bg-neutral-200/80'
                : ''
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().setHeading({ level: value as Level }).run();
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Poppins', value: 'Poppins' }
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'h-7 w-[120px] shrink-0  flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
          )}
        >
          <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>
          <ChevronDownIcon className="size-4 shrink-0 ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const countRef = useRef<number>(0);
  countRef.current++;
  const { editor } = useEditorStore();
  console.log('toolbar: ', { editor }, countRef.current);

  const sections: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
        isActive: false
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
        isActive: false
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
        isActive: false
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true');
        },
        isActive: false
      }
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        }
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        }
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        }
      }
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquareIcon,
        isActive: false,
        onClick: () => {
          // editor?.chain().focus().toggleComment().run();
        }
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        }
      },
      {
        label: 'Remove Format',
        icon: RemoveFormattingIcon,
        isActive: false,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        }
      }
    ]
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
