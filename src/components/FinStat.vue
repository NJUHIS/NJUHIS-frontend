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
      <Button type="primary" @click="doSubmit" :loading="isSubmit">查询</Button>
    </div>
    <div class="chart-container">
      <Echart v-if="showGra" :options="finData" :autoresize="true" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { time2str } from "../utils";

export default {
  name: "FinStat",
  data: () => ({
    isSubmit: false,
    showGra: false
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
    ...mapState({
      time: "finTime",
      finData: "finData"
    })
  },
  methods: {
    doSubmit() {
      if (!Number.isInteger(this.time[0])) {
        this.$Message.error({
          background: true,
          content: "请输入合法的起止日期"
        });
        return;
      }

      //axios请求,驱动程序
      this.isSubmit = true;
      const that = this;
      const driver = flag =>
        new Promise((res, rej) => {
          setTimeout(() => {
            const mockData = {
              x: [],
              s1: [],
              s2: [],
              a1: [],
              a2: [],
              s: [],
              a: []
            };
            for (
              let i = this.time[0];
              i < this.time[1];
              i = i + 24 * 60 * 60 * 1000
            ) {
              const [a, b, c, d] = [
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100)
              ];
              mockData.x.push(time2str(i));
              mockData.s1.push(a);
              mockData.s2.push(b);
              mockData.a1.push(c);
              mockData.a2.push(d);
              mockData.s.push(a + b);
              mockData.a.push(c + d);
            }
            if (flag) res(mockData);
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
          that.showGra = true;
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
      updateTime: "updateFinTime",
      updateData: "updateFinData"
    })
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
  height: calc(100% - 6rem);
  box-sizing: border-box;
  padding: 0 1rem;
}
</style>
