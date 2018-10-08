'use strict';

const needle = require('needle');
const cheerio = require('cheerio');

const input = process.stdin;

input.on('data', (data) => {

  let url = 'http://sentence.yourdictionary.com/';
  url += data;
  needle.get(url, (err, res) => {

    const $ = cheerio.load(res.body);

    let sentences = $('.li_content').text();

    sentences = sentences.replace('Mr.', 'Mr')
      .replace('Mrs.', 'Mrs')
      .replace('?', '.')
      .replace('!', '.')
      .split('.');

    let counter = 0;
    for (let i = 0; i < 30; i++) {
      if (sentences.length - 1 === i)
        break;
      if (!sentences[i].includes('\"')) {
        counter++;
        console.log(counter + '. ' + sentences[i] + '.');
      } else i += 1;
    }
  });
});

