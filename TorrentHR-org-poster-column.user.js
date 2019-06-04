// ==UserScript==
// @name          TorrentHR.org Poster Column
// @description   Greasemonkey/Tampermonkey UserScript for extending TorrentHR.org Torrents page with additional poster column
// @namespace     http://github.com/VipSaran/TorrentHR-org-Poster-Column
// @updateURL     https://github.com/VipSaran/TorrentHR-org-Poster-Column/raw/master/TorrentHR-org-poster-column.user.js
// @version       1.0.0
// @author        VipSaran
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @grant         GM_getResourceURL
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

      var i = 0;
      tr_records.each(function () {
        var tr = $(this);
        if (DEBUG) console.log('tr', tr);
        
        tr.prepend('<td class="colhead" align="center">' + (i++) + '</td>');

        // get torrent details with URL='https://www.torrenthr.org/details.php?id=' + row.id.replace('record-', '')
        // there find the img tag with $('#ka1').children().first() and use it instead of counter
      });
    }

  };

  var posterColumn = new TorrentHRPosterColumn();

  $(document).ready(function () {
    posterColumn.init();
  });
})();