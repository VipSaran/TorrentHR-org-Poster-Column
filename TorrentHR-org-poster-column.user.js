// ==UserScript==
// @name          TorrentHR.org Poster Column
// @description   Greasemonkey/Tampermonkey UserScript for extending TorrentHR.org Torrents page with additional poster column
// @namespace     http://github.com/VipSaran/TorrentHR-org-Poster-Column
// @updateURL     https://github.com/VipSaran/TorrentHR-org-Poster-Column/raw/master/TorrentHR-org-poster-column.user.js
// @version       1.0.0
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

    const tr_records = $("tr[id^=record]");
    const th = $(tr_records).siblings().first();
    const tbody = $(th).parent();
    const table = $(tbody).parent();

    if (DEBUG) console.log('table', table);

    if (table) {
      th.prepend('<td class="colhead" align="center">Poster</td>');

      tr_records.each(function () {
        var tr = $(this);
        var id = $(this)[0].id.replace('record-', '');
        if (DEBUG) console.log('tr', tr);
        if (DEBUG) console.log('id', id);

        var URL = 'https://www.torrenthr.org/details.php?id=' + id;
        GM_xmlhttpRequest({
          method: 'GET',
          url: URL,
          onload: function (response) {
            var data = response.responseText;
            // if (DEBUG) console.log('onload:', data);

            var html = $.parseHTML(data);
            var img = $(html).find('#ka1').first().children().first();
            // if (DEBUG) console.log('img', img);
            if (img.length) {
              tr.prepend('<td align="center" style="padding:0"><img src="' + $(img)[0].src + '"></img></td>');
            } else {
              tr.prepend('<td align="center"></td>');
            }
          },
          onerror: function (response) {
            if (DEBUG) console.log('onerror:', response);
          }
        });
      });
    }

  };

  var posterColumn = new TorrentHRPosterColumn();

  $(document).ready(function () {
    posterColumn.init();
  });
})();