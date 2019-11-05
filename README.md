<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TorrentHR.org Poster Column](#torrenthrorg-poster-column)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Limitations](#limitations)
  - [Changelog](#changelog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TorrentHR.org Poster Column

Greasemonkey/Tampermonkey UserScript for extending TorrentHR.org torrent browsing table with a movie poster. Avaialability based on IMDB data for the torrent.

**Before:**

![ScreenShot](thr_old.png?raw=true "Default view")

**After:**

![ScreenShot](thr_new.png?raw=true "View enhanced with poster images")


## Prerequisites

To be able to employ the UserScript, your browser needs to have corresponding extensions installed:

 - Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
 - Firefox: [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)


## Installation

Once your browser is equipped with appropriate extension, simply open [this link](https://github.com/VipSaran/TorrentHR-org-Poster-Column/raw/master/TorrentHR-org-poster-column.user.js). The extension should recognize the script and offer you to install it.


## Limitations

 - currently parses the torrent page for the IMDB poster even for categories not supporting IMDB data


## Changelog

1.2.0

 - skipping making details page requests for non-IMDB categories

1.1.0

 - caching of the detailsId-imageId mapping in browser storage (to reduce unneccessary subsequent loading and parsing of the same details page)

1.0.1

 - reuse existing Catergory column for poster images

1.0.0

 - browse torrents page prepended with the Poster column
