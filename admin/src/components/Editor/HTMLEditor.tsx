/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { htmlToMarkdown } from './Parser';

import 'react-quill/dist/quill.snow.css';

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  k: string;
  handleChange: (key:string, value: string) => void
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['clean'],
];

export default function HTMLEditor(props: EditorProps) {
  const [value, setValue] = useState<string>(props.value || '');
  const reactQuillRef = useRef<ReactQuill>(null);

  const onChange = (content: string) => {
    setValue(content);
    props.handleChange(props.k, content);

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      placeholder="Start writing..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
        // 'emoji-toolbar': false,
        // 'emoji-textarea': false,
        // 'emoji-shortname': false,
      }}
      value={value}
      onChange={onChange}
    />
  );
}
