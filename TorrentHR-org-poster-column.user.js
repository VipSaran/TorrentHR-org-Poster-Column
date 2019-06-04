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
    // console.log('table', table);

    const td_poster = '<td class="colhead" align="center">Poster</td>';
    if (table) {
      th.prepend(td_poster);
      var i = 0;
      tr_records.each(function () {
        var tr = $(this);
        tr.prepend('<td class="colhead" align="center">' + (i++) + '</td>');
      });
    }

  };

  var posterColumn = new TorrentHRPosterColumn();

  $(document).ready(function () {
    posterColumn.init();
  });
})();