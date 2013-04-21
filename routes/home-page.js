var markdown = require('markdown').markdown
  , fs = require('fs')
  , config = require('../config')
;

module.exports = function(app) {
  app.get('/', function(req, res) {
    var readmeMarkdown = fs.readFileSync('./README.md', 'utf-8');
    var readmeHtml = markdown.toHTML(readmeMarkdown);
    res.render('home-page', {
      title: config.app.title, 
      contents: readmeHtml
    });
  });
}