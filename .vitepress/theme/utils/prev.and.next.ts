import {ContentData} from "vitepress";

export function storePrevAndNextPageInfo(index:number, posts:ContentData){
    localStorage.setItem("index", index.toString());
    localStorage.setItem("posts", JSON.stringify(posts));
}
