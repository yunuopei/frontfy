<template>
    <div style="margin-top: 30px; ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>视频管理</el-breadcrumb-item>
            <el-breadcrumb-item>待审核视频管理</el-breadcrumb-item>
            <div style="margin-top: 20px">
                <el-radio v-model="radio" label="1" border size="medium" @change="handleCheck(1)">已审核</el-radio>
                <el-radio v-model="radio" label="2" border size="medium" @change="handleCheck(2)">未审核</el-radio>

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
                    label="视频标题"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <div align="center">
                            <video controls v-bind:src="scope.row.url" style='width: 250px; height: 250px; padding: 0px 0px; align-content: center; z-index: 9999' ></video>
                        </div>
                        <p>{{scope.row.title}}</p>
                        <p>作者:
                            <span  v-for="(user, index)   in scope.row.users" >
                  {{user.username}}
                  <span v-if="index === scope.row.users.length-1 "></span>
                  <span  v-else>/</span>
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
                    label="视频描述"
                    width="180">
                <template slot-scope="scope">
                    <el-tooltip style="margin-left: 10px" effect="dark" :content="scope.row.description">
                        <div class="text-ellipsis">{{ scope.row.description }}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="author"
                    label="作者">
                <template slot-scope="scope">
                <span  v-for="(user, index)   in scope.row.users" >
            {{user.username}}
             <span v-if="index === scope.row.users.length-1 "></span>
             <span  v-else>/</span>
           </span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="created_date"
                    label="上传时间">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.created_date}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="status"
                    label="审核状态">
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
    name: "Vedio0",
    data() {
        return{
            isRouterAlive:true,
            search: '',
            tableData:[],
            radio:'2',
            size:6,
            total: 0, // 数据总条数
            currentPage: 1, // 当前页码
        }
    },
    mounted() {
        this.getAllData()
    },
    methods:{
        handleSearch(val) {
            this.currentPage = val; // 设置当前页码为第一页
            console.log("create func");
            this.$http.get("http://localhost:8083/works/findByTitle0/" + this.currentPage + "/" + this.size+"/"+3+"?keyword="+this.search).then(res=>{
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
            this.$http.get("http://localhost:8083/works/findAll0?currentPage=" + this.currentPage + "&size=" + this.size + "&categoryId=3").then(res=>{
                // this.tableData = res.data
                this.tableData = res.data.list
                this.total = res.data.total

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
                "http://localhost:8083/works/updateWorks",
                row
            ).then(res=>{
                this.$message.success("修改成功!");
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            })
                .catch(res => {
                    console.log(error)
                    this.$message.success("修改失败!");
                })
        },
        handleCheck(option) {
            if (option === 1) {
                this.$router.push('/homeView/vedio');
            } else if (option === 2) {
                this.$router.push('/homeView/vedio0');
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
                    "http://localhost:8083/works/delete",
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
        addVedio(){
            this.$router.push('/addVedio')
        }
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