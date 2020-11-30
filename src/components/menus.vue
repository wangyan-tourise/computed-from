<template>
  <div id='app'>
    <header class="header">
      <div>
        <div style="display:inline-block;">
          <img src="../assets/image/headLogo.png" alt="" class="logo">
        </div>

        <div class="header-right">
          <img src="../assets/image/touXiang.jpg" alt="头像" class="touxiang">
          <span style="display:inline-block;line-height:50px;margin-left:10px">{{userName}}</span>
          <el-button @click="signOut()" type="text" style="color:orange;margin-left:10px">切换账号</el-button>
        </div>
        <div class="button-area">
          <el-button type="text" class="qisimiaoxiang" @click="goTo('/GuChengShuang')">奇思妙想</el-button>
        </div>
      </div>

    </header>
    <el-row class="tac" id="tac">
      <!-- <el-col :span="12" class="sidebar"> -->
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="darkslateblue" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1" @click="goTo('/home')">
          <i class="el-icon-location"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu v-for="val in menus" :key="val.indexStr" :index="val.indexStr">
          <template slot="title" @click="goTo(val.path)">
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
    <div class="content" id="content">
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
          ]
        },
        {
          class: 'el-icon-menu',
          title: '游戏',
          indexStr: '3',
          options: [
            {
              title: '红军打日本',
              path: '/game/redVSWhite',
              indexStr: '3-1'
            },
            {
              title: '憋棋',
              path: '/game/bieQI',
              indexStr: '3-2'
            },
          ]
        }
      ],
      menuHeigth: 500,
      userName: 'vwangyan',
      defaultActive: '1'
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
      let winH = window.innerHeight
      let menuHeigth = winH - 90
      let content = document.getElementById('content')
      let tac = document.getElementById('tac')
      content.style = `height: ${menuHeigth}px`
      tac.style = `height: ${menuHeigth}px`
    },
    where (menus) {
      menus.forEach((item) => {
        if (item.path === this.$route.path) {
          this.defaultActive = item.indexStr
        } else if (item.options) {
          this.where(item.options)
        }
      })
    }
  },
  mounted () {
    window.onload = this.setMenuHeigth()
    window.addEventListener('resize', function () {
      let winH = window.innerHeight
      let menuHeigth = winH - 90
      let content = document.getElementById('content')
      let tac = document.getElementById('tac')
      content.style = `height: ${menuHeigth}px`
      tac.style = `height: ${menuHeigth}px`
    })
    this.where(this.menus)

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
  overflow: hidden;
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
  display: inline-block;
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
.qisimiaoxiang {
  display: inline-block;
  color: white;
  height: 100%;
  /* width: 100%; */
  line-height: 50px;
}
.button-area {
	height: 90px;
	width: 820px;
  line-height: 90px;
  /* display: inline-block; */
  float: right;
  vertical-align: middle;
}
</style>