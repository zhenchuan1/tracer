<script>
import * as echarts from "echarts"
import * as axios from 'axios'

export default {
  data() {
    return {
      myEchart: null,
      count: 0
    }
  },
  methods: {
    async refresh() {
      const data = await this.fetchData()
      this.myEchart.setOption(data.questions);
    },
    async fetchData() {
      const res = await axios({
        method: 'get',
        url: '/api/get',
        params: {
          sql: encodeURIComponent('select date as x, count as y from tracer1;')
        }
      })
      const xData = res.data.data.map(v => v.x)
      const yData = res.data.data.map(v => Number(v.y))
      return {
        number: 0, //首页
        show: true,
        active: 0,
        questions: {
          xAxis: {
            type: "category",
            data: xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: yData,
              type: "line",
              smooth: true,
            },
          ],
        },
      }
    },
  },
  mounted() {
    this.myEchart = echarts.init(document.getElementById('tracer1'))
    this.refresh()
    setInterval(this.refresh, 1000)
  }
}
</script>

<template>
  <div id="tracer1" class="tracer1"></div>
</template>

<style scoped>
.tracer1 {
  width: 700px;
  height: 700px;
  border: 1px solid black;
}
</style>