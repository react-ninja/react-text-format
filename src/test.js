import ReactTextFormat from './'
import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Test Anchor', () => {
  it('Test Single Anchor', () => {
    const component = (
      <ReactTextFormat>
        This is demo link http://www.google.com
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('a.rtfLink')).to.have.lengthOf(1)
  })

  it('Test Encoded URL', () => {
    const component = (
      <ReactTextFormat>
        This is encoded Link http://go%2Emsn%2Ecom/nl/133942%2Easp
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('a.rtfLink')).to.have.lengthOf(1)
  })

  it('Test Multiple Anchor', () => {
    const component = (
      <ReactTextFormat allowedFormats={['URL']}>
        This is demo link http://www.google.com
        <br />
        This is demo link http://www.msn.com
        <br />
        This is an anchor{' '}
        <a href='http://formatter.com'>http://formatter.com</a>
          This is demo link http://www.google.com and emails  www.google.com  is  google.com abc@gmail.com https://google.com ftp://ftp.xyz.com
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('a')).to.have.lengthOf(8)
    expect(wrapper.find('a.rtfLink')).to.have.lengthOf(7)
  })
})

describe('Test Email', () => {
  it('Test Single Email', () => {
    const component = (
      <ReactTextFormat>This is demo email admin@yahoo.com</ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('a.rtfEmail')).to.have.lengthOf(1)
  })

  it('Test Multiple Email', () => {
    const component = (
      <ReactTextFormat>
        This is demo email crazy@magnum.com
        <br />
        This is demo email santorus@wolf.com
        <br />
        http://gmail.com yahoo.com www.ebay.com https://msg.com
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('a.rtfEmail')).to.have.lengthOf(2)
  })
})

describe('Test Image', () => {
  it('Image should not be rendered', () => {
    const component = (
      <ReactTextFormat allowedFormats={['Url']}>
        This is demo image url
        https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('img.rtfImage')).to.have.lengthOf(0)
  })
  it('Test Single Image', () => {
    const component = (
      <ReactTextFormat allowedFormats={['Image']}>
        This is demo image url
        http://gmail.com yahoo.com www.ebay.com https://msg.com
        https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('img.rtfImage')).to.have.lengthOf(1)
  })

  it('Test Multiple Image', () => {
    const component = (
      <ReactTextFormat allowedFormats={['Image']}>
        This is demo email
        https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114350-unsplash.jpg
        <br />
        This is demo email
        https://preview.ibb.co/hqhoyA/lexie-barnhorn-1114351-unsplash.jpg
        <br />
        http://gmail.com yahoo.com www.ebay.com https://msg.com
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('img.rtfImage')).to.have.lengthOf(2)
  })
})

describe('Test Phone Number', () => {
  it('Test Multiple Phone Formats', () => {
    const component = (
      <ReactTextFormat allowedFormats={['Phone']}>
        This is contact Number 2125551212. In this example, we will use this for
        demo.
        <br />
        This is demo phone Number 123.456.7890 <br />
        This is demo phone Number (212) 555 1212 <br />
        This is demo phone Number (212) 555-1212 <br />
        This is demo phone Number 212-555-1212 ext. 101 <br />
        This is demo phone Number 212 555 1212 x101 <br />
        <br />
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('a.rtfPhone')).to.have.lengthOf(6)
  })
})

describe('Test Credit Card', () => {
  it('Test Single Credit Card', () => {
    const component = (
      <ReactTextFormat allowedFormats={['CreditCard']}>
        This is demo credit Card 5555555555554444
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('span.rtfCreditCard')).to.have.lengthOf(1)
  })

  it('Test Multiple  Credit Card', () => {
    const component = (
      <ReactTextFormat allowedFormats={['CreditCard']}>
        MasterCard 5555555555554444
        <br />
        MasterCard 5105105105105100
        <br />
        Visa 4111111111111111
        <br />
        Visa 4012888888881881
        <br />
        Discover 6011111111111117
        <br />
        Discover 6011000990139424
        <br />
        JCB 3530111333300000
        <br />
        JCB 3566002020360505
        <br />
        AMEericanExpress 378282246310005
        <br />
        AMEericanExpress 371449635398431
        <br />
        <br />
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('span.rtfCreditCard')).to.have.lengthOf(10)
  })
})

describe('Test Terms', () => {
  it('Test Single Term', () => {
    const component = (
      <ReactTextFormat allowedFormats={['Term']} terms={['demo']}>
        This is demo credit Card 5555555555554444
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('span.rtfTerm')).to.have.lengthOf(1)
  })

  it('Test Multiple  Credit Card', () => {
    const component = (
      <ReactTextFormat
        allowedFormats={['Term']}
        terms={['demo', 'credit', 'card', 'phone', 'undefined']}
      >
        This is demo credit Card, This is my demo phone Number
      </ReactTextFormat>
    )

    const wrapper = shallow(component)
    expect(wrapper.find('span.rtfTerm')).to.have.lengthOf(5)
  })
})
