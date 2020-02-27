<template>
    <div id="app">
        <Header />
        <b-tabs pills content-class="mt-3">
            <b-tab title="每日" active>
                <div v-if="chartDailyDataList.length > 0">
                    <Chart v-for="item in chartDailyDataList" :key="item.name" :origin-data="item.data"
                           :name="item.name" />
                </div>
            </b-tab>
            <b-tab title="数据查询">
                <div>
                    <b-button class="btn-filter" @click="toggleFilter">筛选</b-button>
                    <b-button class="btn-filter" @click="reset">重置</b-button>
                    <div v-show="toggleFilterValue" class="selectGroup">
                        <div class="selectItem">
                            <div>时间：</div>
                            <b-form-select plain="true" size="sm" v-model="selectTime" :options="timeArrayOption"
                                           multiple
                                           :select-size="10" class="formSelect"></b-form-select>
                        </div>
                        <div class="selectItem">
                            <div>物资类型：</div>
                            <b-form-select size="sm" v-model="selectProductType" :options="ProductType" multiple
                                           :select-size="10" class="formSelect"></b-form-select>
                        </div>
                        <div class="selectItem">
                            <div>区：</div>
                            <b-form-select size="sm" v-model="selectLocationType" :options="LocationType" multiple
                                           :select-size="10" class="formSelect"></b-form-select>
                        </div>
                        <div class="selectItem">
                            <div>接收单位类型：</div>
                            <b-form-select size="sm" v-model="selectReceiveType" :options="ReceiveType" multiple
                                           :select-size="10" class="formSelect"></b-form-select>
                        </div>
                    </div>
                    <Table :list="tableData" />
                </div>
            </b-tab>
            <b-tab title="数据统计">
                <div v-if="tableStaticDataList.length > 0" class="staticTables">
                    <StaticTable v-for="item in tableStaticDataList" :key="item.name" :list="item.data"
                                 :name="item.name" />
                </div>
            </b-tab>
            <b-tab title="医护人员牺牲名单" title-link-class="dark" style="background: #2c3e50;color: white">
                <MedicalStaffSacrificeList />
            </b-tab>
            <b-tab title="说明">
                <Info />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import Header from './components/header.vue'
    import Table from './components/table.vue'
    import StaticTable from './components/StaticTable.vue'
    import Chart from './components/chart.vue'
    import MedicalStaffSacrificeList from './components/MedicalStaffSacrificeList.vue'
    import Info from './components/info.vue'
    import { chartLineSeriesNameList, LocationType, ProductType, ReceiveType, timeArray } from './constant'
    import { FormatData, getTotalCount } from './utils';

    export default {
        name: 'App',
        components: {
            Header,
            Table,
            StaticTable,
            MedicalStaffSacrificeList,
            Info,
            Chart
        },
        data() {
            return {
                LocationType,
                ProductType,
                ReceiveType,
                originData: [],
                selectTime: [],
                selectProductType: [],
                selectLocationType: [],
                selectReceiveType: [],
                timeArray,
                chartDailyData: {},
                chartDailyDataList: [],
                tableStaticDataList: [],
                toggleFilterValue: false,
            }
        },
        computed: {
            timeArrayOption() {
                return this.timeArray ? this.timeArray.map(item => ({
                    value: item,
                    text: item
                })) : []
            },
            tableData() {
                let tableData = this.originData;
                if (this.selectTime.length > 0) {
                    tableData = tableData.filter(item => this.selectTime.includes(item['时间']))
                }
                if (this.selectProductType.length > 0) {
                    tableData = tableData.filter(item => this.selectProductType.includes(item['物资类型']))
                }
                if (this.selectLocationType.length > 0) {
                    tableData = tableData.filter(item => this.selectLocationType.includes(item['区']))
                }
                if (this.selectReceiveType.length > 0) {
                    tableData = tableData.filter(item => this.selectReceiveType.includes(item['接收单位类型']))
                }
                return tableData
            }
        },
        methods: {
            toggleFilter(){
              this.toggleFilterValue = !this.toggleFilterValue
            },
            renderData(time) {
                return this.$axios.get(`/${time}.json`)
                    .then(response => {
                        const formatData = FormatData({
                            data: response.data,
                            time
                        })
                        this.originData = this.originData.concat(formatData)
                        this.chartDailyData[time] = formatData;
                    })
            },
            renderChartListData() {
                const chartDailyDataList = [];
                ProductType.map(product => {
                    const chartDailyDataListItem = {};
                    chartLineSeriesNameList.map(seriesName => {
                        timeArray.map(time => {
                            const data = this.chartDailyData[time].filter(item =>
                                item['接收单位类型'] == seriesName && item['物资类型'] == product.value
                            )
                            if (chartDailyDataListItem[seriesName]) {
                                chartDailyDataListItem[seriesName].push(getTotalCount(data))
                            } else {
                                chartDailyDataListItem[seriesName] = [getTotalCount(data)]
                            }
                        })
                    })
                    chartDailyDataList.push({
                        name: product.value,
                        data: chartDailyDataListItem
                    })
                })
                this.chartDailyDataList = chartDailyDataList
            },
            renderStaticChartData() {
                const tableStaticDataList = [];
                ProductType.map(product => {
                    const chartDailyDataListItem = [];
                    ReceiveType.map(seriesName => {
                        const data = this.originData.filter(item => item['物资类型'] == product.value)
                        const typeData = data.filter(item => item['接收单位类型'] == seriesName.value)
                        const total = getTotalCount(data)
                        const typeTotal = getTotalCount(typeData)
                        if (typeTotal) {
                            chartDailyDataListItem.push({
                                '名称': seriesName.text,
                                '数量': typeTotal,
                                '占比': (total ? ((typeTotal / total) * 100).toFixed(2) : 0) + ' %',
                            })
                        }
                    })
                    tableStaticDataList.push({
                        name: product.value,
                        data: chartDailyDataListItem
                    })
                })
                this.tableStaticDataList = tableStaticDataList
            },
            reset() {
                this.selectTime = [];
                this.selectProductType = [];
                this.selectLocationType = [];
                this.selectReceiveType = [];
            }
        },
        mounted() {
            let ajaxAll = this.timeArray.map(item => this.renderData(item))
            Promise.all(ajaxAll).then(()=>{
                this.renderChartListData()
                this.renderStaticChartData()
            })
        }
    }
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 20px;
    }

    body {
        font-size: 16px;
        width: 100vw;
        padding: 1%;
    }

    .selectGroup {
        font-size: 12px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        border: solid 1px black;
        border-radius: 20px;
        margin: 10px;
    }

    .selectItem {
        width: 120px;
        margin: 5px;
    }

    .formSelect {
        font-size: 16px;
    }

    .staticTables {
        width: 98%;
        margin: 1%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn-filter {
        font-size: 1em;
        margin: 0px 20px;
    }

    .dark {
        background: #2c3e50;
        color: white;
    }
</style>
