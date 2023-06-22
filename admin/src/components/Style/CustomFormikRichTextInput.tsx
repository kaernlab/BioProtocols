import React from 'react';
import { useField } from 'formik';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorToolbar = {
  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'remove', 'history'],
  fontSize: {
    className: 'lato',
  },
  blockType: {
    className: 'lato',
  },
  colorPicker: {
    popupClassName: 'lato',
  },
};

function CustomFormikRichTextInput({ name }: { name: string }) {
  const [field, , helpers] = useField<EditorState>(name);

  return (
    <Editor
      toolbar={EditorToolbar}
      wrapperStyle={{
        border: '1px solid #d6d6d6',
        padding: 10,
        borderRadius: 10,
      }}
      toolbarStyle={{
        border: 0,
        borderBottom: '1px solid #d6d6d6',
      }}
      editorState={field.value}
      onEditorStateChange={(value) => helpers.setValue(value)}
      onBlur={() => helpers.setTouched(true)}
    />
  );
}

export default CustomFormikRichTextInput;
