#!/bin/sh
set -eo pipefail

gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/localhappinez_provisioning_profile.mobileprovision ./.github/secrets/localhappinez_provisioning_profile.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="$IOS_KEYS" --output ./.github/secrets/CertificateSigningRequest.certSigningRequest ./.github/secrets/CertificateSigningRequest.certSigningRequest.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/localhappinez_provisioning_profile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/localhappinez_provisioning_profile.mobileprovision


security create-keychain -p "" build.keychain
security import ./.github/secrets/CertificateSigningRequest.certSigningRequest -t agg -k ~/Library/Keychains/build.keychain -P "" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/build.keychain
view raw
