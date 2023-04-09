const matter = require('gray-matter')
const fs = require('fs')
const path = require('path')

fs.readdir('posts', (err, data) => {
  if (err) return 0;
  const root = path.resolve('posts')
  let posts = [];
  for (const post of data) {
    const postRaw = fs.readFileSync(path.join(root, post), { encoding: "utf-8" });
    let frontmatter = matter(postRaw);
    posts.push({
      url: `/posts/${post.replace('.md', '')}.html`,
      data: frontmatter.data
    });
  }
  dividePostsByTime(posts)
  dividePostsByTags(posts)
  console.log('pages生成结束')
})


function dividePostsByTime(posts) {
  console.log('生成：pages/archive.md');
  const arr = [];
  let result = '---\ntitle: 归档\n---\n';
  posts.forEach(post => {
    arr.push(post)
  })
  arr.sort((a, b) => b.data.create - a.data.create)
  for (const i of arr) {
    const date = new Date(i.data.create);
    const dateStr = date.getFullYear() + '年' + date.getMonth().toString().padStart(2, '0') + '月' + date.getDate().toString().padStart(2, '0');
    result += `${dateStr} [${i.data.title}](${i.url})   \n`;
  }
  fs.writeFileSync('pages/archive.md', result, { encoding: "utf-8" });
  console.log('Success');
}


function dividePostsByTags(posts) {
  const map = new Map();
  const key = new Set();
  posts.forEach(post => {
    let arr;
    let labels = post.data.labels;
    if (typeof labels === 'undefined') {
      labels = ['未分类'];
    }
    for (const tag of labels) {
      key.add(tag);
      arr = map.get(tag)
      if (typeof arr === 'undefined') arr = [];
      arr.push(post);
      map.set(tag, arr);
    }
  });
  for (const k of key) {
    console.log('生成：pages/'+k+'.md');
    const arr = map.get(k);
    let result = '---\ntitle: "' + k + '"\n---\n';
    arr.sort((a, b) => b.data.create - a.data.create);
    for (const i of arr) {
      const date = new Date(i.data.create);
      const dateStr = date.getFullYear() + '年' + date.getMonth().toString().padStart(2, '0') + '月' + date.getDate().toString().padStart(2, '0');
      result += `${dateStr} [${i.data.title}](${i.url})   \n`;
    }
    fs.writeFileSync(`pages/${k}.md`, result, { encoding: "utf-8" });
    console.log('Success')
  }
}