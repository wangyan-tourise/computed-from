<template>
  <div id='app'>
    <div class="content">
      <div class="box" @mouseup.capture="mouseUp" @mousemove="mouseMove">
            <div v-for="(i,index) in boxShowList" :key="index" class="ul">
              <div class="box1" v-for="val in i" :key="val.id">
                <div class="box2" :style="`background:${val.backgroundColor}`" @mousedown.stop="mouseDown">
                  <div class="box3" v-if="val.imgSrc">
                    <img src="./backImg/tou1.jpg" alt="" width="50px" height="50px">
                  </div>
                  <div class="box3" v-if="val.button">
                    <span>编辑</span>|<span>删除</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="moving" class="box1" :style="`z-index:2;position:absolute;top:${top}px;left:${left}px`">
              <div class="box2" :style="`background:${topColor}`">
                <div class="box3" v-if="indexData.imgSrc">
                  <img src="./backImg/tou1.jpg" alt="" width="50px" height="50px">
                </div>
                <div class="box3" v-if="indexData.button">
                  <span>编辑</span>|<span>删除</span>
                </div>
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
      boxList: [],
      boxShowList: [],
      pageList: [],
      pages: 4,
      indexData: {},
      moving: false,
      top: 0,
      left: 0,
      boxTop: 0,
      boxLeft: 0,
      oldX: 0,
      oldY: 0,
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
    boxList (newVal) {
      // console.log(newVal)
      let arr1 = [], arr2 = []
      for (let i = 0; i < newVal.length; i++) {
        if (arr2.length === this.rowCount) {
          this.pageList.push(arr2)
          arr2 = []
        }
        console.log(this.rowCount, this.columnCount, arr2.length, arr1, arr2)
        if (arr1.length < 10) {
          arr1.push(newVal[i])
        } else if (arr1.length === this.columnCount) {
          arr2.push(arr1)
          arr1 = []
          arr1.push(newVal[i])
        }
      }
      arr2.push(arr1)
      this.pageList.push(arr2)
      arr1 = []
      arr2 = []
      this.pages = this.pageList.length
      this.boxShowList = this.pageList[0]
    }
  }
}
</script>
<style scoped>
#app {
  width: 100%;
  height: 100%;
  background-color: purple;
}
.content {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  background: #999;
  opacity: 0.5;
  border-radius: 10px;
  margin: 0;
}
.box1 {
  width: 120px;
  height: 120px;
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
  border-radius: 10px;
  color: #999;
  opacity: 1;
}
.ul {
  height: 120px;
  display: flex;
  flex-direction: row;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>