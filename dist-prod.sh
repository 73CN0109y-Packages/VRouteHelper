yarn build

cp package.json dist/package.json

cd dist || exit

git add .
git commit -m "Publish built assets"
git push origin next

npm version patch
npm publish --access=public

