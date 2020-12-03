<template>
  <div id='app'>
    <div class="content">
      <div class="box" @mouseup.capture="mouseUp" @mousemove="mouseMove">
        <el-carousel indicator-position="outside" :height="pageHeight" :autoplay="false" @change="hadleChange">
          <el-carousel-item v-for="item in pages" :key="item">
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
                <div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

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
      rowCount: 3,
      columnCount: 8,
      pageHeight: '360px'
    }
  },
  methods: {
    hadleChange (newIndex, oldIndex) {
      console.log(newIndex, oldIndex)
      this.pageList[oldIndex] = this.boxShowList
      this.boxShowList = this.pageList[newIndex]
    },
    mouseMove (e) {
      this.top = e.pageY - this.boxTop - 70
      this.left = e.pageX - this.boxLeft - 70
      if (!this.moving) { return }
      let numX = Math.floor((e.pageX - 70) / 120), numY = Math.floor((e.pageY - 70) / 120)
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
          this.boxShowList[i][j].backgroundColor = ''
        }
      }
      console.log(numY, numX)
      this.boxShowList[numY][numX].backgroundColor = this.bottomColor
    },
    mouseDown (e) {
      this.top = e.pageY - e.offsetY - 70
      this.left = e.pageX - e.offsetX - 70
      this.boxTop = e.offsetY
      this.boxLeft = e.offsetX
      let numX = Math.floor((e.pageX - 70) / 120), numY = Math.floor((e.pageY - 70) / 120)
      this.indexData = this.boxShowList[numY][numX]
      let id = this.boxShowList[numY][numX].id
      this.boxShowList[numY][numX] = { 'id': id, backgroundColor: this.bottomColor }
      this.oldX = numX
      this.oldY = numY
      this.moving = true
    },
    mouseUp (e) {
      console.log('抬起')
      let numX = Math.floor((e.pageX - 70) / 120), numY = Math.floor((e.pageY - 70) / 120)
      if ((1 <= this.top <= 480) && (1 <= this.left <= 1080)) {
        let id = this.boxShowList[numY][numX].id
        this.boxShowList[numY][numX] = this.indexData
        this.boxShowList[numY][numX].id = id
      } else {
        this.boxShowList[this.oldY][this.oldX] = this.indexData
      }
      this.boxShowList[numY][numX].backgroundColor = ''
      this.moving = false
    },
	},
	created(){
		
	},
  mounted () {
    for (let i = 0; i < 103; i++) {
      this.boxList.push({ id: i, backgroundColor: '' })
    }
    this.boxList.unshift({ id: 'xi', backgroundColor: '', imgSrc: true, button: true })
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
      console.log(this.pageList.length)
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