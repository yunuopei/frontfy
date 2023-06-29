<template>
    <div >
        <div style="margin-top: 30px; ">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>项目负责人</el-breadcrumb-item>
                <el-button style="float: right" round @click="addManager"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加负责人</el-button>
            </el-breadcrumb>
            <el-table
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; background-color: #c6ffdd"
                :data=" tableData"
            >
                <el-table-column
                    sortable
                    prop="person_code"
                    label="编号">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.person_code}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="name"
                    label="姓名">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="nation"
                    label="民族">
                  <template slot-scope="scope">
                <span  v-for="(nation, index)   in scope.row.nationsList" >
                  {{nation.name}}
                  <span v-if="index === scope.row.nationsList.length-1 "></span>
                  <span  v-else>/</span>
                </span>
                  </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="categoryname"
                    label="项目类别">
                  <template slot-scope="scope">
                <span  v-for="(category, index)   in scope.row.categoryList" >
                  {{category.categoryname}}
                  <span v-if="index === scope.row.categoryList.length-1 "></span>
                  <span  v-else>/</span>
                </span>
                  </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="project_name"
                    label="负责的项目">
                  <template slot-scope="scope">
                <span  v-for="(project, index)   in scope.row.projectsList" >
                  {{project.name}}
                  <span v-if="index === scope.row.projectsList.length-1 "></span>
                  <span  v-else>/</span>
                </span>
                  </template>
                </el-table-column>
                <el-table-column
                    :formatter="formatter"
                    prop="report_area"
                    label="地区">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.report_area}}</span>
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
    name: "Manager",
    data() {
        return{
            search: '',
            tableData:[],
            size:6,
            total: 0,// 数据总条数
            currentPage: 1, // 当前页码
        }
    },
      created() {
          console.log(this.size);
          this.getAllData()
      },
      methods:{
          handleSearch(val) {
              this.currentPage = val; // 设置当前页码为第一页
              console.log("create func");
              this.$http.get("http://localhost:8083/declarer/searchDeclarer/" + this.currentPage + "/" + this.size+"?keyword="+this.search).then(res=>{
                  // this.tableData = res.data
                  this.tableData = res.data.list
                  this.total = Math.ceil (res.data.total/this.size)
                  console.log(res.data);
              })
          },
        getAllData() {
          console.log("create func");
          this.$http.get("http://localhost:8083/declarer/findAll?currentPage=" + this.currentPage + "&size=" + this.size ).then(res=>{

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
              this.getAllData();
          },
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
              this.currentPage= val;
              this.getAllData();
          },
        formatter(row, column) {
          return row.report_area;
        },
        handleEdit(index, id) {
          this.$router.push({path:"/editManager", query: {declarerId: id}});
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
                "http://localhost:8083/declarer/delete",
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
        addManager(){
            alert("请先选择要添加的非遗项目，再添加该项目的负责人")
            this.$router.push('/homeView/project')
        }
    }
}
</script>

<style scoped>


</style>