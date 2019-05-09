import React from "react";
import ReactHtmlParser from "react-html-parser";
import ReactTextFormat from "react-text-format";
import { content } from "../config";
import InputFormat from "./inputFormat";

const title = "Basic Implementation";
const description = "This is basic implmentation.";
const prefix = `<ReactTextFormat>`;
const suffix = `</ReactTextFormat>`;

const input = () => {
  return (
    <InputFormat
      prefix={prefix}
      content={content}
      suffix={suffix}
    />
  );
};
const output = () => {
  return (
    <div className="output">
      <ReactTextFormat> {ReactHtmlParser(content)}</ReactTextFormat>
    </div>
  );
};

export const config = { title, description, input, output };
