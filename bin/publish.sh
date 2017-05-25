#!/usr/bin/env bash

# get list of all component packages from Gemfury
PACKAGES=`./bin/fury.rb $1`

# bootstrap all our packages
node_modules/.bin/lerna bootstrap

# update package if version incremented
for COMPONENT in packages/*; do
    UPDATE=`./bin/check_package.js ${PACKAGES} ${COMPONENT}`
    echo "Update package?       ${UPDATE}"
    if [ "${UPDATE}" = "true" ] ; then
        echo 'publishing...'
        FILE_NAME=`npm pack`
        curl -F "package=@$FILE_NAME" https://push.fury.io/$1/nature/
    fi
done
