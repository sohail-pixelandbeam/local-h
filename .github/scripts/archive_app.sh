#!/bin/bash

set -eo pipefail

xcodebuild -workspace ./ios/eventapp.xcworkspace \
            -scheme eventapp\
            -sdk iphoneos \
            -configuration AppStoreDistribution \
            -archivePath $PWD/build/eventapp.xcarchive \
            -allowProvisioningUpdates \
            clean archive | xcpretty
