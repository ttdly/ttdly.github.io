---
title: 结合GitHub Issues与VitePress写博客
date: 2023-03-21T06:36:16Z
tags: ["github"]
---
前一阵子一直在捣鼓VitePress，想着之前看到有人用Github Issues来做静态页面的评论系统，于是就去了解了一下，目前这类项目有[gitalk](https://github.com/gitalk/gitalk)、[gitment](https://github.com/imsun/gitment)以及[vssue](https://vssue.js.org/zh/)。在这个过程中发现很早之前就有人开始用Github Issues来写博客。本人比较懒，我想着能不能把它和VitePress结合起来再通过GitHub Pages实现嫖上加嫖，后经过搜索也确实有人这么干。

## 仓库设置
首先，新建一个仓库，由于是用到GitHub Pages，就将仓库名设置为`<yourname>.github.io`，当然也可以随便命名，只是后面在vitepress[部署](https://vitepress.dev/guide/deploy#github-pages)的时候会有所不同。

###  设置密钥
首先申请[Personal access token](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) ，`左上角头像->Settings->下拉找到Developer settings->Personal access tokens->Generate new token`我这里申请的都是带有`classic`标识的token，权限建议全选，时间设置无限制。点击Generate token之后页面中会出现一个ghp_开头的字符串，复制保存好。
然后将token写入仓库密钥中，就在我们刚刚创建的仓库主页`左边Settings->Secrets and variables->Actions->New repository secret`这里name自己设置，value填写刚刚复制的字符串之后点击Add secrets就可以了。
### 设置变量
这边设置的变量主要是方便工作流中的判断，在刚刚创建仓库密钥的页面有个`variables`选项卡点击New repository variable，name自定义，value就写你github的用户名，比如我的就是`ttdly`，填好后点击Add variable就行。
### Pages
由于后面会用到GitHub Actions进行Pages的发布，所以在仓库`Settings->Pages->Build and deployment->source`选择Github Actions。
### 新建分支
创建一个分支，存储md文件，我这里就以`md`命名了，然后删除`main`分支中的文件，也就是说这个分支里什么文件都不要留，当然.git文件夹不要删。清空之后，新建`posts`文件夹里面新建一个`placeholder`文件，什么都不要写。（主要是懒得做文件夹是否存在这个判断）最后将分支同步到github仓库里。

## 处理Issues
把仓库设置好后，就可以开始编写[工作流程](https://docs.github.com/zh/actions/using-workflows/about-workflows)以及代码来把你写好的Issue写入到md文档中然后上传回仓库了。

### 初始化
在`main`分支中，新建`.github/workflows/copyissue.yml`
```yaml
name: cpoyIssues
# 在新建、更新、重新开启、关闭issues的时候触发工作流程
on:
  issues:
    types:
      - "opened"
      - "edited"
      - "reopened"
      - "closed"
# 给予所有写权限，这个在后面上传文件的时候会用到。
permissions: write-all
```
### 过滤issues
由于Issues谁都能来写，这又是个人博客，所以第一步就需要把不是自己开的Issues给过滤掉。而[Github REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28)提供了许多的接口，其中就有对Issues操作的接口，这里会用到[issues update](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#update-an-issue)和[issues lock](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#lock-an-issue)。因为GitHub Action能够直接执行命令，所以过滤issues直接用curl调用接口：
```yaml
# .github/workflows/copyissue.yml
jobs:
  lockissue:
    runs-on: ubuntu-latest
# vars.OWNER中的OWNER是前面设置变量一节中设置的变量名
    if: ${{ github.event.action == 'opened' && github.actor != vars.OWNER }}
    steps: 
      - name: Close and Lock Issues
        run: |
          curl -L \
            -X PATCH \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{secrets.TOKEN}}"\
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/${{github.repository}}/issues/${{github.event.issue.number}} \
            -d '{"state":"close","state_reason":"not_planned"}'
          curl -L \
            -X PUT \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{secrets.TOKEN}}"\
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/${{github.repository}}/issues/${{github.event.issue.number}}/lock \
            -d '{"lock_reason":"off-topic"}'
```
### 编写转换脚本
这一步的转换脚本用啥语言写都行，只要能正常请求网络接口，我这里用js演示。
首先切换到`md`分支，[安装](https://vitepress.dev/guide/getting-started#installation)vitepress，在`package.json`中的scripts加上一行`"write": "node ./<name>.js"`，在**根目录**新建js文件，名字随意，但是wirte好像不行。
```js
// <name>.js
const fs = require('fs');
// 获取命令行传递的参数
const repo = process.argv[2],
      number = process.argv[3],
      token = process.argv[4];

const wirteD = function(response){
// 把labels转成我想要的形式，不需要可以不写
  let tags = 'tags: ["';
  let labels = response.labels;
  let text;
  if (labels.length !== 0){
    labels = labels.map(ele => ele.name);
    tags += labels.join('","');
    tags += '"]\n';
  } else {
    tags = '';
  }
// 拼接frontmatter
  text = `---\ntitle: ${response.title}\ndate: ${response.created_at}\n${tags}---\n${response.body}`
  
  fs.writeFile(`./posts/${response.number}.md`,text,(err)=>{
    if (err) {
        console.log("posts:",err);
        return
    }
    console.log("写入posts成功")
  });
  fs.writeFile(`./index.md`,text,(err)=>{
    if (err) {
        console.log("index:",err);
        return
    }
    console.log("写入index成功")
  });

}
// 获取issue信息
const url = `https://api.github.com/repos/${repo}/issues/${number}`;
const headers = new Headers({
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Authorization': "Bearer "+token
});
fetch(url, { method: 'GET', headers }).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
// 这里就是调用写入的函数了，你可以打印获取到的信息，决定怎么写这个文件
  wirteD(response);
});
```
### 自动上传并且发布
这一步就要用到一些别人写好的actions了
```yaml
# .github/workflows/copyissue.yml
# 这是jobs中的一个job，注意缩进
  issue2page:
    runs-on: ubuntu-latest
    if: ${{ github.actor == vars.OWNER && github.event.action != 'closed' }}
    steps:
# ref:<name>填写你存放md文件的分支
      - name: Checkout md
        uses: actions/checkout@v3
        with:
          ref: md
          fetch-depth: 0
# 用的是pnpm，这里安装pnpm但不安装依赖
      - uses: pnpm/action-setup@v2
        name: Install pnpm
        id: pnpm-install
        with:
          version: 7.27.0
          run_install: false
# 获取pnpm cache存储路径
      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT
# 查找是否存在cache，并且把cache还原，这个主要是加快依赖安装
      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
# 安装依赖
      - name: Install dependencies
        run: pnpm install
# 执行写入脚本
      - name: Run Issue to Md Script
        run: pnpm run write ${{github.repository}} ${{github.event.issue.number}} ${{secrets.GITHUB_TOKEN}}
# 存储修改
      - name: Commit files
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add .
          git commit -m "auto copy /posts/${{github.event.issue.number}}.md"
# branch是要上传md文件的分支
      - name: Push changes
        uses: ad-m/github-push-action@master
        with: 
          branch: md
          github_token: ${{secrets.GITHUB_TOKEN}}

      - name: Build
        run: pnpm run build
# 发布GitHub Pages，VitePress官方提供的方案
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./.vitepress/dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v1
```
## 完成
到这里不出意外，不管是新建issue还是修改issue都会自动更新文件，上传分支。想要在关闭issues的时候删除文件，可以自己尝试一下，我现在还没写，然后pages页面也会更新。