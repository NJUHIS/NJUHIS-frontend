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
                style="width:100%;display: block;height:400px"
                v-show="this.isshow"
        >
            <el-table-column
                    prop="id"
                    label="病历号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="realname"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
                    width="80"
                    :formatter="sexFormatter">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="visitdate"
                    label="就诊日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="noon"
                    label="午别"
                    width="180"
                    :formatter="noonFormatter">
            </el-table-column>
            <el-table-column
                    prop="user.realname"
                    label="主治医生"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="department.deptname"
                    label="就诊科室"
                    width="180">
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="ondetail(scope.row.medicalRecordId,scope.row.realname,scope.row.visitdate,scope.row.user.realname,)">查看详情</el-button>
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

                    <div class="book-content">
                        <div>
                            <div class="sku-name">
                               检查单详情
                            </div>
                            <p class="p-author">
                                患者姓名：{{this.name}}
                            </p>
                            <p class="p-author">
                                门诊医生：{{this.doctor}}
                            </p>

                        </div>

                            <div class="p-author">
                                就诊时间：{{this.date}}
                            </div>
                        <p >
                        患者主述：{{this. medicalRecord.medicalReadme}}
                        </p>
                        <p >
                            诊断结果：{{this. medicalRecord.medicalDiagnosis}}
                        </p>
                        <p >
                            体格检查：{{this. medicalRecord.medicalPhysique}}
                        </p>
                        <div>
                            <p>疾病诊断:</p>
                            <div v-for="i in this.medicalRecord.diagnosisList" :key="i">
                                <p>{{i.disease.diseasename}}</p>
                            </div>
                        </div>
                        <div>
                            <p>药品单:</p>
                                <el-table
                                        :data="this.prescription.prescriptionDetailedList"
                                        stripe>
                                    <el-table-column
                                            prop="drugs.drugsName"
                                            label="药名"
                                            width="180">

                                    </el-table-column>
                                    <el-table-column
                                            prop="useage"
                                            label="用法"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="dosage"
                                            label="用量"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="frequency"
                                            label="频率"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="quantity"
                                            label="总量"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="price"
                                            label="单价"
                                            width="120">
                                    </el-table-column>
                                </el-table>

                        </div>
                    </div>

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
                currPage: 1,    //当前页,
                pageInfo: {},   //查询的数据,
                activeIndex: '1',
                activeIndex2: '1',
                data:[],
                medicalRecord:{},
                prescription:{},
                formInline: {
                    conditions: ''
                },
                name:'',
                doctor:"",
                date:""

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
            getData(){
                this.loading = true;
                let url = "http://localhost:9002/his/AdministrationController/Register"
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
            noonFormatter(row, column, cellValue){
                if (cellValue =="0")

                    return "上午"
                else if (cellValue =="1")
                    return "下午"
                else return "夜班"
            },
            ondetail(id,name,date,doctor){
                this.name=name
                this.date=date
                this.doctor=doctor
                console.log(id)
                this.loading = true;
                let url = "http://localhost:9002/his/AdministrationController/getMR"
                this.$ajax.post(url, qs.stringify({
                    id: id
                })).then(res=>{
                    this.medicalRecord = res.data
                    console.log(this.medicalRecord)
                    this.loading = false;
                })
                this.loading = true;
                url = "http://localhost:9002/his/AdministrationController/getPres"
                this.$ajax.post(url, qs.stringify({
                    id: id
                })).then(res=>{
                    this.prescription = res.data
                    console.log(this.prescription)
                    console.log("aa")
                    this.loading = false;
                })
                this.isshow=false
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
    .detail{
        padding: 0 0rem;
        margin-top: 1rem;
        margin-left: 5rem;
        width: 850px;
        height: 350px;
        margin-top: 20px;
    }
    .p-author {
        font-size: 16px;
        color: #4333f7;
    }
    .sku-name{
        font-size: 24px;
        color:#FF0000;
    }
    .book-content{
        margin-top: 20px;
        color: #999;
        font-size: 14px;
    }
</style>