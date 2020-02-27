<template>
    <div>
        <h3>估算量说明</h3>
        <div class="introduction red">估算量与占比 为 估算值，与实际情况可能存在差异</div>
        <div class="introduction">单位为 "箱""件""盒" 的，根据规格计算，其他为 1</div>
        <div class="introduction">规格计算公式：
            <div>
                有/ 符号的，取 / 前的数字， 例：2500只/箱 = 2500
                <div>
                    有/ 符号的，且 有逗号分割的，取 / 前的数字"，"后的， 例：1715，2500只/箱 = 2500
                </div>
            </div>
            <div>
                有* 符号的，取 * 前后的数字相乘法， 例：20*50 = 1000
                <div>
                    有多个* 符号的， 默认为产品规格， 计算 1
                </div>
            </div>
            <div>特殊情况：
                <div>
                    EAR200P : 默认200
                </div>
                <div>
                    平面型耳带式 : 默认2000
                </div>
                <div>
                    9105 : 默认50
                </div>
            </div>
        </div>


        <h3>二级分类 医用和N95 说明</h3>
        <div class="introduction">品名或者规格中包含95 ，KF94，FFP2，good job 为N95类别</div>
        <div class="introduction">规格中包含 医用 为医用类别</div>
        <div class="introduction">品名中包含 医用，SURGITEC，BAOTHACH，SURGICAL，Pasture，surgicalface 为医用类别</div>
        <h3>物资类型 分类说明</h3>
        <div class="introduction">目前只有 口罩 护目镜 防护服 手术服 手套 消毒液 空气净化器 类别</div>
        <div class="introduction red">消毒液由于 单位无法正确估算，估算量偏差较大，请谨慎参考</div>
    </div>
</template>

<script>
    export default {
        name: 'info'
    }
</script>

<style scoped>
    h3 {
        text-align: center;
        font-size: 20px;
    }

    .red {
        color: red;
    }

    .introduction {
        padding: 15px;
    }
</style>
