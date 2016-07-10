var Search = require('bing.search');

var search = new Search(process.env.BING_API_KEY);

var history = [];

function runSearch(term, offset) {
  history.unshift({term: term, when: new Date()});
  return new Promise(function (resolve, reject) {
    search.images(term, {top: 10, skip: 10 * offset}, function (err, result) {
      if (err) {
        reject(err);
      } else {
        var getUsefulInfo = function (data) {
          var title = data.title;
          var url = data.url;
          var pageUrl = data.sourceUrl;
          return {
            title: title,
            url: url,
            pageUrl: pageUrl
          };
        };
        resolve(result.map(getUsefulInfo));
      }
    });
  });
}

function getLast() {
  return history.slice(0, 10);
}

module.exports = {
  runSearch: runSearch,
  getLast: getLast
};
