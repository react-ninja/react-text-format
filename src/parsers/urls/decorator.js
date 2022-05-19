import React from "react";

/**
 * urlDecorator is the default decorator which is being used for the
 * formatting of extracted URLs
 * @param  {sring} decoratedText raw url
 * @param  {sring} decoratedHref complete decorated url
 * @param  {sring} linkTarget _blank|_self|_parent|_top
 * @return {react.node}
 */
const urlDecorator = (decoratedHref, decoratedText, linkTarget) => {
  return (
    <a
      href={decoratedHref}
      target={linkTarget}
      rel="noopener"
      className="rtfLink"
    >
      {decoratedText}
    </a>
  );
};

export default urlDecorator;
