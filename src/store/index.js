import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUrl: "",
    finTime: ["", ""],
    finData: {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        },
        extraCssText: "text-align: left;"
      },
      legend: {
        data: [
          "应收药品收入",
          "应收非药品收入",
          "实收药品收入",
          "实收非药品收入",
          "应收总收入",
          "实收总收入"
        ],
        selected: {
          应收药品收入: true,
          应收非药品收入: true,
          实收药品收入: false,
          实收非药品收入: false,
          应收总收入: true,
          实收总收入: false
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 100
        },
        {
          type: "inside",
          realtime: true,
          start: 0,
          end: 100
        }
      ],
      grid: {
        left: "1%",
        right: "1%",
        bottom: "40",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: []
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "应收药品收入",
          type: "line",
          stack: "应收",
          areaStyle: {},
          data: []
        },
        {
          name: "应收非药品收入",
          type: "line",
          stack: "应收",
          areaStyle: {},
          data: []
        },
        {
          name: "实收药品收入",
          type: "line",
          stack: "实收",
          areaStyle: {},
          data: []
        },
        {
          name: "实收非药品收入",
          type: "line",
          stack: "实收",
          areaStyle: {},
          data: []
        },
        {
          name: "应收总收入",
          type: "line",
          stack: "应总",
          data: []
        },
        {
          name: "实收总收入",
          type: "line",
          stack: "实总",
          data: []
        }
      ]
    }
  },
  mutations: {
    updateUrl(state, newUrl) {
      state.currentUrl = newUrl;
    },
    updateFinTime(state, newTime) {
      state.finTime = newTime;
    },
    updateFinData(state, newData) {
      state.finData = newData;
    }
  },
  modules: {}
});
