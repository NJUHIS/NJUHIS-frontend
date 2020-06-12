<template>
    <div>
        <el-collapse v-model="activeNames" :data="List" @change="handleChange" class="cover">

            <div v-for="o in this.List" :key="o">
            <el-collapse-item  class="depL">
                <template slot="title">
                    <div class="staff">
                        ·  {{o.typeName}}
                    </div>

                </template>
                <el-collapse v-model="activeNames"
                             @change="handleChange" class="depP">
                    <div v-for="os in o.departmentList" :key="os">
                        <el-collapse-item class="dep">
                            <template slot="title">
                                <div class="staff1">


                                ·····{{os.deptname}}
                                </div>
                            </template>
                            <div v-for="osa in os.userList" :key="osa">
                            <el-col :span="6">
                                <el-card :body-style="{ padding: '0px' }">
                                    <img src="https://i01piccdn.sogoucdn.com/6913d9275712c1ca" class="image">
                                    <div style="padding: 14px;">
                                        <span>{{osa.realname}}</span>
                                        <p>{{["主任医师","副主任医师","主治医师"][osa.usertypeid]}}</p>

                                            <el-collapse-item class="dep">
                                                <template slot="title">
                                                    查看排班信息
                                                </template>
                                                <div v-for="osas in osa.schedulingList" :key="osas">
                                                    <p>{{osas.scheddate}}{{["上午","下午","夜班"][osas.noon]}}</p>
                                                </div>
                                            </el-collapse-item>

                                    </div>
                                </el-card>
                            </el-col>
                            </div>

                        </el-collapse-item>
                    </div>
                </el-collapse>



            </el-collapse-item>
            </div>

        </el-collapse>

    </div>
</template>

<script>


    export default {
        data() {
            return {
                activeNames: ['1'],
                loading: false, //正在加载,
                List:[]

            };
        },
        created(){
            this.getData()
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },

            getData(){
                this.loading = true;
                let url = "http://localhost:9002/his/AdministrationController/getDepartmentAndDoctor"
                this.$ajax.post(url).then(res=>{
                    this.List = res.data
                    console.log(this.List)
                    this.loading = false;
                })
            },


        }
    }
</script>

<style scoped>
.fin-container {
  background: white;
  height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 60%;
    display: block;
    margin-left:auto;
    margin-right:auto;
    margin-top:auto;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.depL{
    font-weight:bold;
    solid-color:#E6A23C;
    padding: 0 0rem;
    margin-top: 0.5rem;
    margin-left: -1rem;
}
.depP{
    font-weight:bold;
    font-size: 24px;
    solid-color:#E6A23C;
    padding: 0 0rem;
    margin-top: 0.5rem;
    margin-left: -1rem;
}
.staff{
    font-size: 24px;
    }
.staff1{
    font-size: 18px;
}
.cover{
    height: 200px;
    width: 1000px;
    }
</style>
