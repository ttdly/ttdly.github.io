<template>
<div class="BlogNav">

<!--  <ul class="nav-container">-->
<!--    <li class="nav-item"><a href="/archive.html">归档</a></li>-->
<!--    <li class="nav-item"><a href="/tags.html">分类</a></li>-->
<!--&lt;!&ndash;    <li class="nav-item">关于</li>&ndash;&gt;-->
<!--&lt;!&ndash;    <li class="nav-item">作品</li>&ndash;&gt;-->
<!--  </ul>-->
</div>
</template>

<script setup>
</script>

<style>
.BlogNav{
  display: flex;
  align-items: center;
  background: #fcfcfa;
  border: solid 1px #e2e0d8;
  border-top: none;
  border-bottom: none;
  margin: 0 auto;
  height: 6rem;
  padding: 0 1rem 1rem;
  user-select: none;
}

.BlogNav .nav-logo img{
  height: 8rem;
  width: 8rem;
}
/*.BlogNav .nav-item{*/
/*  margin-right: 1rem;*/
/*  transition: border-bottom-color .5s;*/
/*  border-bottom: 1px solid transparent;*/
/*}*/

/*.BlogNav .nav-item:hover{*/
/*  border-bottom-color: var(--vp-c-text-1);*/
/*}*/

/*.BlogNav .nav-item:nth-last-child(1){*/
/*  margin-right: 0;*/
/*}*/

/*.BlogNav .nav-container{*/
/*  display: flex;*/
/*}*/

/*.BlogNav .nav-logo{*/
/*  display: none;*/
/*  flex: 1;*/
/*}*/


/*@media (min-width: 768px) {*/
/*  .BlogNav .nav-logo {*/
/*    display: block;*/
/*  }*/
/*  .BlogNav {*/
/*    padding: 0 1rem;*/
/*  }*/
/*}*/
/*@media (min-width: 960px) {*/
/*  .BlogNav {*/
/*    padding: 0 calc(128px + 1rem);*/
/*  }*/
/*}*/

</style>