<template>
    <div style="margin-top: 30px; ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>非遗项目管理</el-breadcrumb-item>
            <el-button style="float: right" round @click="addProject"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加项目</el-button>
        </el-breadcrumb>
        <el-table
                style="width: 100%; background-color: #c6ffdd"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :data=" tableData"
        >
            <el-table-column
                sortable
                prop="code"
                label="项目编号">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
                sortable
                prop="name"
                label="项目名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
                sortable
                prop="categoryname"
                label="类别">
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
                prop="public_date"
                label="申报日期">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.public_date}}</span>
              </template>
            </el-table-column>
            <el-table-column
                :formatter="formatter"
                prop="report_area"
                label="申报地址">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.report_area}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="protect_area"
                label="保护地址">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.protect_area}}</span>
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
</template>

<script>
export default {
    name: "Project",
    data() {
        return{
            search: '',
            tableData:[],
            size:6,
            total:0,
            currentPage:1
        }
    },
    computed: {
      // 根据当前页码和每页显示的行数，计算出本页要显示的数据
       tableData() {
        return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase())||  data.public_date.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
      }
    },
    mounted() {
      this.getAllData()
    },
    methods:{
        handleSearch(val) {
            this.currentPage = val; // 设置当前页码为第一页
            console.log("create func");
            this.$http.get("http://localhost:8083/project/searchProject/" + this.currentPage + "/" + this.size+"?keyword="+this.search).then(res=>{
                // this.tableData = res.data
                this.tableData = res.data.list
                this.total = Math.ceil (res.data.total/this.size)
                console.log(res.data);
            })
        },
        getAllData() {
            console.log("create func");
            this.$http.get("http://localhost:8083/project/findAll?currentPage=" + this.currentPage + "&size=" + this.size ).then(res=>{

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
          return row.report_area;
        },
        handleEdit(index, id) {
          this.$router.push({path:"/editProject", query: {projectId: id}});
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
              "http://localhost:8083/project/delete",
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
        addProject(){
            this.$router.push('/addProject')
        }
    }
}
</script>

<style scoped>

</style>