<template>
  <div class="fin-container">


    <div class="info">
      <span class="word">今日就诊病人数：</span><span class="word">192 人</span>
      <span class="word">目前在院病人数：</span><span class="word">71 人</span>
    </div>


    <div class="date-container">
      <p>起止日期：</p>
      <DatePicker
              class="date-picker"
              type="daterange"
              placeholder="选择起止日期"
              v-model="seDate"
              :disabled="isSubmit"
      ></DatePicker>
      <Button type="primary" @click="doSubmit" :loading="isSubmit">查询</Button>
    </div>

    <div class="chart-container">
      <Echart v-if="showGra" :options="patData" :autoresize="true" />
    </div>
  </div>
</template>
<script>
    import { mapState, mapMutations } from "vuex";
    import { time2str } from "../utils";

    export default {
        name: "PatStat",
        data: () => ({
            patVo:{"begintime": 100000000000, "endtime": 100900000000},
            List:[],
            isSubmit: false
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
                return this.patData.xAxis[0].data.length;
            },
            ...mapState({
                time: "patTime",
                patData: "patData"
            })
        },
        methods: {
            doSubmit() {
                this.patVo["begintime"]=this.time[0]
                this.patVo["endtime"]=this.time[1]
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
                    s1:[]
                }
                let q=0
                for (
                    let i = this.time[0];
                    i < this.time[1];
                    i = i + 24 * 60 * 60 * 1000
                ){

                    data.x.push(time2str(i))
                    data.s1.push(this.List[q].count)
                    q=q+1
                }
                //axios请求,驱动程序

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
                        const data = this.patData;
                        data.xAxis[0].data = newData.x;
                        data.series[0].data = newData.s1;
                        that.updateData(data);
                    })
                    .catch(() => {
                        that.$Message.error({
                            background: true,
                            content: "哇哦，查询失败咯！再试一下吧"
                        });
                    })
                    .finally(() => {
                        that.isSubmit = false;
                    });
            },
            ...mapMutations({
                updateTime: "updatePatTime",
                updateData: "updatePatData"
            }),
            getData(){
                this.loading = true;
                let url = "http://localhost:9002/his/AdministrationController/getPatAccounts"
                this.$ajax.post(url,this.patVo).then(res=>{
                    this.List = res.data
                    console.log(this.List)
                    this.loading = false;
                })
            },
        }
    };
</script>

<style scoped>
.fin-container {
  background: white;
  height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
}
</style>

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
    height: calc(60% - 6rem);
    box-sizing: border-box;
    padding: 0 1rem;
  }
  .info{
    /*border-style: solid;*/
    padding: 0 1rem;
    margin-top: 1rem;
    margin-left: 0rem;
    width: 500px;
    height: 50px;
  }
  .word{
    font-weight:bold;
    line-height:60px;
    padding-right:18px;
    font-size:18px;
  }
</style>
