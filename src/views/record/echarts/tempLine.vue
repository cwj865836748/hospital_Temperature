<template>
  <div id="tempEcharts" class="pic"></div>
</template>

<script>
export default {
  name: 'tempLine',
  props: {
    dateList: {
      type: Array
    },
    dataList: {
      type: Array
    }
  },
  data () {
    return {
      tempInit: null
    }
  },
  created () {
  },
  mounted () {
    const options = {
      backgroundColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#fcfefd'
      }, {
        offset: 1,
        color: '#eff5fb'
      }]),
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'transparent',
        position: 'inside',
        textStyle: {
          color: '#3674f6'
        },
        formatter: '{c}℃'
      },
      grid: {
        x: 30,
        y: 10,
        x2: 30,
        y2: 35
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisPointer: {
          lineStyle: {
            color: '#3674f6',
            width: 1
          },
          crossStyle: {
            color: '#0a0d18',
            fontSize: 11
          }
        },
        boundaryGap: false,
        axisLabel: {
          color: '#aaaaaa',
          fontSize: 9,
          formatter: function (value) {
            return value.split(' ').join('\n')
          }
        },
        axisLine: {
          lineStyle: {
            color: '#d4d7e1',
            width: 2
          }
        }
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: true// 不显示刻度线
        },
        axisLabel: {
          color: '#626b98', // y轴上的字体颜色
          fontSize: 11
        },
        axisLine: {
          lineStyle: {
            width: 2,
            color: '#d4d7e1'// y轴的轴线的宽度和颜色
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#626B98'
            }
          }

        }
      ]
    }
    options.xAxis.data = this.dateList
    options.series[0].data = this.dataList
    this.tempInit = this.$echarts.init(document.getElementById('tempEcharts'))
    // 绘制图表，this.echarts1_option是数据
    this.tempInit.setOption(options)
  }
}
</script>

<style lang="scss" scoped>
.pic {
  width: 100%;
  height: 100%;
}
</style>
