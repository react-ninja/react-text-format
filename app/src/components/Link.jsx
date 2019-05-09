import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Link Parser";
const description = "This is advance implmentation.";
const prefix = `<ReactTextFormat allowedFormats={["URL"]} linkDecorator={decorator}>`;
const suffix = `</ReactTextFormat>`;

const decorator = (decoratedHref, decoratedText, linkTarget, key) => {
  return (
    <a
      href={decoratedHref}
      key={key}
      target={linkTarget}
      rel="noopener"
      className="customLink"
    >
      {decoratedText}
    </a>
  );
};

const decoratorDemo = `const decorator = (decoratedHref, decoratedText, linkTarget, key) => {
      return (
        <a
          href={decoratedHref}
          key={key}
          target={linkTarget}
          rel="noopener"
          className="customLink"
        >
          {decoratedText}
        </a>
      );
    };`;

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
      <ReactTextFormat allowedFormats={["URL"]} linkDecorator={decorator}>
        {ReactHtmlParser(content)}
      </ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
