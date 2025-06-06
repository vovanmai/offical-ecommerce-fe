/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoRgNARATAdAzPCkQAYAsAOKBWAbNjbbAdhChVwE45Ls1i1cM0U5yVjKQ0eoRckEAG4BLJCjCgw4cBJkBdSAEMlAMwAm5NBHlA==
 */
"use client";

import { FileLoader } from 'ckeditor5'; // Import các kiểu cần thiết từ CKEditor 5
import { createUpload } from "@/api/admin/common";
import translations from "ckeditor5/translations/vi.js";
import "ckeditor5/ckeditor5.css";

// Hàm plugin CustomUploadAdapterPlugin với TypeScript
function CustomUploadAdapterPlugin(editor: any): void {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
    return new CustomUploadAdapter(loader);
  };
}

// Lớp CustomUploadAdapter với TypeScript
class CustomUploadAdapter {
  private loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  async upload() {
	try {
		const file = await this.loader.file
		if (!file) {
			return
		}
		const formData = new FormData();
    	formData.append('file', file);
    	formData.append('save', '0');
		const { data } = await createUpload(formData)
		console.log(data)
		return {
			default: data.url
		}
	} catch(e) {
		console.log(e)
		return
	}
}

  abort(): void {
    // Logic hủy nếu cần
    // Ví dụ: Nếu bạn sử dụng AbortController, bạn có thể thêm vào đây
  }
}

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Bookmark,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  WordCount,
} from "ckeditor5";
import { useState } from 'react';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = "GPL"; // or <YOUR_LICENSE_KEY>.

export default function MyCKEditor({ onChange, value }: { onChange: (data: string) => void, value: any }) {
	const editorConfigs: any = {
	toolbar: {
	  items: [
		"sourceEditing",
		"showBlocks",
		"findAndReplace",
		"textPartLanguage",
		"|",
		"heading",
		"style",
		"|",
		"fontSize",
		"fontFamily",
		"fontColor",
		"fontBackgroundColor",
		"|",
		"bold",
		"italic",
		"underline",
		"strikethrough",
		"subscript",
		"superscript",
		"code",
		"removeFormat",
		"|",
		"specialCharacters",
		"horizontalLine",
		"pageBreak",
		"link",
		"bookmark",
		"insertImage",
		"insertImageViaUrl",
		"mediaEmbed",
		"insertTable",
		"highlight",
		"blockQuote",
		"codeBlock",
		"htmlEmbed",
		"|",
		"alignment",
		"|",
		"bulletedList",
		"numberedList",
		"todoList",
		"outdent",
		"indent",
	  ],
	  shouldNotGroupWhenFull: true,
	},
	plugins: [
	  Alignment,
	  Autoformat,
	  AutoImage,
	  AutoLink,
	  Autosave,
	  BalloonToolbar,
	  BlockQuote,
	  BlockToolbar,
	  Bold,
	  Bookmark,
	  Code,
	  CodeBlock,
	  Essentials,
	  FindAndReplace,
	  FontBackgroundColor,
	  FontColor,
	  FontFamily,
	  FontSize,
	  FullPage,
	  GeneralHtmlSupport,
	  Heading,
	  Highlight,
	  HorizontalLine,
	  HtmlEmbed,
	  ImageBlock,
	  ImageCaption,
	  ImageEditing,
	  ImageInline,
	  ImageInsert,
	  ImageInsertViaUrl,
	  ImageResize,
	  ImageStyle,
	  ImageTextAlternative,
	  ImageToolbar,
	  ImageUpload,
	  ImageUtils,
	  Indent,
	  IndentBlock,
	  Italic,
	  Link,
	  LinkImage,
	  List,
	  ListProperties,
	  Markdown,
	  MediaEmbed,
	  Mention,
	  PageBreak,
	  Paragraph,
	  PasteFromMarkdownExperimental,
	  PasteFromOffice,
	  RemoveFormat,
	  ShowBlocks,
	  SimpleUploadAdapter,
	  SourceEditing,
	  SpecialCharacters,
	  SpecialCharactersArrows,
	  SpecialCharactersCurrency,
	  SpecialCharactersEssentials,
	  SpecialCharactersLatin,
	  SpecialCharactersMathematical,
	  SpecialCharactersText,
	  Strikethrough,
	  Style,
	  Subscript,
	  Superscript,
	  Table,
	  TableCaption,
	  TableCellProperties,
	  TableColumnResize,
	  TableProperties,
	  TableToolbar,
	  TextPartLanguage,
	  TextTransformation,
	//   Title,
	  TodoList,
	  Underline,
	  WordCount,
	  CustomUploadAdapterPlugin,
	],
	balloonToolbar: [
	  "bold",
	  "italic",
	  "|",
	  "link",
	  "insertImage",
	  "|",
	  "bulletedList",
	  "numberedList",
	],
	blockToolbar: [
	  "fontSize",
	  "fontColor",
	  "fontBackgroundColor",
	  "|",
	  "bold",
	  "italic",
	  "|",
	  "link",
	  "insertImage",
	  "insertTable",
	  "|",
	  "bulletedList",
	  "numberedList",
	  "outdent",
	  "indent",
	],
	fontFamily: {
	  supportAllValues: true,
	},
	fontSize: {
	  options: [10, 12, 14, "default", 18, 20, 22],
	  supportAllValues: true,
	},
	heading: {
	  options: [
		{
		  model: "paragraph",
		  title: "Paragraph",
		  class: "ck-heading_paragraph",
		},
		{
		  model: "heading1",
		  view: "h1",
		  title: "Heading 1",
		  class: "ck-heading_heading1",
		},
		{
		  model: "heading2",
		  view: "h2",
		  title: "Heading 2",
		  class: "ck-heading_heading2",
		},
		{
		  model: "heading3",
		  view: "h3",
		  title: "Heading 3",
		  class: "ck-heading_heading3",
		},
		{
		  model: "heading4",
		  view: "h4",
		  title: "Heading 4",
		  class: "ck-heading_heading4",
		},
		{
		  model: "heading5",
		  view: "h5",
		  title: "Heading 5",
		  class: "ck-heading_heading5",
		},
		{
		  model: "heading6",
		  view: "h6",
		  title: "Heading 6",
		  class: "ck-heading_heading6",
		},
	  ],
	},
	htmlSupport: {
	  allow: [
		{
		  name: /^.*$/,
		  styles: true,
		  attributes: true,
		  classes: true,
		},
	  ],
	},
	image: {
	  toolbar: [
		"toggleImageCaption",
		"imageTextAlternative",
		"|",
		"imageStyle:inline",
		"imageStyle:wrapText",
		"imageStyle:breakText",
		"|",
		"resizeImage",
	  ],
	},
	initialData: value,
	language: "vi",
	licenseKey: LICENSE_KEY,
	link: {
	  addTargetToExternalLinks: true,
	  defaultProtocol: "https://",
	  decorators: {
		toggleDownloadable: {
		  mode: "manual",
		  label: "Downloadable",
		  attributes: {
			download: "file",
		  },
		},
	  },
	},
	list: {
	  properties: {
		styles: true,
		startIndex: true,
		reversed: true,
	  },
	},
	mention: {
	  feeds: [
		{
		  marker: "@",
		  feed: [
			/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
		  ],
		},
	  ],
	},
	menuBar: {
	  isVisible: true,
	},
	placeholder: "",
	style: {
	  definitions: [
		{
		  name: "Article category",
		  element: "h3",
		  classes: ["category"],
		},
		{
		  name: "Title",
		  element: "h2",
		  classes: ["document-title"],
		},
		{
		  name: "Subtitle",
		  element: "h3",
		  classes: ["document-subtitle"],
		},
		{
		  name: "Info box",
		  element: "p",
		  classes: ["info-box"],
		},
		{
		  name: "Side quote",
		  element: "blockquote",
		  classes: ["side-quote"],
		},
		{
		  name: "Marker",
		  element: "span",
		  classes: ["marker"],
		},
		{
		  name: "Spoiler",
		  element: "span",
		  classes: ["spoiler"],
		},
		{
		  name: "Code (dark)",
		  element: "pre",
		  classes: ["fancy-code", "fancy-code-dark"],
		},
		{
		  name: "Code (bright)",
		  element: "pre",
		  classes: ["fancy-code", "fancy-code-bright"],
		},
	  ],
	},
	table: {
	  contentToolbar: [
		"tableColumn",
		"tableRow",
		"mergeTableCells",
		"tableProperties",
		"tableCellProperties",
	  ],
	},
	translations: [translations],
  }

  return (
    <CKEditor
		editor={ClassicEditor}
		config={editorConfigs}
		data={value}
		onChange={(event, editor) => {
			const data = editor.getData(); // Lấy nội dung từ editor
			onChange(data);
		}}
		onReady={(editor) => {
		}}
	/>
  );
}
