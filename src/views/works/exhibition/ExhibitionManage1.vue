<template>
    <div style="margin-top: 30px; ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>展览馆管理</el-breadcrumb-item>
            <el-breadcrumb-item>已审核展馆</el-breadcrumb-item>
            <div style="margin-top: 20px">
                <el-radio v-model="radio" label="1" border size="medium" @change="handleCheck(1)">已审核</el-radio>
                <el-radio v-model="radio" label="2" border size="medium" @change="handleCheck(2)">未审核</el-radio>
                <el-button style="float: right" round @click="addExhibition"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加展馆</el-button>
            </div>
        </el-breadcrumb>
        <el-table
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; background-color: #c6ffdd"
                :data=" tableData"
        >
            <el-table-column
                    sortable
                    prop="title"
                    label="展馆标题">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <div align="center">
                            <img controls v-bind:src="scope.row.url" style='width: 250px; height: 250px; padding: 0px 0px; align-content: center; z-index: 9999' ></img>
                        </div>
                        <p>{{scope.row.title}}</p>
                        <p>创办人:
                            <span  >
                  {{scope.row.username}}
                  </span>
                        </p>
                        <p class="vedio_detail">
                            {{scope.row.description}}
                        </p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.title }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    :formatter="formatter"
                    prop="description"
                    label="展馆内容简介">
                <template slot-scope="scope">
                    <el-tooltip style="margin-left: 10px" effect="dark" :content="scope.row.description">
                        <div class="text-ellipsis">{{ scope.row.description }}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                    :formatter="formatter"
                    prop="description"
                    label="展馆容量">
                <template slot-scope="scope">
                    <el-tooltip style="margin-left: 10px" effect="dark" :content="scope.row.accommodate">
                        <div class="text-ellipsis">{{ scope.row.accommodate }}人</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="author"
                    label="创办人">
                <template slot-scope="scope">
                <span >
            {{scope.row.username}}
             <span></span>
           </span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="created_date"
                    label="创办时间">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.created_date}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="status"
                    label="展馆状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="saveSelector(scope.$index, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <div style="display: flex; align-items: center;width: 200px;">
                        <el-input style="width:105px;"
                                  v-model="search"
                                  size="mini"
                                  placeholder="输入搜索内容"
                                  @keyup.enter.native="handleSearch(1)"/>

                        <el-button
                                icon="el-icon-search"
                                size="mini"
                                @click="handleSearch(1)"
                        ></el-button>
                    </div>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="this.currentPage"
                       :page-sizes="[1, 2, 3, 4, 5, 6]"
                       :page-size="this.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "ExhibitionManage1",
    data() {
        return{
            isRouterAlive:true,
            search: '',
            tableData:[],
            radio:'1',
            size:6,
            total: 0, // 数据总条数
            currentPage: 1, // 当前页码
        }
    },
    created() {
        this.getAllData()
    },
    methods:{
        handleSearch(val) {
            this.currentPage = val; // 设置当前页码为第一页
            console.log("create func");
            this.$http.get("http://localhost:8083/exhibition/searchExhibition/" + this.currentPage + "/" + this.size+"?keyword="+this.search).then(res=>{
                // this.tableData = res.data
                this.tableData = res.data.list
                this.total = Math.ceil (res.data.total/this.size)
                console.log(res.data);
            })
        },
        // handleEdit(index, row) {
        //     console.log(index, row);
        // },
        getAllData() {
            console.log("create func");
            this.$http.get("http://localhost:8083/exhibition/findAll?currentPage=" + this.currentPage + "&size=" + this.size ).then(res=>{

                this.tableData = res.data.list
                console.log(this.tableData);
                this.total = res.data.total
                //this.total = Math.ceil (res.data.total/this.size)
                console.log("分页结果" + res.data.list);
            })
        },
        // 处理页码改变事件，重新计算分页数据
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size = val;
        if(this.search){
          this.handleSearch(val);
        }else {
          this.getAllData();
        }
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage= val;
        if(this.search){
          this.handleSearch(val);
        }else {
          this.getAllData();
        }
      },
        formatter(row, column) {
            return row.description;
        },
        saveSelector(index, row){
            console.log(index,row.status);
            this.$http.post(
                "http://localhost:8083/exhibition/updateExhibitionStatus",
                row
            ).then(res=>{
                this.$message.success("修改成功!");
            })
                .catch(res => {
                    console.log(error)
                    this.$message.success("修改失败!");
                })
        },
        handleCheck(option) {
            if (option === 1) {
                this.$router.push('/homeView/exhibitionManage1');
            } else if (option === 2) {
                this.$router.push('/homeView/exhibitionManage0');
            }
        },
        handleDelete(index, id) {
            console.log(index, id);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).
            then(() => {
                this.$http.post(
                    "http://localhost:8083/exhibition/deleteExhibition",
                    {id: id}
                ).then(res=>{
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 删除成功返回电影刷新列表页面
                    this.$router.go(0)
                }).catch(res=>{
                    console.log(res);
                    // 删除失败
                    this.$message.error("删除失败!")
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addExhibition(){
            this.$router.push('/addExhibitionManage')
        },
    }
}
</script>

<style scoped>
.text-ellipsis {
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 溢出部分隐藏 */
    text-overflow: ellipsis; /* 超出部分用省略号显示 */
}
.vedio_detail{
    font-size: 12px;
    width: 250px;
}
</style>