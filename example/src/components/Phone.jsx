import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Phone Parser";
const description = "This is advance implmentation.";
const prefix = `<ReactTextFormat allowedFormats={["Phone"]} phoneDecorator={decorator}>`;
const suffix = `</ReactTextFormat>`;

const decorator = (decoratedText, key) => {
  return (
    <a href={`tel:${decoratedText}`} key={key} className="customPhone">
      {decoratedText}
    </a>
  );
};

const decoratorDemo = `const decorator = (decoratedText, key) => {
    return (
      <a href={\`tel:\${decoratedText}\`} key={key} className="customPhone">
        {decoratedText}
      </a>
    );
  }`;



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
      <ReactTextFormat allowedFormats={["Phone"]} phoneDecorator={decorator}>
        {ReactHtmlParser(content)}
      </ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
