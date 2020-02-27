<template>
    <div>
        <h3>医护人员牺牲名单</h3>
        <div style="text-align: right">不应该忘记他们</div>
        <div><a href="https://github.com/caysnuts/monitor/issues/1" style="color: blueviolet">添加地址</a></div>
        <div>
            <div v-for="item in doctorList" :key="item.name">
                <div class="doctor-sacrifice-item">
                    <div class="doctor-sacrifice-item-name">{{item.name}}</div>
                    <div class="doctor-sacrifice-item-age">{{item.age}} 岁</div>
                    <div class="doctor-sacrifice-item-hospital">{{item.hospital}}</div>
                    <div class="doctor-sacrifice-item-time">{{item.time.replace(/\//g, '.')}}</div>
                </div>
                <div v-if="item.motto" class="doctor-sacrifice-motto">
                    <div>" {{item.motto || ''}} "</div>
                </div>
            </div>
        </div>
        <section>
            <div id="gaodeMap">
                <iframe style="width: 95vw;min-height: 800px"
                        src="https://maplab.amap.com/share/mapv/4eec80cf7c038e2d3e0a932973472a8b"></iframe>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        name: 'MedicalStaffSacrificeList',
        data() {
            return {
                list: []
            }
        },
        computed:{
          doctorList(){
              if(this.list && this.list.length > 0){
                  const tempData = this.list.map((item) => ({
                      ...item,
                      timeStamp: new Date(item.time) * 1
                  }))
                  return tempData.sort((a, b) => a.timeStamp - b.timeStamp)
              }
              return this.list
          }
        },
        mounted() {
            this.$axios.get(`/doctor-sacrifice.json`)
                .then(response => {
                    this.list = response.data
                })
        }
    }
</script>

<style scoped>
    h3{
        text-align: center;
        font-size: 20px;
    }
    .doctor-sacrifice-item {
        margin: 10px 20px;
        display: flex;
    }

    .doctor-sacrifice-motto {
        margin: 10px 20px 20px 30px;
    }

    .doctor-sacrifice-item-name {
        width: 200px;
        font-weight: 600;
    }

    .doctor-sacrifice-item-age {
        width: 100px;
        margin-left: 20px;
    }

    .doctor-sacrifice-item-hospital {
        width: 400px;
        margin-left: 20px;
    }

    .doctor-sacrifice-item-time {
        width: 200px;
        margin-left: 20px;
        font-weight: 600;
    }
</style>
