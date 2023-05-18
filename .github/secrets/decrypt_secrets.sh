#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/lhprovisioningprofile.mobileprovision ./.github/secrets/lhprovisioningprofile.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/LH-SelfSignedCertificate.p12 ./.github/secrets/LH-SelfSignedCertificate.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/lhprovisioningprofile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/lhprovisioningprofile.mobileprovision


security create-keychain -p "lh-1234" build.keychain
security import ./.github/secrets/LH-SelfSignedCertificate.p12 -t agg -k ~/Library/Keychains/build.keychain -P "lh-1234" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
