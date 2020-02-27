<template>
    <div>
        {{name}}
        <v-chart :options="options" class="echarts"/>
    </div>
</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts'

    import { timeArray } from '../constant'

    export default {
        name: 'chart',
        components: {
            'v-chart': ECharts
        },
        props:['originData','name'],
        data() {
            return {
                options:{
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['医院', '指挥部', '卫健局', '方舱']
                    },
                    toolbox: {
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: timeArray
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '医院',
                            type: 'line',
                            stack: '医院',
                            areaStyle: {},
                            data: this.originData['医院']
                        },
                        {
                            name: '指挥部',
                            type: 'line',
                            stack: '指挥部',
                            areaStyle: {},
                            data: this.originData['指挥部']
                        },
                        {
                            name: '卫健局',
                            type: 'line',
                            stack: '卫健局',
                            areaStyle: {},
                            data: this.originData['卫健局']
                        },
                        {
                            name: '方舱',
                            type: 'line',
                            stack: '方舱',
                            areaStyle: {},
                            data: this.originData['方舱']
                        },
                    ]
                }
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .echarts {
        width: 96%;
        height: 400px;
    }
</style>
