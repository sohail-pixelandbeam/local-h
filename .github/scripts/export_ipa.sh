#!/bin/bash

set -eo pipefail

xcodebuild -archivePath $PWD/build/eventapp.xcarchive \
            -exportOptionsPlist ./ios/eventapp\ iOS/exportOptions.plist \
            -exportPath $PWD/build \
            -allowProvisioningUpdates \
            -exportArchive | xcpretty
