import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Credit Card Number Parser";
const description = "This is advance implmentation.";
const prefix = `<ReactTextFormat allowedFormats={["CreditCard"]} creditCardDecorator={decorator}>`;
const suffix = `</ReactTextFormat>`;

const decorator = (decoratedText, key) => {
    return (
      <i key={key} className="customCreditCard">
        <b>{decoratedText}</b>
      </i>
    );
};

const decoratorDemo = `const decorator = (decoratedText, key) => {
    return (
      <i key={key} className="customCreditCard">
        <b>{decoratedText}</b>
      </i>
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
      <ReactTextFormat allowedFormats={["CreditCard"]} creditCardDecorator={decorator}>
        {ReactHtmlParser(content)}
      </ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
