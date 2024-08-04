import parse from "html-react-parser";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const parseJsonToHtml = (json) => {
  return parse(generateHTML(json, [Bold, Document, Italic, Paragraph, Text]));
};

export default parseJsonToHtml;
