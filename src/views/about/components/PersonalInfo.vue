<template>
  <div class="personal-wrapper">
    <el-collapse accordion v-model="activeNames">
      <el-collapse-item name='1'>
        <template slot="title">
          <i class="header-icon el-icon-user-solid"></i>
          基本信息
        </template>
        <div v-for="(value, key, index) in info" :key="index">
          <span>{{key}}：</span>
          <span class="value">{{value}}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-school"></i>
          教育经历
        </template>
        <div v-for="(value, key, index) in education" :key="index">
          <span>{{key}}：</span>
          <span class="value">{{value}}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-s-home"></i>
          工作经历
        </template>
        <div v-for="(value, key, index) in work" :key="index">
          <span>{{key}}：</span>
          <span class="value">{{value}}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-s-platform"></i>
          项目经历
        </template>
        <div v-for="(value, index) in project" :key="index">
          <div>
            <span>项目名称：</span>
            <span class="value">{{value.projectName}}</span>
          </div>
         <div>
            <span>项目时间：</span>
            <span class="value">{{value.projectTime}}</span>
         </div>
          <div>
            <span>项目描述：</span>
            <span class="value">{{value.projectDesc}}</span>
          </div>
          <div>
            <span>项目技术：</span>
            <ul class="list">
              <li v-for="item in value.projectSkill" :key="item">
                <span class="value">{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      info: {
        '姓名': '陈佳兵',
        '年龄': 25,
        '职业': 'Web前端工程师',
        '电话': 13933762163,
        '邮箱': '1014984541@qq.com',
        '居住地址': '北京市海淀区山水小区'
      },
      education: {
        '学校名称': '河北科技学院',
        '时间': '2012.09 - 2016.07',
        '专业': '计算机应用',
        '证书': '本科'
      },
      work: {
        '公司名称': '北京神州风云科技有限公司',
        '工作时间': '2017.05 - 2019.04',
        '职位': 'Web前端工程师',
        '职责': '1.搭建、开发项目，2.项目优化，3.项目维护、更新迭代'
      },
      project: [{
        projectName: '陈佳兵个人简历网站',
        projectTime: '2019.12.31 - 2020.01.20',
        projectDesc: '这是一个展示个人信息的网站',
        projectSkill: [
          '1.vue-cli 3.0',
          '2.Elementui',
          '3.nodejs koa-2',
          '4.mysql'
        ]
      }]
    }
  }
}
</script>
<style scoped>
.personal-wrapper {
  font-weight: 700;
}
>>>.el-collapse-item__header {
  font-size: 20px;
  font-weight: 700;
  padding: 0 40px;
  background: #f5f5f5;
}
>>>.el-collapse-item__content {
  font-size: 18px;
  padding: 0 40px;
}
.header-icon {
  margin-right: 10px;
}
.value {
  font-weight: 400;
  font-size: 16px;
}
.list {
  margin-left: 96px;
  margin-top: -30px;
}
>>>.el-collapse-item__wrap {
  background: url('../../../assets/images/palm-leaf.png');
}
</style>