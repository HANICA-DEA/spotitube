#! /usr/bin/env bash

set -o errexit -o nounset

if [ -f ~/.bash_tokens ]; then
    source ~/.bash_tokens
fi

rev=$(git rev-parse --short HEAD)

cd dist/

git init
git config user.name "Travis CI"
git config user.email "noreply@travis.ci"

git remote add upstream "https://$GH_TOKEN@github.com/meronbrouwer/oose-dea-eai-client.git"
git fetch upstream
git reset upstream/gh-pages

touch .
touch .nojekyll

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages


