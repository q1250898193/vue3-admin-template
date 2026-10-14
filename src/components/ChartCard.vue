<template>
  <div class="chart-card" v-loading="loading">
    <div ref="chartRef" class="chart-card__body"></div>
    <el-empty v-if="isEmpty" description="暂无数据" :image-size="80" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  // ECharts option
  option: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  // 高度，默认 300px
  height: { type: String, default: '300px' }
})

const chartRef = ref(null)
let chartInstance = null

const isEmpty = ref(true)

async function renderChart() {
  if (!chartRef.value) return
  await nextTick()
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance.setOption(props.option, true)
  // 判断是否有数据
  const series = props.option.series || []
  isEmpty.value = !series.some(s => s.data && s.data.length > 0)
}

function handleResize() {
  chartInstance && chartInstance.resize()
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance && chartInstance.dispose()
})

watch(() => props.option, renderChart, { deep: true })
</script>

<style scoped>
.chart-card {
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  position: relative;
}
.chart-card__body {
  width: 100%;
  height: v-bind('height');
}
</style>
