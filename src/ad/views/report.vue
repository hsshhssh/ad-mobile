<template>
  <div>
    <group :title="'请选择idfa'">
      <selector :options="idfaList" v-model="idfaValue"></selector>
    </group>

    <group title="请输入ip">
      <x-input v-model="ipValue"></x-input>
    </group>

    <group :title="'请选择游戏'">
      <selector :options="appList" v-model="appValue"></selector>
    </group>

    <flexbox class="submitButton">
      <flexbox-item>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary" @click="onSubmit">上报</x-button>
      </flexbox-item>
      <flexbox-item>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
  import { Selector, XInput, XButton, Flexbox, FlexboxItem, Group } from '../../components';
  import { testReportUrl, testReportData } from 'src/ad/js/report'

  export default {
    components: {
      Group,
      Selector,
      XInput,
      XButton,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        idfaValue: '',
        idfaList: [],
        ipValue: '127.0.0.1',
        appValue: '',
        appList: []
      }
    },
    methods: {
      // 获取上报数据
      getTestReportData() {
        testReportData().then(response => {
          if(response.status == 200) {
            // idfa列表
            response.data.idfaPageResult.list.forEach(u => {
              this.idfaList.push({ value: u.name + '(' + u.value + ')', key: u.value })
            })
            if (this.idfaList.length > 0) {
                this.idfaValue = this.idfaList[0].key
            }

            // 默认ip
            this.ipValue = response.data.defalutIP

            // 推广游戏用用
            response.data.appMediaPageResult.list.forEach(u => {
              this.appList.push({ value: u.name , key: u.id + '' })
            })
            if (this.appList.length > 0) {
              this.appValue = this.appList[0].key
            }

            console.log(this.idfaValue, this.idfaList, this.ipValue, this.appValue, this.appList)
          }
        })
      },

      // 提交上报
      onSubmit() {
        var data = {
          idfa: this.idfaValue,
          ip: this.ipValue,
          appMediaId: Number(this.appValue)
        }
        testReportUrl(data).then(response => {
          if(response.status == 200) {
            window.location.href = response.data.url
          }
        })
      }
    },
    created() {
      this.getTestReportData();
    },
  }
</script>


<style lang="scss" scoped>
  @import '../../demos/style.css';
  .submitButton {
    padding-top: 50px;
  }

</style>
