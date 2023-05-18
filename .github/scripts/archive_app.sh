#!/bin/bash

set -eo pipefail

xcodebuild -workspace ./ios/eventapp.xcworkspace \
            -scheme eventapp\
            -sdk iphoneos \
            -configuration AppStoreDistribution \
            -archivePath $PWD/build/eventapp.xcarchive \
            -destination 'platform=iOS Simulator,name=iPhone 12,OS=12.4'
            clean archive | xcpretty
