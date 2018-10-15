import LinkifyIt from 'linkify-it';
import _ from 'lodash';

const SEPARATOR = '(-|\\s+|\\.|\\/|\\\\|\\:|,)*';
const AMERICANEXPRESS = `((?:3[47][0-9]{2}${SEPARATOR}[0-9]{6}(-|\\s+)?[0-9]{5}))`;
const MASTERCARD = `((?:(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}))`;
const VISA = `((?:4[0-9]{3}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})${SEPARATOR}(?:[0-9]{4})?)`;
const DISCOVER = `((?:6(?:011|5[0-9]{2})(?:${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})))`;
const JCB = `(?:(?:2131|1800|35\\d{2}${SEPARATOR}[0-9]{1})${SEPARATOR}[0-9]{3}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})`;
const MAESTROWITHDASH = `(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})`;
const MAESTRO = '(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)\\d{8,15})';
const CC_REGEXES = [
  new RegExp(AMERICANEXPRESS, 'g'),
  new RegExp(MASTERCARD, 'g'),
  new RegExp(VISA, 'g'),
  new RegExp(DISCOVER, 'g'),
  new RegExp(JCB, 'g'),
  new RegExp(MAESTRO, 'g'),
  new RegExp(MAESTROWITHDASH, 'g'),
];
const PHONE_NUMBER_REGEX = new RegExp(
  '[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}',
  'gi',
);
// const SPLIT_SHORTCODES_REGEX = /([^\[\]]|\[\])+/g;
const SPLIT_SHORTCODES_REGEX = /([^\[\]]|\[\])+/g;
export const ENTITY = {
  SHORTCODE_PREFIX: 'SHORTCODE:',
  URL: 'URL',
  CC: 'CreditCard',
  PHONE: 'Phone',
  EMAIL: 'Email',
};

class MatchDecorators {
  content = '';
  urls = [];
  email = [];
  cc = [];
  phone = [];

  createShortcode(entity, id) {
    return `[${ENTITY.SHORTCODE_PREFIX}${entity} key=${id}]`;
  }
  setContent = (content) => {
    this.content = content;
  };

  findURLAndEmail = () => {
    const urls = LinkifyIt().match(this.content);
    _.map(urls, (url, i) => {
      const data = {
        type: url.schema,
        shortcode: '',
        url: url.url,
        title: url.raw,
      };
      switch (url.schema) {
        case 'mailto:':
          data.shortcode = this.createShortcode(
            ENTITY.EMAIL,
            this.email.length,
          );
          this.email.push(data);
          break;
        default:
          data.shortcode = this.createShortcode(ENTITY.URL, this.urls.length);
          this.urls.push(data);
      }
      this.setContent(this.content.replace(url.raw, data.shortcode));
    });
  };

  updateURL = () => {
    const urls = this.urls;
    _.map(urls, (url, i) => {
      let urlString = `<a href="${url.url}">${url.title}</a>`;
      const shortcode = this.createShortcode(ENTITY.URL, i);
      this.setContent(this.content.replace(shortcode, urlString));
    });
  };

  findCreditCards = () => {
    let ccNums = CC_REGEXES.map((regex) => this.content.match(regex));
    ccNums = _.compact(ccNums);
    ccNums = _.uniq(ccNums[0]);
    _.map(ccNums, (cc, i) => {
      const shortcode = this.createShortcode(ENTITY.CC, i);
      this.setContent(this.content.replace(cc, shortcode));
      this.cc.push(cc);
    });
  };

  findPhoneNumbers = () => {
    let phoneNumbers = this.content.match(PHONE_NUMBER_REGEX);
    _.map(phoneNumbers, (phone, i) => {
      const shortcode = this.createShortcode(ENTITY.PHONE, i);
      this.setContent(this.content.replace(phone, shortcode));
      this.phone.push(phone);
    });
  };

  splitMessage = (content) => {
    content = content.match(SPLIT_SHORTCODES_REGEX);
    if (content && content.length > 0) {
      return _.filter(content, (val) => {
        return val && val !== '';
      });
    }
    return null;
  };

  annotate = () => {
    try {
      this.findURLAndEmail();
      this.findCreditCards();
      this.findPhoneNumbers();

      return {
        content: this.splitMessage(this.content),
        urls: this.urls,
        email: this.email,
        cc: this.cc,
        phone: this.phone,
      };
    } catch (e) {
      console.log(e);
    }
  };
}

const formatContent = (msg) => {
  const formatMsg = new MatchDecorators();
  formatMsg.setContent(msg);
  return formatMsg.annotate();
};

export default formatContent;
