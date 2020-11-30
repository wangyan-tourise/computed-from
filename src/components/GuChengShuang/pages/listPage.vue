<template>
<div id='app'>
	<div class="table">
		<div class="columns">
			<div class="columns-header">项目表头</div>
			<div v-for="(item,index) in listData" :key="index" class="columns-item">
				<span @click="clickMethod(index)">{{item.title}}</span>
			</div>
		</div>
		<div>
			<div class="columns-header">详情表头</div>
			<div class="columns-item">详情内容</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props:{
		// clickMethod:{
		// 	type:Function,
		// 	required: true
		// }
	},
	data(){
		return {
			listData:[
				{
					title:'项目名称',
					id: '00001'
				}
			]
		}
	},
	methods: {
		clickMethod(){
			console.log('选择项目')
		}
	}
}
</script>
<style scoped>
.columns{
	float: left;

}
.columns-header{
	border-top: 1px solid black;
	border-right: 1px solid black;
	border-right: 1px solid black;
	font-weight: 700;
}
.columns-item{
	border: 1px solid black;

}
</style>