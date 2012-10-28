#!/usr/bin/env bash

# How a version of curl was built for this project.
#
# 1) Work in OS X or Linux.
#
# 2) Clone the curl project.
#
#         git clone https://github.com/unscriptable/curl.git
#
# 3) Copy this file into curl/bin.
#
# 4) Run this make file.
# 
# 5) Move curl.js to webgame/web/js/

./make.sh curl.js \
          ../src/curl.js \
          ../src/curl/domReady.js \
          ../src/curl/plugin/css.js \
          ../src/curl/plugin/link.js \
          ../src/curl/plugin/js.js \
          ../src/curl/plugin/domReady.js \
          ../src/curl/plugin/text.js

