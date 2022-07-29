import {createRouter, createWebHashHistory} from 'vue-router'

import Room from './components/Room.vue'
import Hello from './components/Hello.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/', component: Hello},
    {path: '/room', component: Room}
  ]
})

export default router