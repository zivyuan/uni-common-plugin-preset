#!/bin/bash

BASE=$(cd "$(dirname "$0")"; pwd)
cd $BASE/..
PROJ=$(basename `pwd`)
echo $PROJ

sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" package.json
sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" src/pages/index/index.vue
mv src/uni_modules/zui-common-plugin-preset/components/zui-common-plugin-preset/zui-common-plugin-preset.vue src/uni_modules/zui-common-plugin-preset/components/zui-common-plugin-preset/$PROJ.vue
mv src/uni_modules/zui-common-plugin-preset/components/zui-common-plugin-preset src/uni_modules/zui-common-plugin-preset/components/$PROJ
mv src/uni_modules/zui-common-plugin-preset src/uni_modules/$PROJ
sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" src/uni_modules/$PROJ/components/$PROJ/$PROJ.vue
sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" src/uni_modules/$PROJ/readme.md
sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" src/uni_modules/$PROJ/package.json
sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" src/pages.json
sed  -i '' "s/zui-common-plugin-preset/${PROJ}/g" src/manifest.json

if which yarn >/dev/null 2>&1; then
  yarn install
  yarn add sass sass-loader
else
  npm install
  npm install sass sass-loader
fi

rm -rf .git
git init
git add .
git commit -m "init"
