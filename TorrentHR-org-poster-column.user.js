// ==UserScript==
// @name          TorrentHR.org Poster Column
// @description   Greasemonkey/Tampermonkey UserScript for extending TorrentHR.org Torrents page with additional poster column
// @namespace     http://github.com/VipSaran/TorrentHR-org-Poster-Column
// @updateURL     https://github.com/VipSaran/TorrentHR-org-Poster-Column/raw/master/TorrentHR-org-poster-column.user.js
// @version       1.0.1
// @author        VipSaran
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @grant         GM_xmlhttpRequest
// @include       https://www.torrenthr.org/browse.php*
// @include       http://www.torrenthr.org/browse.php*
// @match         https://www.torrenthr.org/browse.php*
// @match         http://www.torrenthr.org/browse.php*
// @run-at        document-end
// ==/UserScript==

(function () {
  'use strict';

  var $ = window.jQuery;

  var DEBUG = true;

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
        addGlobalStyle('td.poster { width: 181px; height: 268px; vertical-align: bottom; text-align-last: right; padding: 0; }');
        addGlobalStyle('img.poster_cat { box-shadow: -3px -3px 5px rgba(0,0,0,0.7); border-radius: 10px; margin: 1px; }');
      }

      tr_records.each(function () {
        var tr = $(this);
        // if (DEBUG) console.log('tr', tr);
        var id = $(this)[0].id.replace('record-', '');
        // if (DEBUG) console.log('id', id);

        var cat_td = tr.children().first();

        // some (optional) styling for torrent name
        $(tr).find('td a b').css('font-size', '1.1em').css('word-wrap', 'break-word');

        // TODO skip requests for non-IMDB categories

        var URL = 'https://www.torrenthr.org/details.php?id=' + id;
        GM_xmlhttpRequest({
          method: 'GET',
          url: URL,
          onload: function (response) {
            var data = response.responseText;
            // if (DEBUG) console.log('onload:', data);

            var html = $.parseHTML(data);
            var imdb_img = $(html).find('#ka1').first().children().first();
            // if (DEBUG) console.log('imdb_img', imdb_img);
            if (imdb_img.length) {
              cat_td.addClass('poster');
              cat_td.css('background-image', 'url(' + $(imdb_img)[0].src + ')');

              var cat_img = cat_td.find('img').first();
              cat_img.addClass('poster_cat');
            } else {
              cat_td.css('text-align-last', 'right');
            }
          },
          onerror: function (response) {
            if (DEBUG) console.log('onerror:', response);
            cat_td.css('text-align-last', 'right');
          }
        });
      });
    }

  };

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