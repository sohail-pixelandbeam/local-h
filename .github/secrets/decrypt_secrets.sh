#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/LocalHappinezProvisProfile.mobileprovision ./.github/secrets/LocalHappinezProvisProfile.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Certificates.p12 ./.github/secrets/Certificates.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/LocalHappinezProvisProfile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/LocalHappinezProvisProfile.mobileprovision

KEYCHAIN_PATH=$RUNNER_TEMP/th-keychain
security create-keychain -p "lh-1234" $KEYCHAIN_PATH
security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
security default-keychain -s $KEYCHAIN_PATH
security import ./.github/secrets/Certificates.p12 -t agg -k $KEYCHAIN_PATH -P "$IOS_KEYS" -A

security list-keychains -s $KEYCHAIN_PATH
security default-keychain -s $KEYCHAIN_PATH
security unlock-keychain -p "lh-1234" $KEYCHAIN_PATH

security set-key-partition-list -S apple-tool:,apple: -s -k "lh-1234" $KEYCHAIN_PATH

# Copy provisioning profile
mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
cp .github/secrets/LocalHappinezDevProfile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles

# Backup
#security create-keychain -p "lh-1234" build.keychain
#security default-keychain -s build.keychain
#security import ./.github/secrets/Certificates.p12 -t agg -k ~/Library/Keychains/build.keychain -P "$IOS_KEYS" -A

#security list-keychains -s ~/Library/Keychains/build.keychain
#security default-keychain -s ~/Library/Keychains/build.keychain
#security unlock-keychain -p "lh-1234" ~/Library/Keychains/build.keychain

#security set-key-partition-list -S apple-tool:,apple: -s -k "lh-1234" ~/Library/Keychains/build.keychain
