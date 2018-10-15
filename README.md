# [react-text-format](#)

React component to parse urls, emails, credit cards, phone in text into clickable links or required format

### Basic

Any link that appears inside the `ReactTextFormat` component will become clickable.

```
<ReactTextFormat>
    Contact me via my gmail.com account
    reacttextformat@gmail.com or call me at
    123.456.7890
</ReactTextFormat>
```

### Advanced

If you're feeling lazy, you can wrap `ReactTextFormat` around anywhere that you want links to become clickable. Even with nested elements, it traverses the tree to find links.

```
<ReactTextFormat>
  <div>Visit our site http://reactninja.com</div>
    <div>React component to parse links urls, emails, credit cards,
    phone in text into required format</div>
    <footer>Shoot Us a message at : reacttextformat@gmail.com</footer>
</ReactTextFormat>
```

Renders to:

Visit our site [reactninja.com](http://www.reactninja.com)

React component to parse links urls, emails, credit cards, phone in text into required format

Shoot Us a message at [reacttextformat@gmail.com](mailto:reacttextformat@gmail.com)

## Installation

```
yarn add react-text-format
```

or

```
npm install react-text-format --save
```

## Usage

```js
import ReactTextFormat from 'react-text-format';

React.render(
  <ReactTextFormat>
    We need your feedback at reacttextformat@gmail.com.
  </ReactTextFormat>,
  document.body,
);
```

## Props

**allowedFormats** (Array)
The allowedFormats attribute specifies the allowed formats which will be allowed to format through react-text-format. Default prop values of allowedFormats are

``['URL', 'Email', 'Phone']``

react-text-format allows the following formats

``['URL', 'Email', 'Phone', 'CreditCard']``

```js
import ReactTextFormat from 'react-text-format';

React.render(
    <ReactTextFormat allowedFormats={['URL', 'Phone']}>
        We need your feedback at http://www.google.com.
    </ReactTextFormat>,
  document.body
);
```


**LinkTarget** (string)
The LinkTarget attribute specifies where to open the linked document (_blank|_self|_parent|_top|framename)

**LinkDecorator**
You can create your own decorator for links and define that as a prop. ReactTextFormat will find the links and will render the links in defined format.

```js
import ReactTextFormat from 'react-text-format';

customLinkDecorator = (href, text, linkTarget, key) => {
    return (
      <a
        href={href}
        key={key}
        target={linkTarget}
        rel="noopener"
        className="customLinkStyle"
      >
        {text}
      </a>
    );
  };

React.render(
  <ReactTextFormat LinkDecorator={customLinkDecorator}>
    We need your feedback at reacttextformat@gmail.com.
  </ReactTextFormat>,
  document.body
);
```

**EmailDecorator**
```js
import ReactTextFormat from 'react-text-format';

customEmailDecorator = (href, text, key) => {
    return (
      <a href={href} key={key} className="customEmailStyle">
        {text}
      </a>
    );
};

React.render(
    <ReactTextFormat EmailDecorator={customEmailDecorator}>
        We need your feedback at reacttextformat@gmail.com.
    </ReactTextFormat>,
  document.body
);
```

**PhoneDecorator**
```js
import ReactTextFormat from 'react-text-format';

customPhoneDecorator = (text, key) => {
    return (
      <a href={`tel:${text}`} key={key} className="customPhoneStyle">
        <i className="fa fa-phone" /> {text}
      </a>
    );
};

React.render(
    <ReactTextFormat PhoneDecorator={customPhoneDecorator}>
        We need your feedback at reacttextformat@gmail.com.
    </ReactTextFormat>,
  document.body
);
```

**CreditCardDecorator**

```js
import ReactTextFormat from 'react-text-format';

customCreditCardDecorator = (text, key) => {
    return (
      <span
        key={key}
        className="customCreditCardStyle"
        onClick={() => {
          console.log('Clicked on Credit Card Component');
        }}
      >
        {text}
      </span>
    );
  };

React.render(
    <ReactTextFormat CreditCardDecorator={customCreditCardDecorator}>
        We need your feedback at reacttextformat@gmail.com.
    </ReactTextFormat>,
  document.body
);
```
