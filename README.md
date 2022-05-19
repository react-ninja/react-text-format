# react-text-format

> React Component to find and parse links, emails, phone numbers, image's URL, credit cards and keywords to required format.

[![NPM](https://img.shields.io/npm/v/react-text-format.svg)](https://www.npmjs.com/package/react-text-format) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 
[![Hire me](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue)](https://www.linkedin.com/in/ahsanbilal27/) 


__[View live demo here](https://react-ninja.github.io/react-text-format/)__

## Installation

```
yarn add react-text-format
```

or

```
npm install react-text-format --save
```

### Basic Usage
```js
import ReactTextFormat from 'react-text-format';

React.render(
    <ReactTextFormat>
      This is demo link http://www.google.com
      This is demo email <span data-email="miller@yahoo.com">miller@yahoo.com</span>

      This is demo image https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg

      This is demo credit Card 5555555555554444
      This is demo phone Number 123.456.7890
      This is demo phone Number (212) 555 1212
      This is demo phone Number (212) 555-1212
      This is demo phone Number 212-555-1212 ext. 101
      This is demo phone Number 212 555 1212 x101

      This is an anchor <a href="http://formatter.com">http://formatter.com</a>;
    </ReactTextFormat>,
  document.body
);
```
###### Output:
![Generated Avatar](https://image.ibb.co/bWcDs0/1-0-4-basic.png)  




### Advance Usage
```js
import ReactTextFormat from 'react-text-format';

customLinkDecorator = (
    decoratedHref: string,
    decoratedText: string,
    linkTarget: string
  ): React.Node => {
    return (
      <a
        href={decoratedHref}

        target={linkTarget}
        rel='noopener'
        className='customLink'
      >
        {decoratedText}
      </a>
    )
  }

customImageDecorator = (
    decoratedURL: string
    ): React.Node => {
    return (
      <div>
        <img src={decoratedURL}  rel='noopener' width="100" className='customImage' />
      </div>
)
}

customEmailDecorator = (
    decoratedHref: string,
    decoratedText: string
    ): React.Node => {
    return (
      <a href={decoratedHref}  className='customEmail'>
        {decoratedText}
      </a>
    )
}

customPhoneDecorator = (
    decoratedText: string
    ): React.Node => {
    return (
      <a href={`tel:${decoratedText}`} className='customPhone'>
        {decoratedText}
      </a>
    )
}

customCreditCardDecorator = (
    decoratedText: string
    ): React.Node => {
    return (
      <i  className='customCreditCard'>
        <b>{decoratedText}</b>
      </i>
    )
}

customTermDecorator = (decoratedText: string): React.Node => {
  return (
    <b  className="keyword">
      {decoratedText}
    </b>
  );
};

React.render(
    <ReactTextFormat
          allowedFormats={['URL', 'Email', 'Image', 'Phone', 'CreditCard']}
          linkDecorator={customLinkDecorator}
          emailDecorator={customEmailDecorator}
          phoneDecorator={customPhoneDecorator}
          creditCardDecorator={customCreditCardDecorator}
          imageDecorator={customImageDecorator}
          terms={["Link", "phone", "image", "Anchor", "email", "Credit"]}
          >
            This is demo link http://www.google.com
            This is encoded Link http://go%2Emsn%2Ecom/nl/133942%2Easp
            This is demo email <span data-email="miller@yahoo.com">miller@yahoo.com</span>

            This is demo image
            https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg

            This is demo credit Card 5555555555554444

            This is demo phone Number 123.456.7890
            This is demo phone Number (212) 555 1212
            This is demo Phone Number (212) 555-1212
            This is demo phone Number 212-555-1212 ext. 101
            This is demo phone Number 212 555 1212 x101

            This is an anchor <a href="http://formatter.com">http://formatter.com</a>;
        </ReactTextFormat>,
        document.body
);
```

###### Output:
![Generated Avatar](https://i.ibb.co/r67P3JC/advance-react-text-format.png)  



## Props

|Name  | Type  | Default  |
|---|---|---|
|allowedFormats| Array ``['URL', 'Email', 'Image', 'Phone', 'CreditCard', 'Term']``| ``['URL', 'Email', 'Phone', 'Term']`` |
|linkTarget| String (_blank \| _self \| _parent \| _top \| framename)  |  ``_self`` |
|terms| Array of strings  |  [] |
|linkDecorator| React.Node (decoratedHref: string, decoratedText: string, linkTarget: string) | Output Format: ``<a href="{URL}" target="{target}" rel='noopener' className='rtfLink'> <URL> </a>``  
|emailDecorator| React.Node (decoratedHref: string, decoratedText: string)  | Output Format:``<a href="mailto: {EMAIL ADDRESS}" className='rtfEmail'> {EMAIL ADDRESS} </a>``  |
|phoneDecorator| React.Node (decoratedText: string)  | Output Format``<a href="tel:{PHONE NUMBER}" className='rtfEmail'> {PHONE NUMBER} </a>``  |
|creditCardDecorator| React.Node (decoratedText: string)  | Output Format: ``<span className='rtfCreditCard'> {CREDIT CARD NUMBER} </span>``  |
|imageDecorator| React.Node (decoratedURL: string)  | Output Format: ``<img src="{URL OF IMAGE}" rel='noopener' className='rtfImage' />``  |
|termDecorator| React.Node (decoratedText: string)  | Output Format: ``<span  className='rtfTerm'>{decoratedText}</span>``  |
