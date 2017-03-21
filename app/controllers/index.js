var cheerio = require('cheerio');
var express = require('express');
var Handlebars = require('handlebars');
var rp = require('request-promise-native')

var router = express.Router();

function parseOpenGraphMetadata(url) {
  var og = {};
  return rp({uri:url}).then(html => {
    let $ = cheerio.load(html);
    $('meta').filter((idx,m) => {
      return m.attribs.property !== undefined && m.attribs.property.startsWith('og:');
    }).each((idx, m) => {
      og[m.attribs.property] = m.attribs.content;
    });
    return og;
  }).catch(err => {
    return og;
  });
}

Handlebars.registerHelper('metadata-list', function(dict, options) {
  var out = "";
  if (Object.getOwnPropertyNames(dict).length !== 0) {
    for (var key in dict) {
      out += `<tr><td>${key}</td><td>${dict[key]}</td></tr>`;
    }
  } else {
    out = "<tr><td colspan='2'>This page has no OpenGraph metadata</td></tr>";
  }
  return out;
});

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function(req, res) {
  if (typeof req.query.url !== "undefined") {
    parseOpenGraphMetadata(req.query.url).then(md => {
      res.render('index', {
        url: req.query.url,
        md: md
      });
    });
  } else {
    res.render('index', {});
  }
});
