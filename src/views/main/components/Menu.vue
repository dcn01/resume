<template>
  <div class="menu-wrapper">
    <ul>
      <li v-for="(item, index) in menus" :key="index">
        <router-link 
        class="item" 
        :to="item.path"
        >{{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {name: 'About', path: '/about'},
        {name: 'Message ', path: '/message'},
        {name: 'Blog', path: '/log'},
        {name: 'NewBlog', path: '/new'},
        {name: 'Contact', path: '/contact'}
      ]
    }
  }
}
</script>
<style scoped>
.menu-wrapper > ul > li:first-child {
  margin-left: 0;
}
.menu-wrapper ul li{
  display: inline-block;
  margin-left: 80px;
}
.menu-wrapper ul li .item {
  color: #000;
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
}
.menu-wrapper ul li .item:hover {
  color: #ff3b30;
}
.menu-wrapper ul li .item.router-link-active {
  color: #ff3b30;
}
</style>