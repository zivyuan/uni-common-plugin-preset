#!/usr/bin/env zx

import fs from "fs";
import inquirer from "inquirer";

// 禁止 shell 命令回显
$.verbose = false;

const validPluginId = (id) => {
  if (/^[a-z]\-?$/.test(id)) return "插件作者名需要至少2个字符。";

  if (/^\d/.test(id)) return "插件ID 只能以字母开始";

  if (/^(uni|dcloud)-/i.test(id)) {
    return '插件 ID 禁止以 "DCloud", "uni" 等关键字开头。具体参见：' + helpUrl;
  }

  if (!/^\w[\w\d]+(\-[\w\d]+)+/.test(id)) {
    return (
      "ID 格式不正确。只能包含英文，数字与连字符号（-）。具体参见：" + helpUrl
    );
  }

  if (fs.existsSync(id)) {
    return `已存在 ${id} 同名目录，请重新选择一个 ID。`;
  }

  return true;
};


const fullpath = (await $`pwd`).stdout.trim()
const pluginId = path.resolve(fullpath).split('/').pop()
const gitUsername = (await $`git config --global user.name`).stdout.trim();
// const license = "MIT";

const helpUrl =
  "https://uniapp.dcloud.net.cn/plugin/publish.html#%E6%8F%92%E4%BB%B6%E5%88%B6%E4%BD%9C%E6%B3%A8%E6%84%8F";

const questions = [
  {
    type: "input",
    name: "pluginId",
    message: "插件ID：",
    default: pluginId,
    validate: validPluginId,
  },
  {
    type: "input",
    name: "displayName",
    message: "插件名称(40字)：",
    validate: (value) => {
      value = value.trim();
      if (/^[_0-9]/.test(value)) {
        return '插件名称不能以数字或下划线开始'
      }
      if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,40}$/.test(value))
        return "插件名称只能包含汉字、数字、字母、下划线，长度为 3-40 个字符";

      return true;
    },
  },
  {
    type: "input",
    name: "description",
    message: "描述(50字)：",
    validate: (value) => {
      value = value.replace(/ +/g, " ").trim();
      if (value.length > 50) return "插件描述最多50字";

      return true;
    },
  },
  {
    type: "input",
    name: "tags",
    message: "标签(逗号分割, 最多5个)：",
    validate: (value) => {
      return value.replace(/ +/g, ",").split(",").length > 5
        ? "标签最多5个"
        : true;
    },
  },
  {
    type: "input",
    name: "author",
    message: `作者:`,
    default: gitUsername,
    validate: (value) => {
      value = value.replace(/ +/g, " ").trim();
      if (value.length < 1) return "作者不能为空";

      return true;
    },
  },
  // {
  //   type: "input",
  //   name: "license",
  //   message: `License:`,
  //   default: license,
  // },
];

const answers = await inquirer.prompt(questions);
Object.keys(answers).forEach((key) => {
  answers[key] = (answers[key] || "").trim();
});
answers.tags = (answers.tags || "")
  .replace(/ +/g, ",")
  .replace(/,+/g, ",")
  .split(",")
  .filter((item) => !!item);
answers.description = answers.description.replace(/ +/g, " ").trim()
answers.author = answers.author.replace(/ +/g, " ").trim()
answers.pluginId = answers.pluginId.toLowerCase();
// answers.license = answers.license || 'MIT'

console.log("");

// ========================================
//
//     初始化仓库
//
// ----------------------------------------

console.log('配置模板信息...')
fs.mkdirSync(fullpath, { recursive: true });

fs.renameSync(
  `${fullpath}/src/uni_modules/zui-component-starter/components/zui-component-starter/zui-component-starter.vue`,
  `${fullpath}/src/uni_modules/zui-component-starter/components/zui-component-starter/${answers.pluginId}.vue`
);
fs.renameSync(
  `${fullpath}/src/uni_modules/zui-component-starter/components/zui-component-starter`,
  `${fullpath}/src/uni_modules/zui-component-starter/components/${answers.pluginId}`
);
fs.renameSync(
  `${fullpath}/src/uni_modules/zui-component-starter`,
  `${fullpath}/src/uni_modules/${answers.pluginId}`
);

const regDesc = /zui\-component\-starter\-description/g;
const regName = /zui\-component\-starter\-name/g;
const regTags = /zui\-component\-starter\-tags/g;
const regAuthor = /zui\-component\-starter\-author/g;
const regId = /zui\-component\-starter/g;

const updatePluginInfo = (filename) => {
  let content = fs.readFileSync(filename, {
    encoding: "utf-8",
  });
  content = content.replace(regDesc, answers.description);
  content = content.replace(regName, answers.displayName);
  content = content.replace(regTags, answers.tags.join('","'));
  content = content.replace(regAuthor, answers.author);
  content = content.replace(regId, answers.pluginId);
  fs.writeFileSync(filename, content, {
    encoding: "utf-8",
  });
};
updatePluginInfo(`${fullpath}/package.json`);
updatePluginInfo(`${fullpath}/README.md`);
updatePluginInfo(`${fullpath}/src/manifest.json`);
updatePluginInfo(`${fullpath}/src/pages.json`);
updatePluginInfo(`${fullpath}/src/uni_modules/${answers.pluginId}/readme.md`);
updatePluginInfo(
  `${fullpath}/src/uni_modules/${answers.pluginId}/package.json`
);
updatePluginInfo(
  `${fullpath}/src/uni_modules/${answers.pluginId}/components/${answers.pluginId}/${answers.pluginId}.vue`
);
updatePluginInfo(`${fullpath}/src/pages/index/index.vue`);

console.log('初始化 git...')
await $`git init; git add .; git commit -m "initial" `;

console.log(`初始化完成，编程快乐！`)
console.log(``)
console.log(`> npm run dev`)
console.log(``)

// ----------------------------------------
//
//     初始化仓库
//
// ========================================
