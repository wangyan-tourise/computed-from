<template>
  <div @mouseup.capture="mouseUp" @mousemove="mouseMove" id='app'>
    <div class="baseElement" style="background:red" @mousedown.stop="mouseDown">
      <div class="box" v-for="(item,index) in elementList" :key="index">
        <!-- <div class="box2" :style="`background:${val.backgroundColor}`" @mousedown.stop="mouseDown">

          </div> -->
      </div>
    </div>
    <div class="creatForm" style="background:green" @mousedown.stop="mouseDown">
      <creatForm id="computedForm" v-model="fApi" :rule="rule" :option="option"></creatForm>
    </div>
    <div class="pluginForm" style="background:yellow" @mousedown.stop="mouseDown">
      <div class="box" v-for="(item,index) in pluginList" :key="index">
        <!-- <div class="box2" :style="`background:${val.backgroundColor}`" @mousedown.stop="mouseDown">

          </div> -->
      </div>
    </div>
    <div v-if="moving" class="box" :style="`position:absolute;top:${top}px;left:${left}px`">
      <div class="box">

      </div>
    </div>
  </div>
</template>
<script>
import formCreate from '@form-create/element-ui'
export default {
  name: 'formcreate',
  components: { creatForm: formCreate.$form() },
  data () {
    return {
      // formcreate配置
      rule: [],
      option: {
        ref: 'computedForm',
        global: {
          "*": {
            props: {
              disabled: false
            }
          },
          col: {
            span: 6
          }
        },
        submitBtn: false,
        resetBtn: false,
      },
      fApi: {},
      // 基础表单部分
      elementList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],// 基础组件展示
      boxList: [{}, {}, {}],// 生成的新表单
      pluginList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},], //基础组件配置项
      // 拖拽部分
      moving: false,// 是否正在拖动
      indexData: {},// 当前选择的表单
      oldX: 0,
      oldY: 0,
      top: 0,
      left: 0,
      boxTop: 0,
      boxLeft: 0,

      bottomColor: 'black',
      topColor: 'purple',
      rowCount: 2,
      columnCount: 10,
      pageHeight: '240px'
    }
  },
  methods: {
    hadleChange (newIndex, oldIndex) {
      console.log(newIndex, oldIndex)
      this.pageList[oldIndex] = this.boxShowList
      this.boxShowList = this.pageList[newIndex]
    },
    mouseMove (e) {
      this.top = e.pageY - this.boxTop
      this.left = e.pageX - this.boxLeft
      if (!this.moving) { return }
      for (let i = 0; i < this.rowCount; i++) {
        for (let j = 0; j < this.columnCount; j++) {
          this.boxShowList[i][j].backgroundColor = ''
        }
      }
      let numX = Math.floor(e.pageX / 120)
      let numY = Math.floor(e.pageY / 120)
      if ((0 <= numY) && (numY < this.rowCount) && (0 <= numX) && (numX < this.columnCount)) {
        if (this.boxShowList[numY][numX].id) { return }
        this.boxShowList[numY][numX].backgroundColor = this.bottomColor
      } else {
        this.boxShowList[this.oldY][this.oldX] = this.indexData
        this.indexData = {}
        this.moving = false
      }
    },
    mouseDown (e) {
      this.top = e.pageY - e.offsetY - 20
      this.left = e.pageX - e.offsetX - 35
      let numX = Math.floor(e.pageX / 120)
      let numY = Math.floor(e.pageY / 120)
      if ((0 <= numY) && (numY < this.rowCount) && (0 <= numX) && (numX < this.columnCount) && this.boxShowList[numY][numX].id) {
        this.boxTop = e.offsetY
        this.boxLeft = e.offsetX
        if (!this.boxShowList[numY][numX].id) { return }
        this.indexData = this.boxShowList[numY][numX]
        this.boxShowList[numY][numX] = { backgroundColor: this.bottomColor }
        this.oldX = numX
        this.oldY = numY
        this.moving = true
      }
    },
    mouseUp (e) {
      let numX = Math.floor(e.pageX / 120), numY = Math.floor(e.pageY / 120)
      if ((1 <= this.top <= 480) && (1 <= this.left <= 1080) && (this.boxShowList[numY][numX] && !this.boxShowList[numY][numX].id)) {
        this.boxShowList[numY][numX] = this.indexData
        this.boxShowList[numY][numX].backgroundColor = ''
      } else {
        this.boxShowList[this.oldY][this.oldX] = this.indexData
      }
      this.indexData = {}
      this.moving = false
    },
  },
  created () {

  },
  mounted () {
    for (let i = 0; i < 103; i++) {
      this.boxList.push({ backgroundColor: '' })
    }
    this.boxList.unshift({ id: 'xi', backgroundColor: '', imgSrc: true, button: true }, { id: 'dong', backgroundColor: '', imgSrc: true, button: true })
  },
  watch: {
    // boxList (newVal) {
    // console.log(newVal)
    // let arr1 = [], arr2 = []
    // for (let i = 0; i < newVal.length; i++) {
    //   if (arr2.length === this.rowCount) {
    //     this.pageList.push(arr2)
    //     arr2 = []
    //   }
    //   console.log(this.rowCount, this.columnCount, arr2.length, arr1, arr2)
    //   if (arr1.length < 10) {
    //     arr1.push(newVal[i])
    //   } else if (arr1.length === this.columnCount) {
    //     arr2.push(arr1)
    //     arr1 = []
    //     arr1.push(newVal[i])
    //   }
    // }
    // arr2.push(arr1)
    // this.pageList.push(arr2)
    // arr1 = []
    // arr2 = []
    // this.pages = this.pageList.length
    // this.boxShowList = this.pageList[0]
    // }
  }
}
</script>
<style scoped>
.box {
  width: 200px;
  height: 50px;
  background: #999;
  opacity: 0.5;
  border-radius: 10px;
  margin: 0;
}
.box:hover {
  box-shadow: blanchedalmond;
}
.baseElement {
  width: 33%;
  height: 100%;
  background: #475669;
  display: inline-block;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: black;
  opacity: 1;
}
.baseElement:hover {
  color: white;
}
.creatForm {
  width: 33%;
  height: 100%;
  background: #475669;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: black;
  opacity: 1;
}
.creatForm:hover {
  color: white;
}

.pluginForm {
  width: 33%;
  height: 100%;
  background: #475669;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: black;
  opacity: 1;
}
.pluginForm:hover {
  color: white;
}
</style>