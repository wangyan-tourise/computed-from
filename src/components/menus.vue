<template>
  <div id='app'>
    <header class="header">
      <div>
        <img src="../assets/image/headLogo.png" alt="" class="logo">
        <div class="header-right">
          <img src="../assets/image/touXiang.jpg" alt="头像" class="touxiang">
          <span style="display:inline-block;line-height:50px;margin-left:10px">{{userName}}</span>
          <el-button @click="signOut()" type="text" style="color:orange;margin-left:10px">切换账号</el-button>
        </div>
      </div>

    </header>
    <el-row class="tac" :style="`height: ${menuHeigth}px`">
      <!-- <el-col :span="12" class="sidebar"> -->
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="darkslateblue" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1" @click="goTo('/home')">
          <i class="el-icon-location"></i>
          <span slot="title" >主页</span>
        </el-menu-item>
        <el-submenu v-for="val in menus" :key="val.indexStr" :index="val.indexStr">
          <template slot="title"  @click="goTo(val.path)">
            <i :class="val.class"></i>
            <span>{{val.title}}</span>
          </template>
          <el-menu-item-group v-if="val.options">
            <div v-for="item in val.options" :key="item.indexStr">
              <template slot="title">{{item.title}}</template>
              <el-menu-item :index="item.indexStr" @click="goTo(item.path)">{{item.title}}</el-menu-item>
            </div>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!-- </el-col> -->
    </el-row>
    <div class="content" :style="`height: ${menuHeigth}px`">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'menus',
  data () {
    return {
      menus: [
        // {
        //   class: 'el-icon-location',
        //   title: '主页',
        //   indexStr: '1',
        //   path: '/home'
        // },
        {
          class: 'el-icon-menu',
          title: '按钮和表格的操作',
          indexStr: '2',
          options: [
            {
              title: '添加数据',
              path: '/business',
              indexStr: '2-1'
            },
            {
              title: '添加数据',
              path: '/business',
              indexStr: '2-2'
            },
            {
              title: '添加数据',
              path: '/business',
              indexStr: '2-3'
            }
          ]
        }
      ],
      menuHeigth: 500,
      userName: 'vwangyan'
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
    },
    signOut () {
      this.$message('我不玩了！！！')
    },
    setMenuHeigth () {
      var winH = window.innerHeight
      this.menuHeigth = winH - 100
    }
  },
  computed: {
    // menuHeigth(){
    // 	var winH = window.innerHeight
    // 	let menuHeigth = winH - 100
    // 	return menuHeigth
    // }
  },
  mounted () {
    window.onload = this.setMenuHeigth()
    window.addEventListener('resize', function () {
      var winH = window.innerHeight
      this.menuHeigth = winH - 100
    })
  },
}
</script>
<style  scoped>
#app {
  width: 100%;
  height: 100%;
}
#app .header {
  height: 90px;
  background: #00a2e8;
  color: white;
}
#app .tac {
  width: 15%;
  /* height: 100%; */
  background-color: darkslateblue;
  display: inline-block;
}
#app .sidebar {
  height: 100%;
}
#app .content {
  width: 85%;
  background: white;
  overflow: hidden;
  float: right;
}
/* .el-submenu__title {
  height: 30px;
  line-height: 30px;
} */
.logo {
  height: 78px;
  margin: 5px 10px 5px 14px;
}
#app .header .touxiang {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.header-right {
  float: right;
  margin: 20px 50px 20px 10px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>