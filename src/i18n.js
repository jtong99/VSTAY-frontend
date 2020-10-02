const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['vi'],
  localeSubpaths: {
    en: 'en',
    vi: 'vi',
  },
  keySeparator: false,
});
