<template>
    <div>
        <div class="toolbar-group">
            <b-button class="btn-filter" @click="toggleFilter">筛选</b-button>
            <b-button class="btn-filter" @click="reset">重置</b-button>
            <b-form-input class="input-filter" v-model="filterText" placeholder="请输入关键字"></b-form-input>
        </div>
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
        <b-table striped hover :items="items" class="table" :fields="fields">
        </b-table>
        <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
        ></b-pagination>
    </div>
</template>

<script>
    import { LocationType, ProductType, ReceiveType, timeArray } from '../constant';

    export default {
        name: 'table',
        props: ['list'],
        data() {
            return {
                fields: [
                    {
                        key: '接收单位',
                        label: '接收方',
                        sortable: false
                    },
                    {
                        key: '品名',
                        sortable: false
                    },
                    {
                        key: '规格',
                        sortable: false
                    },
                    {
                        key: '计量单位',
                        label: '单位',
                        sortable: false
                    },
                    {
                        key: '数量',
                        sortable: false
                    },
                    {
                        key: '时间',
                        sortable: false
                    },
                    {
                        key: '估算量',
                        sortable: true
                    },
                    {
                        key: '接收单位类型',
                        label: '单位类型',
                        sortable: false
                    },
                    {
                        key: '物资类型',
                        label: '类型',
                        sortable: false
                    },
                    {
                        key: '规格',
                        label: 'Person age',
                        sortable: true,
                        // Variant applies to the whole column, including the header and footer
                        variant: 'danger'
                    }
                ],
                selectTime: [],
                selectProductType: [],
                selectLocationType: [],
                selectReceiveType: [],
                timeArray,
                LocationType,
                ProductType,
                ReceiveType,
                perPage: 10,
                currentPage: 1,
                toggleFilterValue: false,
                filterText: '',
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
                let tableData = this.list;
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
                if (this.filterText) {
                    tableData = tableData.filter(item => {
                        if(item['接收单位'].indexOf(this.filterText) >=0){
                            return true
                        }else if(item['品名'].indexOf(this.filterText) >=0){
                            return true
                        }else {
                            return false
                        }
                    })
                }
                return tableData
            },
            rows() {
                if (this.tableData) {
                    this.tableData.length
                }
                return 0
            },
            items() {
                if (this.tableData) {
                    return this.tableData.slice((this.currentPage - 1) * this.perPage, (this.currentPage) * this.perPage)
                }
                return []
            }
        },
        methods: {
            toggleFilter() {
                this.toggleFilterValue = !this.toggleFilterValue
            },
            reset() {
                this.selectTime = [];
                this.selectProductType = [];
                this.selectLocationType = [];
                this.selectReceiveType = [];
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .table {
    }
    .btn-filter {
        font-size: 1em;
        margin: 20px 20px;
    }
    .toolbar-group{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .input-filter{
        width: 30em;
        font-size: 14px;
    }
    .selectGroup {
        font-size: 12px;
        width: 98%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        border: solid 1px black;
        border-radius: 20px;
        margin: 1%;
    }
</style>
