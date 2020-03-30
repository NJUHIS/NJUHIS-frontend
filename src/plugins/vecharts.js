import Vue from "vue";
import ECharts from "vue-echarts";

import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/grid";
import "echarts/lib/component/axis";
import "echarts/lib/component/dataZoom";

Vue.component("Echart", ECharts);
