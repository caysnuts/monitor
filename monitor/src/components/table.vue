<template>
    <div>
        <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
        ></b-pagination>
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
    export default {
        name: 'table',
        props:['list'],
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
                perPage: 10,
                currentPage: 1,
            }
        },
        computed: {
            rows() {
                return this.list.length
            },
            items() {
                return this.list.slice( (this.currentPage-1) * this.perPage,(this.currentPage) * this.perPage)
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .table{
    }
</style>
