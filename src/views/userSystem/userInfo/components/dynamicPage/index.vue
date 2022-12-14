<template>
  <div class="dynamic-wrapper">
    <div class="active-wrapper">
      <div class="dynamic-title">活跃度统计图</div>
      <active-line />
    </div>
    <div class="timeline-wrapper">
      <div class="dynamic-title">近期动态</div>
      <a-timeline class="padding24" mode="left" style="margin-top: 35px">
        <a-timeline-item v-for="(item, index) in timelineList" :key="index" :color="item.color">
          <p>{{ item.time }}</p>
          {{ item.title }}
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script>
import activeLine from './activeLine.vue';
export default {
  name: 'dynamic',
  components: { activeLine },
  data() {
    return {
      timelineList: [
        {
          title: '优化角色控制权限，用户可绑定多个角色',
          time: '2022-12-14',
          color: 'gray'
        },
        {
          title: '',
          time: '...',
          color: 'gray'
        },
        {
          title: '添加页面loading模块，方法有点low，写了很多个组件，看到可以用svg去时间loading动画，后续研究下再改进',
          time: '2022-12-13',
          color: 'gray'
        },
        {
          title: '异步加载AMap,去除本地的kriging',
          time: '2022-12-08',
          color: 'gray'
        },
        {
          title: '优化webpack',
          time: '2022-12-05',
          color: 'gray'
        },
        {
          title: '打王者，休息休息',
          time: '2022-11-28',
          color: 'gray'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.dynamic-title {
  font-size: 1rem;
  margin-bottom: 15px;
}
.timeline-wrapper {
  margin-top: 24px;
}
</style>
