<template>
<!--  <template v-for="year in years">-->
<!--    <ul class="archive">-->
<!--      <span class="archive-page-year">{{ year }}</span>-->
<!--      <template v-for="({ url, frontmatter },index) in map.get( year )">-->
<!--        <a :href="url" @click="storePrevAndNextPageInfo(index, map.get( year ))">-->
<!--          <li class="archive-list-item">-->
<!--            <span class="archive-list-info">{{ `${new Date(frontmatter.date).toLocaleDateString('en-US',{month:'short',day:'numeric'})}` }}<br/>DDDD0</span>-->
<!--            <span class="archive-list-title">{{ frontmatter.title }}</span>-->
<!--          </li>-->
<!--        </a>-->
<!--      </template>-->
<!--    </ul>-->
<!--  </template>-->
  <table class="archive-table">
    <tr>
      <th>年份</th>
      <th>日期</th>
      <th>链接</th>
    </tr>
    <template v-for="year in years">
      <tr>
        <td :rowspan="map.get(year).length + 1">{{ year }}</td>
      </tr>
      <template v-for="({ frontmatter, url }, index) in map.get(year)">
        <tr>
          <td>{{ `${ new Date(frontmatter.date).toLocaleDateString('zh-CN',{ month:"long", day:"numeric" })}` }}</td>
          <td>
            <a :href="url">{{ frontmatter.title }}</a>
          </td>
        </tr>
      </template>
    </template>
  </table>
</template>


<script setup>
import { posts as FPosts} from "../utils/fakedata";
import { data as TPosts } from "../utils/posts.data";
import { devidePostsByTime } from "../utils/posts.deal";
import { storePrevAndNextPageInfo } from "../utils/prev.and.next";

let posts;
if (process.env.NODE_ENV === "development") {
  posts = FPosts;
} else {
  posts = TPosts;
}
const { map, key }= devidePostsByTime(posts);
const years = Array.from(key);

years.sort((a, b) => b - a);
for(const i of years){
  let tem;
  tem = map.get(i);
  tem.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })
}

</script>


<style lang="scss">
.archive-table{
  border: 1px solid #2c2c30;
  width: 100%;
  user-select: none;

}
.archive-table a{
  transition: color .25s;
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.archive-table a:hover{
  color: #005cfc;
  text-decoration: underline dotted #005cfc;
}

.archive-table tr {
  border-top: 1px solid var(--vp-c-divider);
  transition: background-color 0.5s;
}


.archive-table th,
.archive-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px 16px;
}

.archive-table th {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
}

.archive-table td {
  font-size: 14px;
}


</style>