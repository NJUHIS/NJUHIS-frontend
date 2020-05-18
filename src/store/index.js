import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUrl: "",
    finTime: ["", ""],
    patTime: ["", ""],
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
          "应收收入金额",
          "应收收入条数",
          "实收收入金额",
          "实收收入条数"
        ],
        selected: {
          应收收入金额: true,
          应收收入条数: false,
          实收收入金额: false,
          实收收入条数: false
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
          name: "应收收入金额",
          type: "line",
          stack: "应收",
          areaStyle: {},
          data: []
        },
        {
          name: "应收收入条数",
          type: "bar",
          stack: "应收",
          areaStyle: {},
          data: [],
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#A52A2A',
                            fontSize: '12'
                        }
                    }
                }
            }
        },
        {
          name: "实收收入金额",
          type: "line",
          stack: "实收",
          areaStyle: {},
          data: []
        },
        {
          name: "实收收入条数",
          type: "bar",
          stack: "实收",
          areaStyle: {},
          data: [],
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#191970',
                            fontSize: '12'
                        }
                    }
                }
            }
        }
      ]
    }
      ,
      patData: {
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
                  "当日接诊病人"
              ],
              selected: {
                  当日接诊病人: true

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
                  data: [],

              }
          ],
          yAxis: [
              {
                  type: "value"
              }
          ],
          series: [
              {
                  name: "当日接诊病人",
                  type: "line",
                  stack: "应收",
                  areaStyle: {},
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
    },
      updatePatTime(state, newTime) {
          state.patTime = newTime;
      },
      updatePatData(state, newData) {
          state.patData = newData;
      }


  },
  modules: {}
});
