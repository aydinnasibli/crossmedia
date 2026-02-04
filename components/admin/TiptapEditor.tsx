"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("bold") ? "bg-gray-300 dark:bg-gray-600 font-bold" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("italic") ? "bg-gray-300 dark:bg-gray-600 italic" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-300 dark:bg-gray-600 font-bold"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        H2
      </button>
       <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("heading", { level: 3 })
            ? "bg-gray-300 dark:bg-gray-600 font-bold"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("bulletList") ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("orderedList") ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        1. List
      </button>
       <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded text-sm ${
          editor.isActive("blockquote") ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        "" Quote
      </button>
    </div>
  );
};

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Image.configure({
            inline: true,
            allowBase64: true,
        })
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
     editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert mx-auto focus:outline-none min-h-[300px] p-4 max-w-none',
      },
    },
  });

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
