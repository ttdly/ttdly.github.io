import { ContentData } from "vitepress";
export function devidePostsByTime(posts: ContentData[]) {
  const map = new Map();
  const key = new Set();
  posts.forEach(post => {
    let date = new Date(post.frontmatter.date);
    let year = date.getFullYear();
    let arr: ContentData[];
    key.add(year)
    arr = map.get(year);
    if (typeof arr === 'undefined') arr = new Array();
    arr.push(post);
    map.set(year, arr);
  })
  return {
    map,
    key
  }
}


export function devidePostsByTags(posts: ContentData[]) {
  const map = new Map();
  const key = new Set();
  posts.forEach(post => {
    let arr: ContentData[];
    let tags = post.frontmatter.tags;
    if (typeof tags === 'undefined') {
      tags = ['未分类'];
    }
    for (const tag of tags) {
      key.add(tag);
      arr = map.get(tag)
      if (typeof arr === 'undefined') arr = new Array();
      arr.push(post);
      map.set(tag, arr);
    }
  });
  return {
    map,
    key
  }
}