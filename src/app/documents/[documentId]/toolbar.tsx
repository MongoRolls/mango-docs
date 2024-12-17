'use client';
import { LucideIcon, Undo2Icon, Redo2Icon, PrinterIcon, SpellCheckIcon, BoldIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/store/use-editor-store';
import { useRef } from 'react';
interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

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
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
        isActive: editor?.isActive('bold')
      }
    ]
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
