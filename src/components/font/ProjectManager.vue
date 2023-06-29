<template>
  <div class="body">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">非遗项目负责人</span>
      </div >
    <div style="margin-top: 30px; ">
      <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 100%; background-color: #c6ffdd"
          :data=" tableData"      >
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
                    <el-input style="width:130px;"
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
    name: "ProjectManager",
    data() {
    return{
      search: '',
      tableData:[],
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
  }
}
</script>

<style scoped>
  .body{

  }
</style>