const fs = require('fs');

const repo = process.argv[2],
      number = process.argv[3],
      token = process.argv[4];

const wirteD = function(response){
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

const url = `https://api.github.com/repos/${repo}/issues/${number}`;
const headers = new Headers({
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Authorization': "Bearer "+token
});
fetch(url, { method: 'GET', headers }).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
  wirteD(response);
});