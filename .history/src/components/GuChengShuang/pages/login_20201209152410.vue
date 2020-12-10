<template>
<div id='app'>
<div class="box3" v-if="val.imgSrc">
 <img src="./backImg/tou1.jpg" alt="" width="50px" height="50px">
</div>
<div class="box3" v-if="val.button">
<span>编辑</span>|<span>删除</span>
</div>
</div>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>