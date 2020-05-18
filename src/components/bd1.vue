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
                    prop="invoice.money"
                    label="总价格"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="invoice.invoicenum"
                    label="发票号"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="patientCostsList.length"
                    label="消费条数"
                    width="180"
            >
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
                <div class="book-content">
                    <div>
                        <div class="sku-name">
                            收费详情
                        </div>
                        <p class="p-author">
                            患者姓名：{{this.register.realname}}
                        </p>
                        <p class="p-author">
                            发票号：{{this.register.invoice.invoicenum}}
                        </p>

                    </div>

                    <div class="p-author">
                        就诊时间：{{this.register.invoice.creationtime}}
                    </div>
                    <p>收费单:</p>
                    <el-table
                            :data="this.register.patientCostsList"
                            stripe>
                        <el-table-column
                                prop="name"
                                label="药名"
                                width="180">

                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="单价"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="state"
                                label="状态"
                                width="120"
                                :formatter="stateFormatter">
                        </el-table-column>
                    </el-table>
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
                formInline: {
                    conditions: ''
                },
                register:{invoice:{}}
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
                let url = "http://localhost:9002/his/AdministrationController/Cost"
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
            ondetail(obj){
                console.log(obj)
                this.register=obj
                this.isshow=false
            },
            stateFormatter(row, column, cellValue){
                if(cellValue==1){
                    return "已收费"
                }else return "未收费"
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
</style>