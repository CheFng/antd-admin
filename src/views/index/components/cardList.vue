<template>
  <div class="cardList-wrapper">
    <a-row :gutter="24">
      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-one" @click="sendTitle('计算机台数', 'computer')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="visit" :size="20" /> 计算机台数 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="1490" :duration="2200" />
            <span class="suffix">万</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                年增长计算机台数：
                <a-space :size="8">
                  <span class="bold">73万</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
              <div class="inline-block">
                同比增长：
                <a-space :size="8">
                  <span class="bold">4.8%</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-two" @click="sendTitle('多媒体教室数', 'duomeiti')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="visit" :size="20" /> 多媒体教室数 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="276" :duration="2200" />
            <span class="suffix">万</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                年增长多媒体教室数：
                <a-space :size="8">
                  <span class="bold">16万</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
              <div class="inline-block">
                同比增长：
                <a-space :size="8">
                  <span class="bold">5.7%</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-three" @click="sendTitle('平板数', 'pingban')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="visit" :size="20" /> 平板数 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="113" :duration="2200" />
            <span class="suffix">万</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                年增长平板数：
                <a-space :size="8">
                  <span class="bold">35万</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
              <div class="inline-block">
                同比增长：
                <a-space :size="8">
                  <span class="bold">30%</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-four" @click="sendTitle('微机室面积', 'weiji')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="visit" :size="20" /> 微机室面积 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="1920" :duration="2200" />
            <span class="suffix">万</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                年增长微机室面积：
                <a-space :size="8">
                  <span class="bold">46万</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
              <div class="inline-block">
                同比增长：
                <a-space :size="8">
                  <span class="bold">2.3%</span>
                  <a-icon type="caret-up" class="up" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  name: 'cardList',
  components: { countTo },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    sendTitle(title, key) {
      this.$emit('sendTitle', title, key);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../styles/mixin.scss';

.cardList-wrapper {
  .card-item {
    box-sizing: border-box;
    height: 150px;
    padding: 15px 15px 0;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 25px;
    box-shadow: 3px 5px 15px rgba(40, 40, 40, 0.36);
    &.card-item-one {
      @include cardBg(#5171fd, #c97afd);
      &:hover {
        box-shadow: 0 5px 10px #c97afd;
      }
    }
    &.card-item-two {
      @include cardBg(#3dadf6, #737bfc);
      &:hover {
        box-shadow: 0 5px 10px #737bfc;
      }
    }
    &.card-item-three {
      @include cardBg(#ea677c, #ef9b5f);
      &:hover {
        box-shadow: 0 5px 10px #ef9b5f;
      }
    }
    &.card-item-four {
      @include cardBg(#42d79b, #a6e25f);
      &:hover {
        box-shadow: 0 5px 10px #a6e25f;
      }
    }
    &:hover {
      transform: scale(1.03);
      transition: all 0.1s ease-out;
    }
    .card-title {
      color: #fff;
      font-size: 1rem;
    }
    .all-count {
      color: #fff;
      font-size: 1.9rem;
      font-weight: bold;
      margin-top: 12px;
      padding-left: 25px;
      .suffix {
        font-size: 0.75rem;
      }
    }
    .card-info {
      color: #fff;
      font-size: 0.85rem;
      height: 46px;
      margin-top: 8px;
      .abs-bottom {
        position: absolute;
        bottom: 7px;
        left: 0;
      }
      .up {
        color: #1afa29;
      }
      .down {
        color: rgb(250, 30, 16);
      }
    }
  }
}
</style>
