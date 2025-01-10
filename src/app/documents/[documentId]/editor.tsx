'use client'

import { ColorHighlighter } from '@/extensions/color-highligher'
import { FontSizeExtension } from '@/extensions/font-size'
import { LintHeightExtension } from '@/extensions/lint-height'
import { SmilieReplacer } from '@/extensions/smilie-replacer'
import { useEditorStore } from '@/store/use-editor-store'
// import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'

import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
import ImageResize from 'tiptap-extension-resize-image'
import Rule from './rule'

export function Editor() {
  const { setEditor } = useEditorStore()

  const lowlight = createLowlight(all)

  // This is only an example, all supported languages are already loaded above
  // but you can also register only specific languages to reduce bundle-size
  lowlight.register('html', html)
  lowlight.register('css', css)
  lowlight.register('js', js)
  lowlight.register('ts', ts)

  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor)
    },
    onDestroy: () => {
      setEditor(null)
    },
    onUpdate: ({ editor }) => {
      setEditor(editor)
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor)
    },
    onTransaction: ({ editor }) => {
      setEditor(editor)
    },
    onBlur: ({ editor }) => {
      setEditor(editor)
    },
    onFocus: ({ editor }) => {
      setEditor(editor)
    },
    onContentError: ({ editor }) => {
      setEditor(editor)
    },
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class:
          'focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    // 这里item,List顺序不能颠倒,否则影响嵌套
    extensions: [
      StarterKit,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Image,
      ImageResize,
      Typography,
      Underline,
      FontFamily,
      TextStyle,
      Heading,
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      Link.configure({
        openOnClick: true, // 不跳转新页面
        autolink: true, // 自动识别链接
        defaultProtocol: 'https', // 更安全的协议
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSizeExtension,
      LintHeightExtension.configure(),
      ColorHighlighter,
      SmilieReplacer,
      // CodeBlock,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
  })

  return (
    <div className="size-full overflow-x-auto bg-[#FAFBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Rule />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
