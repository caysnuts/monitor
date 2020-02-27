<template>
    <div>
        <div class="name">{{name}}</div>
        <b-table striped hover :items="list" class="table">
        </b-table>
    </div>
</template>

<script>
    export default {
        name: 'StaticTable',
        props: ['list', 'name'],
        data() {
            return {}
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .name{
        margin: 10px;
    }
    .table {
        width: 280px;
        margin: 5px;
    }
</style>
