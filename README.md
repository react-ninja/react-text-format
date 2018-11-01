# react-text-format

> React Component to find and format links, emails, phone numbers and credit cards to required format.

[![NPM](https://img.shields.io/npm/v/react-text-format.svg)](https://www.npmjs.com/package/react-text-format) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Installation

```
yarn add react-text-format
```

or

```
npm install react-text-format --save
```

## Props

|Name  | Type  | Default  |
|---|---|---|
|allowedFormats| Array ``['URL', 'Email', 'Image', 'Phone', 'CreditCard']``| ``['URL', 'Email', 'Phone']`` |
|linkTarget| String (_blank \| _self \| _parent \| _top \| framename)  |  ``_self`` |
|LinkDecorator| React.Node (decoratedHref: string, decoratedText: string, linkTarget: string, key: number) | Output Format: ``<a href="{URL}" target="{target}" rel='noopener' className='rtfLink'> <URL> </a>``  
|EmailDecorator| React.Node (decoratedHref: string, decoratedText: string,key: number)  | Output Format:``<a href="mailto: {EMAIL ADDRESS}" className='rtfEmail'> {EMAIL ADDRESS} </a>``  |
|PhoneDecorator| React.Node (decoratedText: string, key: number)  | Output Format``<a href="tel:{PHONE NUMBER}" className='rtfEmail'> {PHONE NUMBER} </a>``  |
|CreditCardDecorator| React.Node (decoratedText: string, key: number)  | Output Format: ``<span className='rtfCreditCard'> {CREDIT CARD NUMBER} </span>``  |
|ImageDecorator| React.Node (decoratedURL: string, key: number)  | Output Format: ``<img src="{URL OF IMAGE}" rel='noopener' className='rtfImage' />``  |

## Usage

### Basic Implementation
```js
import ReactTextFormat from 'react-text-format';

React.render(
    <ReactTextFormat>
      This is demo link http://www.google.com
      <br/><br/>
      This is demo email <span data-email="email@span.com">jago@yahoo.com</span>
      <br /><br />
      This is demo image https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
      <br /><br />
      This is demo credit Card 5555555555554444
      <br /><br />
      This is demo phone Number 123.456.7890
      <br /><br />
      This is an anchor <a href="http://formatter.com">http://formatter.com</a>;
    </ReactTextFormat>,
  document.body
);
```
###### Output:
![Generated Avatar](https://image.ibb.co/fEgvXf/basic-implementation.png)  


### Advance Implementation
```js
import ReactTextFormat from 'react-text-format';

customLinkDecorator = (
    decoratedHref: string,
    decoratedText: string,
    linkTarget: string,
    key: number
  ): React.Node => {
    return (
      <a
        href={decoratedHref}
        key={key}
        target={linkTarget}
        rel='noopener'
        className='customLink'
      >
        {decoratedText}
      </a>
    )
  }

customImageDecorator = (
    decoratedURL: string,
    key: number
    ): React.Node => {
    return (
      <div>
        <img src={decoratedURL} key={key} rel='noopener' width="100" className='customImage' />
      </div>
)
}

customEmailDecorator = (
    decoratedHref: string,
    decoratedText: string,
    key: number
    ): React.Node => {
    return (
      <a href={decoratedHref} key={key} className='customEmail'>
        {decoratedText}
      </a>
    )
}

customPhoneDecorator = (
    decoratedText: string,
    key: number
    ): React.Node => {
    return (
      <a href={`tel:${decoratedText}`} key={key} className='customPhone'>
        {decoratedText}
      </a>
    )
}

customCreditCardDecorator = (
    decoratedText: string,
    key: number
    ): React.Node => {
    return (
      <i key={key} className='customCreditCard'>
        <b>{decoratedText}</b>
      </i>
    )
}

React.render(
    <ReactTextFormat
          allowedFormats={['URL', 'Email', 'Image', 'Phone', 'CreditCard']}
          LinkDecorator={customLinkDecorator}
          EmailDecorator={customEmailDecorator}
          PhoneDecorator={customPhoneDecorator}
          CreditCardDecorator={customCreditCardDecorator}
          ImageDecorator={customImageDecorator}
          >
            This is demo link http://www.google.com
            <br/><br/>
            This is demo email <span data-email="email@span.com">jago@yahoo.com</span>
            <br /><br />
            This is demo image https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
            <br /><br />
            This is demo credit Card 4111111111111111
            <br /><br />
            This is demo phone Number 123.456.7890
            <br /><br />
            This is an anchor <a href="http://formatter.com">http://formatter.com</a>;
        </ReactTextFormat>,
        document.body
);
```

###### Output:
![Generated Avatar](https://image.ibb.co/iiS2Cf/adv-implementation.png)  
