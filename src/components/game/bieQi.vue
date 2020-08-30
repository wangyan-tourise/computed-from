<template>
  <div id='app'>
    <div class="cover" v-if="isStart">
    </div>
		<div class="gameStart" v-if="isStart">
				<div style="overflow:hidden">游戏规则：</div>
				<span style="float:right">1:第一步不得堵死 <br>
				2:每次只能走一步<br>
				3:每一步的思考时间为1s,<br>超时即为输<br>
				4:超过三十步即为和棋</span>
				<el-button type="primary" round class="startBtn" @click="startGame">开始游戏</el-button>
			</div>
    <div>
      <div class="timeOut">倒计时</div>
      <div class="qiPan">
        <img src="../../assets/image/back1.png" class="backImage1" alt="">
        <img src="../../assets/image/back2.png" class="backImage2" alt="">
        <!-- <div class="backImage1">棋盘上</div>
        <div class="backImage2">棋盘下</div> -->
      </div>
      <div style="float:right">计步器</div>
    </div>
  </div>
</template>
<script>
export default {
	name:'bieQi',
	data(){
		return{
			isStart:true
		}
	},
	methods:{
		startGame(){
			this.isStart = false
		}
	}

}
</script>
<style scoped>
#app{
	position: relative;
}
.cover{
	width: 100%;
	height: 100%;
	background-color: black;
	opacity: 0.7;
	position: absolute;
	top: 0;
	left: 0;
}
.gameStart{
	width: 350px;
	height: 49%;
	margin: 100px auto;
	background-image: url('../../assets/image/fang1.jpg');
	background-repeat: no-repeat;
	background-size: 100%;
	border: 1px solid blue;
	border-radius: 10px;
	padding: 5px;
	position: absolute;
	top: 0;
	left: 34%;
}
.backImage1 {
  width: 500px;
  height: 300px;
  /* background-image: url("../../assets/image/back1.png"); */
}
.backImage2 {
  width: 500px;
  height: 200px;
  /* background-image: url("../../assets/image/back2.png"); */
}
.qiPan {
  float: left;
  display: flex;
  flex-direction: column;
}
.startBtn{
	margin: 0 34%;
	position: absolute;
	bottom: 20px;
}
.timeOut{
	float: left;
	width: 25%;
}
</style>