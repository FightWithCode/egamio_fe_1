import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Alignment,
	AutoImage,
	Autosave,
  Base64UploadAdapter,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	HorizontalLine,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
  Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	Paragraph,
	SimpleUploadAdapter,
	Strikethrough,
	TodoList,
	Underline
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './editorDarkMode.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL';

export default function Editor({ onChange, name, value }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
			editorConfig: {
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'|',
						'horizontalLine',
						'link',
						'insertImage',
						'blockQuote',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
            'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					AutoImage,
					Autosave,
          Base64UploadAdapter,
					BlockQuote,
					Bold,
					Essentials,
					Heading,
					HorizontalLine,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
          Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					Paragraph,
					SimpleUploadAdapter,
					Strikethrough,
					TodoList,
					Underline
				],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				image: {
					toolbar: [
						'toggleImageCaption',
						'imageTextAlternative',
						'|',
						'imageStyle:inline',
						'imageStyle:wrapText',
						'imageStyle:breakText',
						'|',
						'resizeImage'
					]
				},
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				placeholder: 'Type or paste your content here!'
			}
		};
	}, [isLayoutReady]);

  return (
    <div ref={editorRef}>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} onChange={onChange} name={name} value={value} />}</div>
  );
}
