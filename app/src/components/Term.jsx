import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Term Parser";
const description = "This is advance implmentation.";
const prefix = `<ReactTextFormat allowedFormats={["Term"]} termDecorator={decorator} terms={[
  "Link",
  "phone",
  "image",
  "Anchor",
  "email",
  "contact",
  "Credit"
]}>`;
const suffix = `</ReactTextFormat>`;

const decorator = (decoratedText, key) => {
  return (
    <mark key={key} className="keyword">
      {decoratedText}
    </mark>
  );
};

const decoratorDemo = `const decorator = (decoratedText, key) => {
  return (
    <mark key={key} className="keyword">
      {decoratedText}
    </mark>
  );
};
`;

const input = () => {
  return (
    <InputFormat
      decoratorDemo={decoratorDemo}
      prefix={prefix}
      content={content}
      suffix={suffix}
    />
  );
};
const output = () => {
  return (
    <div className="output">
      <ReactTextFormat allowedFormats={["Term"]} termDecorator={decorator} terms={[
        "Link",
        "phone",
        "image",
        "Anchor",
        "email",
        "contact",
        "Credit"
      ]}>
        {ReactHtmlParser(content)}
      </ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
