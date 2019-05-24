import React, { Component } from "react";

import ReactTextFormat from "react-text-format";

export default class App extends Component {
  customLinkDecorator = (
    decoratedHref: string,
    decoratedText: string,
    linkTarget: string
  ): React.Node => {
    return (
      <a
        href={decoratedHref}
        target={linkTarget}
        rel="noopener"
        className="customLink"
      >
        {decoratedText}
      </a>
    );
  };

  customImageDecorator = (decoratedURL: string): React.Node => {
    return (
      <div>
        <img
          src={decoratedURL}
          rel="noopener"
          width="100"
          className="customImage"
          alt={decoratedURL}
        />
      </div>
    );
  };

  customEmailDecorator = (
    decoratedHref: string,
    decoratedText: string
  ): React.Node => {
    return (
      <a href={decoratedHref} className="customEmail">
        {decoratedText}
      </a>
    );
  };

  customPhoneDecorator = (decoratedText: string): React.Node => {
    return (
      <a href={`tel:${decoratedText}`} className="customPhone">
        {decoratedText}
      </a>
    );
  };

  customCreditCardDecorator = (decoratedText: string): React.Node => {
    return (
      <i className="customCreditCard">
        <b>{decoratedText}</b>
      </i>
    );
  };

  customTermDecorator = (decoratedText: string): React.Node => {
    return <b className="keyword">{decoratedText}</b>;
  };

  getString = `This is demo link http://www.google.com
  This is encoded Link http://go%2Emsn%2Ecom/nl/133942%2Easp
  This is demo email <span data-email="email@span.com">jago@yahoo.com</span>
This is demo image
  https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
  This is demo credit Card 5555555555554444
  This is demo phone phone. Number 123.456.7890
  This is demo phone, Number (212) 555 1212
  This is demo Phone Number (212) 555-1212
  This is demo phone Number 212-555-1212 ext. 101
  This is demo phone Number 212 555 1212 x101
  myname is admin@msn.com
  This is an anchor <a href="http://formatter.com">http://formatter.com</a>`;

  getContent = (): React.Node => (
    <div>
      This is demo link http://www.google.com
      <br />
      This is encoded Link http://go%2Emsn%2Ecom/nl/133942%2Easp
      <br />
      This is demo email <span data-email="email@span.com">jago@yahoo.com</span>
      <br />
      <br />
      This is demo image
      https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
      <br />
      <br />
      This is demo credit Card 5555555555554444
      <br />
      <br />
      This is demo phone Number 123.456.7890 <br />
      This is demo phone Number (212) 555 1212 <br />
      This is demo Phone Number (212) 555-1212 <br />
      This is demo phone Number 212-555-1212 ext. 101 <br />
      This is demo phone Number 212 555 1212 x101 <br />
      <br />
      <br />
      This is an anchor <a href="http://formatter.com">http://formatter.com</a>;
    </div>
  );

  render() {
    return (
      <div>
        <div>
          <h3>Basic Implementation</h3>
          <ReactTextFormat>{this.getContent()}</ReactTextFormat>
        </div>
        <div>
          <h3>Advance Implementation</h3>
          <ReactTextFormat
            allowedFormats={[
              "URL",
              "Email",
              "Image",
              "Phone",
              "CreditCard",
              "Term"
            ]}
            linkDecorator={this.customLinkDecorator}
            emailDecorator={this.customEmailDecorator}
            phoneDecorator={this.customPhoneDecorator}
            creditCardDecorator={this.customCreditCardDecorator}
            imageDecorator={this.customImageDecorator}
            terms={[
              "Link",
              "phone",
              "image",
              "Anchor",
              "email",
              "contact",
              "Credit"
            ]}
            termDecorator={this.customTermDecorator}
          >
            {this.getContent()}
            {this.getString}
          </ReactTextFormat>
        </div>
      </div>
    );
  }
}
