<template>
  <div id='app'>
    <Management :columns="columns" :buttonName='buttonName' :url="url" :tableHead="tableHead"></Management>
  </div>
</template>
<script>
import Management from './management';

export default {
  name: 'business',
  components: {
    Management,
  },
  data() {
    return {
      buttonName: ['添加业务大类', '添加产品归属'],
      url: {
        req: '/category/query',
        edit: '/category/saveInfo',
        del: '/category/delete',
      },
      tableHead: {
        code: 1,
        name: '分类名称',
        describe: '分类描述',
        type: '类型',
        count: '指标数量',
        indexCount: 'indexCount',
        errMesg: '请选择业务大类！',
        dimensionsNumber: '维度数量',
      },
      columns: [
        {
          prop: 'name',
          label: '分类名称',
          minWidth: 180,
          align: 'left',
          headerAlign: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'description',
          label: '分类描述',
          minWidth: 120,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'typeName',
          label: '类型',
          minWidth: 117,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'indexCount',
          label: '指标数量',
          minWidth: 100,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'dimensionCount',
          label: '维度数量',
          minWidth: 100,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'creatorErp',
          label: '创建人',
          minWidth: 160,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'createdDate',
          label: '最近更新时间',
          minWidth: 176,
          align: 'center',
          showOverflowTooltip: true,
        },
      ],
    };
  },
  mounted() {
  },
};
</script>
<style scoped>
#app{
	width: 100%;
	height: 100%;
}
</style>
