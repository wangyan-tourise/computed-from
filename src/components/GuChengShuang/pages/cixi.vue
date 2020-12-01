<template>
  <div id='app'>
    <div class="header">

    </div>
    <div class="content">
      <div class="box">
        <div class="box1" v-for="(item,index) in boxList" :key="index" @mouseover="mouseOver">
          <div class="box2" v-if="item.id" @mousedown="mouseDown" @mouseup="mouseUp">
            <img :src="item.imgSrc" width="50px" height="50px" />
            <div v-if="item.buttons">
              <el-button type="text" size="large" v-for="val in item.buttons" :key="val.title">{{val.title}}</el-button>
            </div>
          </div>
          <div class="box2" v-else>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'formate',
  data () {
    return {
      boxList: [
        {
          id: '01',
          name: '',
          imgSrc: '../../../assets/image/logo.png',
          buttons: [
            {
              title: '编辑',
              methods: 'XXX'
            },
            {
              title: '删除',
              methods: 'XXX'
            }
          ]
        },
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
			],
			indexData:{}
    }
  },
  methods: {
    mouseOver (e) {
      console.log(e)
      // let box1 = document.getElementsByClassName
    },
    mouseDown (e) {
      console.log(e)

    },
    mouseUp () {

    }
  },
  mounted () {

  }
}
</script>
<style scoped>
#app {
  width: 100%;
  height: 100%;
  background-color: purple;
}
.header {
  height: 50px;
  width: 100%;
  opacity: 0.5;
  background-color: white;
}
.content {
  width: 100%;
  height: 645px;
}
.box {
  width: 1200px;
  height: 600px;
  background: #999;
  opacity: 0.5;
  position: relative;
  left: 70px;
  top: 20px;
}
.box1 {
  width: 120px;
  height: 120px;
  background: #999;
  /* position: absolute; */
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
  cursor: move;
}
.box2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}
.is-active {
  background: #334;
  border: 1px solid black;
  border-radius: 10px;
  color: white;
}
</style>