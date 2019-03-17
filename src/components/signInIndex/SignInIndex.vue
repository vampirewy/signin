<template>
  <div class="sign_in_index" :style="this.showPop?'position:fixed':''" v-if="showPage">
    <!-- 两种情况 1、一种是有活动；2、一种是没有活动 -->
    <div class="status_one" v-if="status">
      <div class="one">
        <header>
          <div class="header">
            <div class="title">
              <div class="arrow">
                <!-- <img src="../../image/index/arrow.png" alt> -->
              </div>
              <!-- <p class="another_title">每日签到</p> -->
              <p @click="goWinDetails">奖励明细</p>
            </div>
          </div>
        </header>
        <section>
          <p class="main">暂时没有签到活动哦～</p>
        </section>
      </div>
      <!-- <footer>
        <div class="footer">
          <p class="text">更多低价商品</p>
        </div>
      </footer>-->
    </div>
    <div class="status_two" v-if="!status">
      <header>
        <div class="header">
          <div class="title">
            <div class="arrow">
              <!-- <img src="../../image/index/arrow.png" alt> -->
            </div>
            <!-- <p class="another_title">每日签到</p> -->
            <p @click="goWinDetails">奖励明细</p>
          </div>
        </div>
      </header>
      <section>
        <div class="section">
          <div class="section_content">
            <div class="top">
              <!-- 两种状态样式切换 1、连续签到赢大礼 2、连续天数 -->
              <div class="first_sign" v-if="topTextStatus">
                <p>
                  连续签到
                  <span>赢大礼</span>
                </p>
                <p class="level_two_text">{{h2Text}}</p>
              </div>
              <div class="unfirst_sign" v-if="!topTextStatus">
                <p>连续天数</p>
                <p>{{continueDays}}<span>天</span></p>
                <p>{{h2Text}}</p>
              </div>
            </div>
            <div class="middle">
              <!-- 签到天数 -->
              <!-- 两种状态 1、7天 2、14天 -->
              <div class="continuous_sign">
                <ul class="seven_days" v-if="daysStatus">
                  <li
                    v-for="(item,index) in daysData"
                    :key="index"
                    :class="(item.singFlag===1)?'light_border':(item.singFlag===-1?'miss_sign':'')"
                  >
                    <span class="sign_text">{{item.dayNum}}</span>
                    <img
                      :class="item.imgStatus===1?'money_redpacket_doubleredpacket':(item.imgStatus===2?'doubelmoney':'redpacket') "
                      :src="item.awardWay"
                      alt
                    >
                    <span class="sign_money">{{item.totalAmount}}</span>
                  </li>
                </ul>

                <ul class="fourteen_days" v-if="!daysStatus">
                  <li
                    v-for="(item,index) in daysData"
                    :key="index"
                    :class="(item.singFlag===1)?'light_border':(item.singFlag===-1?'miss_sign':'')"
                  >
                    <span class="sign_text fourteen_gray_text">{{item.dayNum}}</span>
                    <img
                      :class="item.imgStatus===1?'fourteen_money_redpacket_doubleredpacket':(item.imgStatus===2?'fourteen_doubelmoney':'fourteen_redpacket') "
                      :src="item.awardWay"
                      alt
                    >
                    <span class="sign_money fourteen_gray_money">{{item.totalAmount}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              @click="popWindow"
              :class="buttonText===`已签到`?'unactive_bottom bottom':'bottom'"
            >{{buttonText}}</div>
          </div>
        </div>
      </section>
      <footer>
        <div class="footer">
          <h5>签到规则</h5>
          <div class="text_content">
            <p>1.每天可签到一次并百分百获得奖励,奖励将实时发放到您的账户(具体奖励以实际发放为准);</p>
            <p>2.连续签到可获得额外的奖励,连续签到天数越长奖励越丰富,连续签到奖励与每日签到奖励可叠加领取;</p>
            <p>3.完成签到周期后将开启新的周期,周期内漏签则需重新计算连续签到天数;</p>
            <p>4.红包需在有效期内使用,红包过期即刻失效,红包详情请在我的-我的红包中查看;</p>
            <p>5.余额奖励和红包可以叠加使用,奖励金额不可提现;</p>
          </div>
          <p class="belongs">(最终解释权归拼便宜公司所有)</p>
        </div>
      </footer>
    </div>
    <!-- 弹窗  -->
    <div v-if="showPop" class="pop_window">
      <div class="pop_layer">
        <section class="pop_content" v-if="showText">
          <p>恭喜您,签到成功!</p>
          <div>
            <p>连续签到{{signNum}}天</p>
            <p>
              <span
                v-if="win.walletAmount&&win.redPacketAmount"
              >已获得{{win.walletAmount}}元奖励及{{win.redPacketAmount}}元红包</span>
              <span v-if="win.walletAmount&&!win.redPacketAmount">已获得{{win.walletAmount}}元奖励</span>
              <span v-if="!win.walletAmount&&win.redPacketAmount">已获得{{win.redPacketAmount}}元红包</span>
            </p>
          </div>
          <button class="iknow_button" @click="iKnow">我知道了</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
/** 7天的图标 */
import moneyGray from "@/image/index/sevenDays/money.png";
import doubelmoneyGray from "@/image/index/sevenDays/doubelmoney.png";
import doubleredpacketGray from "@/image/index/sevenDays/doubleredpacket.png";
import moneyredpacketGray from "@/image/index/sevenDays/moneyredpacket.png";
import redpacketGray from "@/image/index/sevenDays/redpacket.png";
import moneyLight from "@/image/index/sevenDays/moneylight.png";
import doubelmoneyLight from "@/image/index/sevenDays/doubelmoneylight.png";
import doubleredpacketLight from "@/image/index/sevenDays/doubleredpacketlight.png";
import moneyredpacketLight from "@/image/index/sevenDays/moneyredpacketlight.png";
import redpacketLight from "@/image/index/sevenDays/redpacketlight.png";
import missSign from "@/image/index/sevenDays/missSign.png";
/** 14天 */
import fourteenMoneyGray from "@/image/index/fourteenDays/moneyfourteen.png";
import fourteenMoneyLight from "@/image/index/fourteenDays/fourteenmoneylight.png";
import fourteenDoubelmoneyGray from "@/image/index/fourteenDays/doubelmoneyfourteen.png";
import fourteenDoubelmoneyLight from "@/image/index/fourteenDays/fourteendoubelmoneylight.png";
import fourteenDoubleredpacketGray from "@/image/index/fourteenDays/doubleredpacketfourteen.png";
import fourteenDoubleredpacketLight from "@/image/index/fourteenDays/fourteendoubleredpacketlight.png";
import fourteenRedpacketGray from "@/image/index/fourteenDays/redpacketfourteen.png";
import fourteenRedpacketLight from "@/image/index/fourteenDays/fourteenredpacketlight.png";
import fourteenMoneyRedpacketGray from "@/image/index/fourteenDays/moneyredpacketfourteen.png";
import fourteenMoneyRedpacketLight from "@/image/index/fourteenDays/fourteenmoneyredpacketlight.png";
import fourteenMiss from "@/image/index/fourteenDays/fourteenMissSign.png";
export default {
  name: "signInIndex",
  data() {
    return {
      timer: null,
      showPage: false,
      status: null, //签到页/没有签到活动页
      topTextStatus: null, //连续签到赢大礼 连续天数
      daysStatus: null, //7天(默认) 14天
      showPop: false, //弹窗
      showText: false, //文字后与图片出来
      h2Text: ``,
      continueDays: null, //连续签到天数(顶部文字)
      ruleId: ``,
      signDays: ``, //点击需签到的天数
      signNum: ``, //重签的天数和连续签到的天数
      buttonText: ``, //立即签到 重新签到
      win: {},
      //imgStatus样式 1为一个金币、金币+红包、双红包、漏签，2为双金币，3为单红包
      //imgState 默认false，为未点亮的图标， true为点亮的图标
      //bgLight true表示点亮加样式
      daysData: []
    };
  },
  methods: {
    firstDataRequest() {
      /**
       * ruleCycle 签到周期 7 or 14
       * continueSignDays 连续签到天数
       * missesSignDays 漏签天数
       * signShowText 签到日历上方的文字
       * signStatus 签到状态 0未签到 1已签到 -1漏签
       * ruleId 签到人Id
       * signAwardVOList 签到奖励
       * 1.awardWay 奖励方式_1-钱包、2-红包、11-钱包+钱包、12-钱包+红包、22-红包+红包
       * 2.redPacketAmount 红包金额
       * 3.singFlag  是否前一天已经签到
       * 4.totalAwardAmount 总金额
       * 5.walletAmount 钱包金额
       */
      this.axios.get(`${this.url}/user/sign`).then(
        res => {
          console.warn(res);
          if (res.data.statusCode === 2000) {
            if (res.data.body.ruleExistFlag) {
              this.ruleId = res.data.body.ruleId;
              this.signDays = res.data.body.continueSignDays + 1;
              res.data.body.signStatus === 0
                ? (this.buttonText = `立即签到`)
                : res.data.body.signStatus === 1
                ? (this.buttonText = `已签到`)
                : (this.buttonText = `重新签到`);
              console.log(res.data.body);
              this.topTextInfor(
                res.data.body.continueSignDays,
                res.data.body.missesSignDays,
                res.data.body.signShowText
              );
              this.sevenOrFourteenCycle(res.data.body.ruleCycle);
              this.daysLists(
                res.data.body.signAwardVOList,
                res.data.body.missesSignDays
              );
            } else {
              this.status = true;
            }
            setTimeout(() => {
              this.showPage = true;
            }, 300);
          } else {
            Toast({ message: res.data.msg, duration: 1200 });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    /**
     * @continueDays 是否有签到
     * @text 没有签到，头部显示2级标题文字
     */
    topTextInfor(continueDays, lostDays, text) {
      if (!continueDays && !lostDays) {
        this.h2Text = text;
        this.topTextStatus = true;
      } else {
        this.h2Text = `(${text})`;
        this.topTextStatus = false;
      }
      this.continueDays = continueDays;
    },
    sevenOrFourteenCycle(cycle) {
      cycle === 7 ? (this.daysStatus = true) : (this.daysStatus = false);
    },
    /** 天数列表 */
    daysLists(daysList, missDay) {
      console.log(daysList);
      //   awardWay:'',  //图片
      //   dayNum:'', //天数
      //   totalAmount:'', //总数
      //   singFlag:'', //是否签到
      //   imgStatus:'', //样式，根据awardWay判断
      let list = [];
      daysList.forEach((el, index) => {
        let awardWay = null;
        if (this.daysStatus) {
          switch (el.singFlag) {
            case -1:
              awardWay = missSign;
              break;
            case 0:
              awardWay =
                el.awardWay === 1
                  ? moneyGray
                  : el.awardWay === 2
                  ? redpacketGray
                  : el.awardWay === 11
                  ? doubelmoneyGray
                  : el.awardWay === 12
                  ? moneyredpacketGray
                  : doubleredpacketGray;
              break;
            case 1:
              awardWay =
                el.awardWay === 1
                  ? moneyLight
                  : el.awardWay === 2
                  ? redpacketLight
                  : el.awardWay === 11
                  ? doubelmoneyLight
                  : el.awardWay === 12
                  ? moneyredpacketLight
                  : doubleredpacketLight;
              break;
          }
        } else {
          switch (el.singFlag) {
            case -1:
              awardWay = missSign;
              break;
            case 0:
              awardWay =
                el.awardWay === 1
                  ? fourteenMoneyGray
                  : el.awardWay === 2
                  ? fourteenRedpacketGray
                  : el.awardWay === 11
                  ? fourteenDoubelmoneyGray
                  : el.awardWay === 12
                  ? fourteenMoneyRedpacketGray
                  : fourteenDoubleredpacketGray;
              break;
            case 1:
              awardWay =
                el.awardWay === 1
                  ? fourteenMoneyLight
                  : el.awardWay === 2
                  ? fourteenRedpacketLight
                  : el.awardWay === 11
                  ? fourteenDoubelmoneyLight
                  : el.awardWay === 12
                  ? fourteenMoneyRedpacketLight
                  : fourteenDoubleredpacketLight;
              break;
          }
        }
        list.push({
          awardWay: awardWay,
          dayNum: `第${el.dayNum}天`,
          singFlag: el.singFlag,
          redPacketAmount: el.redPacketAmount,
          walletAmount: el.walletAmount,
          totalAmount: `+${el.totalAwardAmount}`,
          imgStatus:
            el.awardWay === 1 ||
            el.awardWay === 12 ||
            el.awardWay === 22 ||
            el.singFlag === -1
              ? 1
              : el.awardWay === 11
              ? 2
              : 3
        });
        this.daysData = list;
      });
      console.log(this.daysData);
    },
    goWinDetails() {
      this.$router.push("/winDetails");
    },
    popWindow() {
      console.info(`签到按钮`);
      // this.showPop=true;
      // this.showText=true;
      if (this.buttonText === `已签到`) {
        return;
      } else if (this.buttonText === `重新签到`) {
        let dayNum = 1;
        this.reStartContinue(dayNum);
      } else {
        this.reStartContinue(this.signDays);
      }
      // this.buttonText === `已签到` ? "" : (this.showPop = true);
    },
    reStartContinue(dayNum) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.axios
          .post(`${this.url}/user/sign`, {
            ruleId: this.ruleId,
            signDayNum: dayNum
          })
          .then(
            res => {
              if (res.data.statusCode === 2000 && res.data.body) {
                this.showPop = true;
                setTimeout(() => {
                  this.showText = true;
                }, 100);
                this.daysData.forEach((el, index) => {
                  if (index === dayNum - 1) {
                    this.signNum = dayNum;
                    this.win.redPacketAmount = el.redPacketAmount;
                    this.win.walletAmount = el.walletAmount;
                  }
                });
              } else {
                Toast({ message: res.data.msg, duration: 1200 });
              }
            },
            error => {
              console.log(error);
            }
          );
      }, 800);
    },
    /**
     * 点击我知道后，立即签到/重新签到变成已签到字样
     * 即判断 showPop为true时 buttonText的文字
     */
    iKnow() {
      console.info(`我知道了`);
      this.firstDataRequest();
      setTimeout(() => {
        this.showPop = false;
      }, 300);
    }
  },
  created() {
    this.firstDataRequest();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../less/reset.less";
@colorFFF: #fff;
@bgColor: #f0f0f0;
@textColor: #eb8771;
@statusBG: #fff;
@ruleColor: #666;
@ruleText: #999;
@topTextFirstColor: #333;
@winGiftColor: #fd5d67;
@button: #e9686c;
@buttonUnactive: #c4c7c9;
@popWindowBg: #000;
@signSuccessText: #e9686c;
@signTextColor: #666;
.trans(){
  transition: all 2s linear;
};
.sign_in_index {
  position: relative;
  width: 100%;
  height: 100%;
  .status_one {
    .one {
      background: url("~@/image/anotherindex/background.png") no-repeat;
      background-size: 100% 100%;
      .height(550/2);
      .main {
        color: @colorFFF;
        text-align: center;
        .font-size(19);
        .margin-top(110);
      }
    }
    .footer {
      background: @bgColor;
      display: flex;
      justify-content: center;
      .text {
        .margin-top(70);
        color: @colorFFF;
        .padding-top(28/2);
        .width(375/2);
        .height(102/2);
        .font-size(18);
        background: @textColor;
        .border-radius(51/2);
      }
      .min-height((1334-550)/2);
    }
  }
  .header {
    // position:fixed;
    //   top:0;
    //   right:0;
    //   left:0;
    //   bottom:0;
    //   z-index:100;
    .title {
      display: flex;
      color: @colorFFF;
      justify-content: space-between;
      align-items: center;
      .padding(10, 15, 10, 15);
      .arrow {
        width: 33.33%;
        img {
          float: left;
          .height(39/2);
          .width(21/2);
        }
      }
      p {
        width: 33.33%;
        &.another_title {
          .font-size(18);
        }
        &:last-child {
          .font-size(15);
          text-align: right;
        }
      }
    }
  }
  .status_two {
    background: url("~@/image/index/background.png") no-repeat;
    background-size: 100% 100%;
    .height(550/2);
    .section {
      background: url("~@/image/index/contentLogo.png") no-repeat;
      background-size: 100% 100%;
      .margin-right(28/2);
      .margin-left(28/2);
      // min-height:100%;
      .min-height(1100/2);
      &_content {
        .top {
          .first_sign {
            font-weight: 500;
            .padding-top(100);
          }
          .first_sign > p {
            color: @topTextFirstColor;
            .margin-bottom(14);
            position: relative;
            .font-size(30);
            > span {
              color: @winGiftColor;
            }
            .level_two_text {
              .font-size(15);
            }
          }
          .first_sign .level_two_text {
            .font-size(15);
            color: @topTextFirstColor;
          }
          .first_sign .level_two_text:before {
            content: "";
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(205, 205, 205, 1) 100%
            );
            height: 4px;
            display: inline-block;
            width: 44px;
            border-radius: 2px;
            position: relative;
            top: -5px;
            right: 5px;
          }
          .first_sign .level_two_text:after {
            content: "";
            background: linear-gradient(
              90deg,
              rgba(205, 205, 205, 1) 0%,
              rgba(255, 255, 255, 1) 100%
            );
            height: 4px;
            display: inline-block;
            width: 44px;
            border-radius: 2px;
            position: relative;
            top: -4px;
            right: -5px;
          }
        }
        .continuous_sign {
          .margin-left(57.5/2);
          .margin-right(57.5/2);
          .margin-bottom(51/2);
          .seven_days,
          .fourteen_days {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              // overflow: hidden;
              .width(118/2);
              // .height(144/2);
              .border-radius(2.5);
              .border(2px, #e7e7e7);
              .margin-bottom(8);
              &:last-child {
                width: 47%;
              }
            }
          }
          .fourteen_days > li {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .width(98/2);
            // .height(120/2);
            .border-radius(2.5);
            .border(2px, #e7e7e7);
            .margin-bottom(8);
            &:last-child {
              width: 38%;
            }
          }
          .sign_text {
            .margin-top(4);
            .font-size(10);
          }
          .sign_money {
            .font-size(11);
            .margin-bottom(5);
          }
        }
        .bottom,
        a {
          display: block;
          text-align: center;
          .margin-left(92.5/2);
          .margin-right(92.5/2);
          text-align: center;
          background: @button;
          color: @colorFFF;
          .border-radius(2.5);
          .font-size(18);
          .padding-top(23.5/2);
          .padding-bottom(23.5/2);
        }
        .unactive_bottom {
          background: @buttonUnactive;
        }
      }
    }
    .unfirst_sign {
      .padding-top(100);
      .margin-bottom(10); //7天 14天有区别
      > p {
        &:first-child {
          .font-size(15);
        }
        &:nth-child(2) {
          color: @topTextFirstColor;
          font-weight: 600;
          .font-size(50);
          > span {
            .font-size(15);
          }
        }
        &:last-child {
          .font-size(13);
          color: @topTextFirstColor;
        }
      }
    }
    .unfirst_sign_mt_fourteen {
      // .margin-bottom(10);
    }
    .footer {
      .min-height(453/2);
      font-weight: 400;
      .margin-right(47.5/2);
      .margin-left(47.5/2);
      .margin-bottom(63/2);
      .padding(27/2, 15, 21, 15);
      box-shadow: 0px 0px 17px 4px rgba(220, 220, 220, 0.58);
      font-weight: 400;
      .border-radius(5);
      h5 {
        color: @ruleColor;
        .font-size(18);
        text-align: left;
        .margin-bottom(18);
      }
      .text_content {
        .font-size(11);
        color: @ruleText;
        text-align: left;
        p {
          .margin-bottom(3);
        }
      }
      .belongs {
        .font-size(12);
        color: @ruleColor;
        .margin-top(35/2);
      }
    }
  }
  .pop_window {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100;
  }
  .pop_layer {
    // opacity: 0;
    position: fixed;
    background: #fff;
    z-index: 100;
    // .height(846/2);
    .width(543/2);
    display: flex;
    align-items: center;
    .margin-left(104.5/2);
    .margin-right(104.5/2);
    background: url("~@/image/index/popwindow.png") no-repeat;
    background-size: 100% 100%;
    // .margin-top(100);
    -webkit-transform: translateY(25%);
    -moz-transform: translateY(25%);
    -ms-transform: translateY(25%);
    -o-transform: translateY(25%);
    transform: translateY(25%);
  }
  .pop_layer:hover {
    opacity: 1;
    transition: opacity 2s linear;
  }
  .pop_content {
    width: 100%;
    .margin-top(350/2);
    > p {
      color: @signSuccessText;
      .font-size(20);
      font-weight: 500;
      .margin-bottom(58/2);
    }
    > div {
      > p {
        &:first-child,
        &:last-child > span {
          .font-size(15);
          color: @signTextColor;
        }
        &:last-child {
          .margin-top(-20/2);
        }
      }
    }
  }
  .iknow_button {
    .margin-top(74/2);
    .margin-bottom(16);
    background: @button;
    border: none;
    color: @bgColor;
    .height(45);
    .width(180);
    .border-radius(2.5);
    .font-size(18);
  }
  .money_redpacket_doubleredpacket {
    .width(58/2);
    // .height(58/2);
  }
  .redpacket {
    // .width(42/2);
    .height(59/2);
  }
  .doubelmoney {
    // .width(83/2);
    .height(58/2);
  }
  .money_redpacket_doubleredpacket,
  .redpacket,
  .doubelmoney {
    // .margin-top(5);
    // .margin-bottom(5);
  }
  .light_border {
    .border(2px, #f8d9ac) !important;
    background: #fefaed;
  }
  .fourteen_money_redpacket_doubleredpacket {
    // .width(24);
    .height(24);
  }
  .fourteen_redpacket {
    // .width(38/2);
    .height(52/2);
  }
  .fourteen_doubelmoney {
    .width(71/2);
    // .height(50/2);
  }
  .fourteen_money_redpacket_doubleredpacket,
  .fourteen_redpacket,
  .fourteen_doubelmoney,
  .fourteen_gray_text,
  .fourteen_gray_money {
    .margin-top(1);
    .margin-bottom(0.2);
  }
  .miss_sign {
    background: #e6e6e6;
  }
}
</style>
