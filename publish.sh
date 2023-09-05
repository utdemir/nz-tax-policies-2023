#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

S3_BUCKET="nz-tax-policies-2023.utdemir.com"
CF_DISTRIBUTION="E1YE67C3WTXZG2"

set -o xtrace

npm run build
aws s3 sync --delete dist s3://"$S3_BUCKET"
aws cloudfront create-invalidation --distribution-id "$CF_DISTRIBUTION" --paths "/*"