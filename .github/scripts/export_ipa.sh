#!/bin/bash

set -eo pipefail

xcodebuild -archivePath $PWD/build/eventapp.xcarchive \
            -exportPath $PWD/build \
            -allowProvisioningUpdates \
            -exportArchive | xcpretty
