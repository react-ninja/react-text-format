import each from "lodash/each";
import includes from "lodash/includes";
import { ENTITY } from "../config";
import { splitMessage } from "../utils/common";
import UrlScrapper from "../parsers/urls/scrapper";
import EmailScrapper from "../parsers/emails/scrapper";
import ImageScrapper from "../parsers/images/scrapper";
import CreditCardScrapper from "../parsers/creditcards/scrapper";
import PhoneNumberScrapper from "../parsers/phone/scrapper";
import TermsScrapper from "../parsers/terms/scrapper";

const sanitizeContent = (value) => {
    const content = value.split(' ').map(seg => {
      try {
        return decodeURIComponent(seg)
      } catch (error) {
        return seg
      }
    }).join(' ');
  return content;
};

/**
 * scrapeFormats function extract all the formats from content
 * @param  {array} allowedFormats formats which are used to extract from content
 * @param  {string} content        string through which the function needs to find the formats
 * @param  {array} termKeywords   terms which needs to find/extract from content
 */
const scrapeFormats = (allowedFormats, content, termKeywords) => {

  const data = {
    content: sanitizeContent(content),
    urls: [],
    images: [],
    emails: [],
    cc: [],
    phone: [],
    terms: [],
  };
  
  const scrappers = [
    {
      id: ENTITY.URL,
      scrapper: () => UrlScrapper(data.content),
    },
    {
      id: ENTITY.EMAIL,
      scrapper: () => EmailScrapper(data.content),
    },
    {
      id: ENTITY.IMAGE,
      scrapper: () => ImageScrapper(data.content),
    },
    {
      id: ENTITY.CC,
      scrapper: () => CreditCardScrapper(data.content),
    },
    {
      id: ENTITY.PHONE,
      scrapper: () => PhoneNumberScrapper(data.content),
    },
    {
      id: ENTITY.TERM,
      scrapper: () => TermsScrapper(data.content, termKeywords),
    },
  ];
  each(scrappers, ({ id, scrapper }) => {
    if (includes(allowedFormats, id)) {
      Object.assign(data, scrapper());
    }
  });
  data.content = splitMessage(data.content);

  return data;
};

export default scrapeFormats;
