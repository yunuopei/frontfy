<template>
  <div >
      <div style="margin-top: 30px; ">
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-button style="float: right" round @click="addUser"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加用户</el-button>
          </el-breadcrumb>
          <el-table
              style="width: 100%; background-color: #c6ffdd"
              :data=" tableData"
              >
              <el-table-column
                  label="用户名"
                  prop="username">
              </el-table-column>
              <el-table-column
                  label="年龄"
                  prop="age">
              </el-table-column>
              <el-table-column
                  label="性别"
                  prop="sex">
              </el-table-column>
              <el-table-column
                  label="邮箱"
                  prop="email">
              </el-table-column>
              <el-table-column
                  label="电话"
                  prop="phonenumber">
              </el-table-column>
              <el-table-column
                  label="角色"
                  prop="rolename">
              </el-table-column>
              <el-table-column
                  label="状态"
                  prop="status_after">
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
                          @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
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

  </div>
</template>

<script>
export default {
    name: "UserManage",
    data() {
        return{
          search: '',
          tableData:[],
            size:6,
          total:0,
          currentPage:1
        }
    },

    mounted() {
      this.getAllData()
    },
    methods:{
        getAllData() {
            console.log("create func");
            this.$http.get("http://localhost:8083/user/findAll?currentPage=" + this.currentPage + "&size=" + this.size ).then(res=>{

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
        handleEdit(index, id) {
            //跳转到编辑页面，同时把用户的id传递过去
            this.$router.push({path:"/editUser", query: {userId: id}});
        },
        handleDelete(index, id) {
            console.log(index, id);
            this.$confirm('是否删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).
            then(() => {
                this.$http.post(
                    "http://localhost:8083/user/delete",
                    {id: id}
                ).then(res=>{
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 删除成功返回
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
        addUser(){
            this.$router.push('/addUser')
        },
        // 分页查找
        handleSearch(val) {
            this.currentPage = val; // 设置当前页码为第一页
            console.log("create func");
            this.$http.get("http://localhost:8083/user/searchUser/" + this.currentPage + "/" + this.size+"?keyword="+this.search).then(res=>{
                // this.tableData = res.data
                this.tableData = res.data.list
                this.total = Math.ceil (res.data.total/this.size)
                console.log(res.data);
            })
        },

        // 文件

    }
}
</script>

<style scoped>

.el-table{
    margin-top: 30px;
    margin-left: 10px;
}
</style>