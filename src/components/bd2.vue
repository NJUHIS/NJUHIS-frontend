<template>
    <div class="wrap">
        <el-page-header @back="goBack" content="详情页面" v-show="!this.isshow">
        </el-page-header>
    <el-form :inline="true" :model="formInline" class="query" v-show="this.isshow">
        <el-form-item >
            <el-input  v-model="formInline.conditions" placeholder="输入患者id/病例号/其他"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>

        <el-table
                :data="data.list"
                stripe
                style="width:100%;display: block"
                v-show="this.isshow"
        >
            <el-table-column
                    prop="id"
                    label="检查单号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="register.realname"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="register.gender"
                    label="性别"
                    width="80"
                    :formatter="sexFormatter">
            </el-table-column>
            <el-table-column
                    prop="register.age"
                    label="年龄"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="checkDetailedList.length"
                    label="检查项数"
                    width="180"
                    >
            </el-table-column>
            <el-table-column
                    prop="creationTime"
                    label="创建时间"
                    width="180"
                    :formatter="timeFormatter">
            </el-table-column>

            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="ondetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total"
                class="pagination"
                v-show="this.isshow"
        >
        </el-pagination>
        <div class="detail" v-show="!this.isshow" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <el-row>
                    <el-table
                            :data="this.checkapply.checkDetailedList"
                            stripe>
                        <el-table-column
                                prop="checkprojid"
                                label="项目id"
                                width="180">

                        </el-table-column>
                        <el-table-column
                                prop="identification"
                                label="录入时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="result"
                                label="检查结果"
                                width="180"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="项目单价"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="department.deptname"
                                label="检查部门"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="user1.realname"
                                label="操作人员"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="user2.realname"
                                label="录入人员"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="state"
                                label="状态"
                                width="180"
                                :formatter="stateFormatter"
                        >
                        </el-table-column>
                    </el-table>


            </el-row>
        </div>
        </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                isshow:true,
                activeNames: ['1'],
                currPage: 1,    //当前页,
                pageInfo: {},   //查询的数据,
                activeIndex: '1',
                activeIndex2: '1',
                data:[],

                formInline: {
                    conditions: ''
                },
                checkapply:{}
            }
        },
        created(){
            this.getData()
        }
        ,
        methods: {
            goBack() {
                this.isshow=!this.isshow;
                console.log('go back');
            },
            handleChange(val) {
                console.log(val);
            },
            getData(){
                this.loading = true;
                let url = "http://localhost:9002/his/AdministrationController/Check"
                this.$ajax.post(url, qs.stringify({
                    currPage: 1,
                    conditions: this.formInline.conditions
                })).then(res=>{
                    this.data = res.data
                    console.log(this.data)
                    this.loading = false;
                })
            },
            onSubmit(){
                this.getData()
            },
            sexFormatter(row, column, cellValue){
                if (cellValue =="1")

                return "男"
                else
                    return "女"
            },
            timeFormatter(row, column, cellValue){
                var oDate = new Date(cellValue),
                    oYear = oDate.getFullYear(),
                    oMonth = oDate.getMonth()+1,
                    oDay = oDate.getDate(),
                    oHour = oDate.getHours(),
                    oMin = oDate.getMinutes(),
                    oSen = oDate.getSeconds(),
                    oTime = oYear +'-'+ this.addZero(oMonth) +'-'+ this.addZero(oDay) +' '+ this.addZero(oHour) +':'+
                        this.addZero(oMin) +':'+this.addZero(oSen);
                return oTime;
            },
            addZero(num){
                if(parseInt(num) < 10){
                    num = '0'+num;
                }
                return num;
            },
            ondetail(obj){
                this.checkapply=obj
                this.isshow=false
            },
            stateFormatter(row, column, cellValue){
                if(cellValue==1){
                    return "等待检验检查处置"
                }else  if(cellValue==2){
                    return "检验检查处置中"
                }else if(cellValue == 3){
                    return"检验检查处置完成，结果未出"
                }else return "结果已出"
            }
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
    .wrap .query {
        padding: 0 0rem;
        margin-top: 1rem;
        margin-left: -1rem;
        width: 350px;
        height: 50px;
        margin-top: 20px;
    }
    .dep{
        width:580px;
    }
</style>