<script setup lang="ts">
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { sidebarContent } from '@/sidebar/sidebar'
import { ref, nextTick } from 'vue'

let collapseStatus = ref(false)
let blockStatus = ref(false)
function onToggleCollapse(collapsed: boolean) {
  collapseStatus.value = collapsed
  console.log(collapseStatus.value)
  if (collapseStatus.value === false) {
    blockStatus.value = false
  }
}


function afterLeave() {
  blockStatus.value = true
}
</script>

<template>
  <sidebar-menu :menu="sidebarContent" style="position: static;" @update:collapsed="onToggleCollapse">
    <template v-slot:header>
      <transition name="fade" @after-leave="afterLeave">
        <img v-if="!collapseStatus" class="logo" src="https://pp.myapp.com/ma_icon/0/icon_54190090_1707114404/256"
          alt="">
      </transition>
      <transition v-if="collapseStatus" name="fade" mode="out-in">
        <div v-if="blockStatus" key="space" style="height: 100px;"></div>
      </transition>
    </template>
  </sidebar-menu>
  <div class="app-container overflow-scroll w-100">
    <router-view class="h-100"></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 100px;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* 定義 fade 動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
