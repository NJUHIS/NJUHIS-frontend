<template>
  <div class="fin-container">
    <div class="date-container">
      <p>起止日期：</p>
      <DatePicker
        class="date-picker"
        type="daterange"
        placeholder="选择起止日期"
        v-model="seDate"
        :disabled="isSubmit"
      ></DatePicker>
      <Button class="bt1" type="primary" @click="doSubmit" :loading="isSubmit" >查询</Button>
      <Button class="bt" type="primary" @click="doSubmitW" :loading="isSubmit" >查看近周情况</Button>
      <Button class="bt" type="primary" @click="doSubmitM" :loading="isSubmit" >查看近月情况</Button>
    </div>
    <div class="chart-container">
      <Echart v-if="showGra" :options="finData" :autoresize="true" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { time2str } from "../utils";
import  'echarts/lib/chart/bar';
export default {
  name: "FinStat",
  data: () => ({

              isSubmit: false,
              costVo:{"begintime": 100000000000, "endtime": 100900000000},
              List:[],
              List1:[],
              value: ''

  }),
  computed: {
    seDate: {
      get() {
        const [startTime, endTime] = this.time;

        if (startTime === "") return this.time;
        else return [new Date(startTime), new Date(endTime)];
      },
      set(dates) {
        this.updateTime(dates.map(date => (date === "" ? "" : date.getTime())));
      }
    },
    showGra() {
      return this.finData.xAxis[0].data.length;
    },
    ...mapState({
      time: "finTime",
      finData: "finData"
    })
  },
  methods: {
    doSubmit() {
        this.costVo["begintime"]=this.time[0]
        this.costVo["endtime"]=this.time[1]
        this.getData()
      if (!Number.isInteger(this.time[0])) {
        this.$Message.error({
          background: true,
          content: "请输入合法的起止日期"
        });

        return;
      }
        const data={
            x:[],
            s1:[],
            s2:[],
            a1:[],
            a2:[]
        }
        let q=0

        for (
            let i = this.time[0];
            i < this.time[1];
            i = i + 24 * 60 * 60 * 1000
        ){

            data.x.push(time2str(i))
            data.s1.push(this.List[q].sum)
            data.s2.push(this.List[q].count)
            data.a1.push(this.List1[q].sum)
            data.a2.push(this.List1[q].count)
            q=q+1
        }
        data.x.push(time2str(this.time[1]))
        data.s1.push(0)
        data.s2.push(0)
        data.a1.push(0)
        data.a2.push(0)
        for(let p=0;p<4;p++){
            data.x.push(0)
            data.s1.push(0)
            data.s2.push(0)
            data.a1.push(0)
            data.a2.push(0)
        }
      this.isSubmit = true;
      const that = this;
      const driver = flag =>
        new Promise((res, rej) => {
          setTimeout(() => {

            if (flag) res(data);
            else rej();
          }, 3000);
        });

      driver(1)
        .then(newData => {
          const data = this.finData;
          data.xAxis[0].data = newData.x;
          data.series[0].data = newData.s1;
          data.series[1].data = newData.s2;
          data.series[2].data = newData.a1;
          data.series[3].data = newData.a2;
          data.series[4].data = newData.s;
          data.series[5].data = newData.a;

          that.updateData(data);
        })
        .catch(() => {
          // that.$Message.error({
          //   background: true,
          //   content: "哇哦，查询失败咯！再试一下吧"
          // });
        })
        .finally(() => {
          that.isSubmit = false;
        });
    },
      doSubmitW() {
          this.costVo["begintime"]=this.time[0]
          this.costVo["endtime"]=this.time[1]
          this.getDataW()
          if (!Number.isInteger(this.time[0])) {
              this.$Message.error({
                  background: true,
                  content: "请输入合法的起止日期"
              });

              return;
          }
          const data={
              x:[],
              s1:[],
              s2:[],
              a1:[],
              a2:[]
          }
          let q=0
          for (
              q=0;q<4;q=q+1
          ){

              data.x.push(time2str(this.List[q].begintime))
              data.s1.push(this.List[q].sum)
              data.s2.push(this.List[q].count)
              data.a1.push(this.List1[q].sum)
              data.a2.push(this.List1[q].count)
          }
          this.isSubmit = true;
          const that = this;
          const driver = flag =>
              new Promise((res, rej) => {
                  setTimeout(() => {

                      if (flag) res(data);
                      else rej();
                  }, 3000);
              });

          driver(1)
              .then(newData => {
                  const data = this.finData;
                  data.xAxis[0].data = newData.x;
                  data.series[0].data = newData.s1;
                  data.series[1].data = newData.s2;
                  data.series[2].data = newData.a1;
                  data.series[3].data = newData.a2;
                  data.series[4].data = newData.s;
                  data.series[5].data = newData.a;

                  that.updateData(data);
              })
              .catch(() => {
                  // that.$Message.error({
                  //     background: true,
                  //     content: "哇哦，查询失败咯！再试一下吧"
                  // });
              })
              .finally(() => {
                  that.isSubmit = false;
              });
      },
      doSubmitM() {
          this.costVo["begintime"]=this.time[0]
          this.costVo["endtime"]=this.time[1]
          this.getDataM()
          if (!Number.isInteger(this.time[0])) {
              this.$Message.error({
                  background: true,
                  content: "请输入合法的起止日期"
              });

              return;
          }
          const data={
              x:[],
              s1:[],
              s2:[],
              a1:[],
              a2:[]
          }
          let q=0
          for (
              q=0;q<3;q=q+1
          ){

              data.x.push("2020年"+(q+3)+"月")
              data.s1.push(this.List[q].sum)
              data.s2.push(this.List[q].count)
              data.a1.push(this.List1[q].sum)
              data.a2.push(this.List1[q].count)
          }
          this.isSubmit = true;
          const that = this;
          const driver = flag =>
              new Promise((res, rej) => {
                  setTimeout(() => {

                      if (flag) res(data);
                      else rej();
                  }, 3000);
              });

          driver(1)
              .then(newData => {
                  const data = this.finData;
                  data.xAxis[0].data = newData.x;
                  data.series[0].data = newData.s1;
                  data.series[1].data = newData.s2;
                  data.series[2].data = newData.a1;
                  data.series[3].data = newData.a2;
                  data.series[4].data = newData.s;
                  data.series[5].data = newData.a;

                  that.updateData(data);
              })
              .catch(() => {
                  // that.$Message.error({
                  //     background: true,
                  //     content: "哇哦，查询失败咯！再试一下吧"
                  // });
              })
              .finally(() => {
                  that.isSubmit = false;
              });
      },
    ...mapMutations({
      updateTime: "updateFinTime",
      updateData: "updateFinData"
    }),
      getData(){
          this.loading = true;
          let url = "http://localhost:9002/his/AdministrationController/getReceivableAccounts"
          this.$ajax.post(url,this.costVo).then(res=>{
              this.List = res.data
              console.log(this.List)
              this.loading = false;
          })
          url = "http://localhost:9002/his/AdministrationController/getReceivedAccounts"
          this.$ajax.post(url,this.costVo).then(res=>{
              this.List1 = res.data
              console.log(this.List1)
              this.loading = false;
          })
      },
      getDataW(){
          this.loading = true;
          let url = "http://localhost:9002/his/AdministrationController/getReceivableAccountsW"
          this.$ajax.post(url,this.costVo).then(res=>{
              this.List = res.data
              console.log(this.List)
              this.loading = false;
          })
          url = "http://localhost:9002/his/AdministrationController/getReceivedAccountsW"
          this.$ajax.post(url,this.costVo).then(res=>{
              this.List1 = res.data

              console.log(this.List1)
              this.loading = false;
          })
      },
      getDataM(){
          this.loading = true;
          let url = "http://localhost:9002/his/AdministrationController/getReceivableAccountsM"
          this.$ajax.post(url,this.costVo).then(res=>{
              this.List = res.data
              console.log(this.List)
              this.loading = false;
          })
          url = "http://localhost:9002/his/AdministrationController/getReceivedAccountsM"
          this.$ajax.post(url,this.costVo).then(res=>{
              this.List1 = res.data

              console.log(this.List1)
              this.loading = false;
          })
      },
  }
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.fin-container {
  background: white;
  height: 100%;

  overflow-y: hidden;
  overflow-x: hidden;
}
.date-container {
  margin-top: 1rem;
  margin-left: 1.5rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
}
.date-container > p {
  line-height: 3rem;
}
.date-picker {
  width: 13rem;
  margin-right: 1rem;
}
.chart-container {
  height: calc(80%  - 6rem);
  box-sizing: border-box;
  padding: 0 1rem;
}
.bt{
  margin-right: 2rem;
}
.bt1{
  margin-right: 5rem;
}
</style>
