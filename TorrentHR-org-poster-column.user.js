// ==UserScript==
// @name          TorrentHR.org Poster Column
// @description   Greasemonkey/Tampermonkey UserScript for extending TorrentHR.org Torrents page with additional poster column
// @namespace     http://github.com/VipSaran/TorrentHR-org-Poster-Column
// @updateURL     https://github.com/VipSaran/TorrentHR-org-Poster-Column/raw/master/TorrentHR-org-poster-column.user.js
// @version       1.2.1
// @author        VipSaran
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @grant         GM.xmlHttpRequest
// @include       https://www.torrenthr.org/browse.php*
// @include       http://www.torrenthr.org/browse.php*
// @match         https://www.torrenthr.org/browse.php*
// @match         http://www.torrenthr.org/browse.php*
// @run-at        document-end
// ==/UserScript==

(function () {
  'use strict';

  var $ = window.jQuery;

  var DEBUG = false;

  var thrImdbCategories = [
    { Cat: 4, Name: 'Filmovi/SD' },
    { Cat: 7, Name: 'Serije/SD' },
    { Cat: 11, Name: 'Koncerti' },
    { Cat: 12, Name: 'Dokumentarni' },
    { Cat: 14, Name: 'Filmovi/DVD' },
    { Cat: 17, Name: 'Filmovi/HD' },
    { Cat: 18, Name: 'Crtani' },
    { Cat: 31, Name: 'Anime' },
    { Cat: 34, Name: 'Serije/HD' },
    { Cat: 40, Name: 'Filmovi/BD' },
  ];

  function TorrentHRPosterColumn() {
    if (DEBUG) console.log('TorrentHRPosterColumn()');
  }

  TorrentHRPosterColumn.prototype.init = function () {
    if (DEBUG) console.log('TorrentHRPosterColumn.init()');

    var tr_records = $("tr[id^=record]");
    var th = $(tr_records).siblings().first();
    var tbody = $(th).parent();
    var table = $(tbody).parent();

    if (table.length) {
      if (DEBUG) console.log('table', table);

      if (tr_records.length) {
        addGlobalStyle('td.colhead { white-space: nowrap; }');
        addGlobalStyle('td.poster { width: 181px; height: 268px; vertical-align: bottom; text-align-last: right; padding: 0; }');
        addGlobalStyle('img.poster_cat { box-shadow: -3px -3px 5px rgba(0,0,0,0.7); border-radius: 10px; margin: 1px; }');
      }

      tr_records.each(function () {
        var tr = $(this);
        // if (DEBUG) console.log('tr', tr);
        var detailsId = $(this)[0].id.replace('record-', '');
        // if (DEBUG) console.log('id', id);

        var cat_td = tr.children().first();

        // some (optional) styling for torrent name
        $(tr).find('td a b').css('font-size', '1.1em').css('word-wrap', 'break-word');

        // skip requests for non-IMDB categories
        try {
          var cat_href = $(cat_td).find('a').first().attr('href');
          // if (DEBUG) console.log('cat_href', cat_href);

          var cat = parseInt(cat_href.substring(cat_href.indexOf('=') + 1));
          // if (DEBUG) console.log('cat', cat);
          if (thrImdbCategories.filter(function (e) { return e.Cat === cat; }).length == 0) {
            if (DEBUG) console.log('thrImdbCategories does not support:', cat);
            // the current category does not use IMDB poster images
            return;
          }
        } catch (e) {
          if (DEBUG) console.error('error parsing cat:', e);
        }

        // skip parsing of details page if detailsId-imageId mapping is stored in browser cache
        var imageURL = window.localStorage.getItem(detailsId);
        if (imageURL !== null) {
          if (DEBUG) console.log('using cached mapping', detailsId, imageURL);
          addImageBackgroundToTD(cat_td, imageURL);
        } else {
          var URL = 'https://www.torrenthr.org/details.php?id=' + detailsId;
          GM.xmlHttpRequest({
            method: 'GET',
            url: URL,
            onload: function (response) {
              var data = response.responseText;
              // if (DEBUG) console.log('onload:', data);

              var html = $.parseHTML(data);
              var imdb_img = $(html).find('#ka1').first().children().first();
              // if (DEBUG) console.log('imdb_img', imdb_img);
              if (imdb_img.length) {
                imageURL = $(imdb_img)[0].src;
                addImageBackgroundToTD(cat_td, imageURL);
                window.localStorage.setItem(detailsId, imageURL);
              } else {
                cat_td.css('text-align-last', 'right');
              }
            },
            onerror: function (response) {
              if (DEBUG) console.error('onerror:', response);
              cat_td.css('text-align-last', 'right');
            }
          });
        }
      });
    }
  };

  function addImageBackgroundToTD(td, imageURL) {
    td.addClass('poster');
    td.css('background-image', 'url(' + imageURL + ')');
    td.find('img').first().addClass('poster_cat');

    return td;
  }

  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  var posterColumn = new TorrentHRPosterColumn();

  $(document).ready(function () {
    posterColumn.init();
  });
})();
