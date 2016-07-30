#!/bin/bash

## goal, take a DIST  gregglind/shield-template, land it into amo.


set -x
set -o nounset
set -e
shopt -s expand_aliases

# templates -> https://github.com/mozilla/addons-server/tree/master/src/olympia/pages/templates/pages
#
# 8:02 <cgrebs> images -> https://github.com/mozilla/addons-server/tree/master/static/img
# 08:02 <cgrebs> best with a subfolder
#
# 08:02 <cgrebs> and the css to https://github.com/mozilla/addons-server/tree/master/static/css
# 08:02 <cgrebs> also into a subfolder
# 08:02 <cgrebs> and let me quickly figure out regarding how to link them in the html properly

# run a
# 08:17 <cgrebs> the html-file will be in pages/shield-stufy-1.h

echo "RUN THIS FROM THE AMO SITE DIRECTORY TO MAKE AMO STATIC SITE PATCHES"

D=$1
N=$2

## per cgrebs.

# main page, will need preprocessing
cp -f "$D"/index.html  ./src/olympia/pages/templates/pages/"$N".html

# styles / css
mkdir -p ./static/css/"$N"
cp -rf "$D"/styles/main.css  ./static/css/"$N"/


# images
mkdir -p ./static/img/"$N"
cp -rf "$D"/images/*  ./static/img/"$N"/

## all the re-pathing
AMOCSS='{{ STATIC_URL }}'css/"$N"/
AMOIMG=../../img/"$N"/

perl -pi -e 's|styles/main.css|'"$AMOCSS"'main.css|g' ./src/olympia/pages/templates/pages/"$N".html
perl -pi -e 's|\.\./images/|'$AMOIMG'|g'   ./static/css/"$N"/main.css
perl -pi -e 's|\.\./media/img/|'$AMOIMG'|g'   ./static/css/"$N"/main.css
