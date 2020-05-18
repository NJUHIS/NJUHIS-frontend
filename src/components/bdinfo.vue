<template>
    <div class="wrap">
        <el-page-header @back="goBack" content="详情页面">
            <p>{{this.id}}</p>
        </el-page-header>

    </div>
</template>

<script>
    export default {
        name: "bdinfo",
        data(){
            return{

                id: '',
                path: '',
                num: 1,
                activeName: 'first',
                showModal: false, //显示模态框
                activeIndex: '1',
                user: {},
                total: '',
                cart: {
                    bookId: '',
                    userId: '',
                    num: 0,
                }, //购物车
                record: {

                }
            }
        },
        created(){
            //clearUser();
            this.id = this.$route.params.id
            console.log(this.id)
        },
    }
</script>

<style scoped>

</style>