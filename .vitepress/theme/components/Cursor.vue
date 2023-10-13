<script setup>

import {onMounted} from "vue";
onMounted(()=>{
    const body = document.querySelector("html");
    const element = document.getElementById("cursor-front");
    const element2 = document.getElementById("cursor-back");
    const halfElementWidth = element.offsetWidth / 2;
    const halfElementWidth2 = element2.offsetWidth / 2;

    function setPosition(x, y) {
        element.style.transform  = `translate(${x - halfElementWidth}px, ${y - halfElementWidth}px)`;
        element2.style.transform  = `translate(${x - halfElementWidth2}px, ${y - halfElementWidth2}px)`;
    }
    body.addEventListener('mouseleave', (e) => {
        window.requestAnimationFrame(function(){
            setPosition("-2000", "-2000");
            console.log(e.clientX,e.clientY )
        });
    });

    body.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(function(){
            setPosition(e.clientX, e.clientY);
        });
    });
})
</script>

<template>
  <div id="cursor-front"/>
  <div id="cursor-back"/>
</template>

<style scoped>
#cursor-front,
#cursor-back
{
  position: fixed;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  background: #999;
  opacity: 0.8;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: exclusion;
  z-index: 1001;
  transform: translate(-200px,-200px);
}

#cursor-back {
  width: 2.5rem;
  height: 2.5rem;
  background: #222;
  transition: .1s ease-out;
  z-index: 1000;
}
</style>