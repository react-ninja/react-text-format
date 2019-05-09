import React, { Fragment } from "react";

function inputFormat({ decoratorDemo, prefix, content, suffix }) {
  return (
    <Fragment>
      {decoratorDemo && <code className="decorator">{decoratorDemo}</code>}
      <code className="htmlCode">
        {prefix}
        {content}
        {suffix}
      </code>
    </Fragment>
  );
}

export default inputFormat;
