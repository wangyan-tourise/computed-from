<template>
  <div id='app'>
    <header class="header">

    </header>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" v-for="(item, index) in menus"
          :key="index">
          <el-menu-item index="4" @click="goTo('/home')">
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu :index="''+index">
            <template slot="title">
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="(i, num) in item.options" :key="num">
              <el-menu-item :index="index+'-'+num" @click="goTo(i.path)">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'menus',
  data () {
    return {
      menus: [
        {
          title: '按钮和表格的操作',
          options: [
            {
              title: '懒加载表格+添加大条和小条数据',
              path: '/bussiness'
            }
          ]
        }
      ],
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    goTo (key) {
      if (this.$route.path !== key) {
        this.$router.push({
          path: key,
        })
      }
    }
  }
}
</script>
<style  scoped>
#app {
  width: 100%;
  height: 1000px;
}
#app .header {
  height: 50px;
  background: black;
  color: white;
}
#app .tac {
  width: 15%;
  height: 100%;
  display: inline-block;
}
/deep/.el-submenu__title {
  height: 30px;
  line-height: 30px;
}
</style>