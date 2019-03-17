<template>
  <div class="win_page">
    <div class="win_container">
      <header>
        <div class="header">
          <div class="arrow" @click="goSignIn">
            <img src="../image/index/arrow.png" alt>
          </div>
          <p>奖励明细</p>
        </div>
      </header>
      <section>
        <ul class="win_details">
          <!-- <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="allLoaded"> -->
          <li class="bottom-border" v-for="(item,index) in win" :key="index">
            <div class="left">
              <span>{{item.awardName}}</span>
              <span>{{item.signTime}}</span>
            </div>
            <div class="right">
              <p>{{item.awardAmountText}}</p>
            </div>
          </li>
          <!-- </mt-loadmore> -->
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
// import { baseUrl } from "@/config/baseUrl";
export default {
  data() {
    return {
      win: []
    };
  },
  methods: {
    detailsRequest() {
      this.axios
        .get(`${this.url}/user/sign/awardRecord?pageNum=1&pageSize=1000`)
        .then(
          res => {
            console.log(res.data.body);
            this.win = res.data.body;
          },
          error => {
            console.log(error);
          }
        );
    },
    loadBottom() {
      this.allLoaded = true;
      this.$refs.loadmore.onBottomLoaded();
    },
    goSignIn() {
      this.$router.push("/");
    }
  },
  created() {
    this.detailsRequest();
  }
};
</script>

<style scoped lang="less">
@import "../less/reset.less";
@headBg: #ea6e6d;
@headTextColor: #fff;
.win_page {
  .win_container {
    .header {
      position: fixed;
      z-index: 100;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      .height(88/2);
      background: @headBg;
      .padding(10, 15, 10, 15);
      .arrow > img {
        .height(39/2);
        .width(21/2);
      }
      > p {
        width: 100%;
        color: @headTextColor;
        .font-size(18);
      }
    }
    .win_details {
      .margin-top(44);
      .padding-right(35/2);
      .padding-left(35/2);
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left,
        .right {
          .margin-top(13);
        }
        .left {
          display: flex;
          flex-direction: column;
          text-align: left;
          span {
            &:first-child {
              .font-size(15);
              .margin-bottom(19/2);
            }
            &:last-child {
              .font-size(11);
              text-align: left;
              .margin-bottom(11/2);
            }
          }
          .font-size(15);
        }
        .right {
          .font-size(15);
          color: #e96b6e;
        }
      }
    }
  }
}
</style>