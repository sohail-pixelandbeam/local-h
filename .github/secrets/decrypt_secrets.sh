#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/LocalHappinezProv.mobileprovision ./.github/secrets/LocalHappinezProv.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/Certificates.cer ./.github/secrets/Certificates.cer.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/LocalHappinezProv.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/LocalHappinezProv.mobileprovision


security create-keychain -p "lh-1234" build.keychain
security default-keychain -s build.keychain
security import ./.github/secrets/Certificates.p12 -t agg -k ~/Library/Keychains/build.keychain -P "$IOS_KEYS" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "lh-1234" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "lh-1234" ~/Library/Keychains/build.keychain
