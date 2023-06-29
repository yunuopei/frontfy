<template>
    <div style="margin-top: 30px; ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文献管理</el-breadcrumb-item>
            <el-button style="float: right" round @click="addPapper"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加文献</el-button>
        </el-breadcrumb>
        <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%; background-color: #c6ffdd"
            :data=" tableData"
        >
            <el-table-column
                sortable
                prop="title"
                label="文献标题">
              <template slot-scope="scope">
                <el-tooltip style="margin-left: 10px" effect="dark" :content="scope.row.title">
                  <div   class="text-ellipsis">{{ scope.row.title }}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
                    label="文献描述"
                    :formatter="formatter"
                    prop="description">
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
                <span style="margin-left: 10px">{{ scope.row.author}}</span>
              </template>
            </el-table-column>
            <el-table-column
                sortable
                prop="pub_date"
                label="上传时间">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pub_date}}</span>
              </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <div style="display: flex; align-items: center;width: 200px;">
                        <el-input style="width:200px;"
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
                    <el-button
                        type=""
                        size="mini"
                        @click="handleShow(scope.$index, scope.row)">查看</el-button>
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
    name: "Papper",
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

      return this.tableData.filter(data => !this.search || data.author.toLowerCase().includes(this.search.toLowerCase())|| data.title.toLowerCase().includes(this.search.toLowerCase())|| data.pub_date.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
    }
  },

  mounted() {
    this.getAllData()
  },
    methods:{
        handleSearch(val) {
            this.currentPage = val; // 设置当前页码为第一页
            console.log("create func");
            this.$http.get("http://localhost:8083/papper/searchPapper/" + this.currentPage + "/" + this.size+"?keyword="+this.search).then(res=>{
                // this.tableData = res.data
                this.tableData = res.data.list
                this.total = Math.ceil (res.data.total/this.size)
                console.log(res.data);
            })
        },
        getAllData() {
            console.log("create func");
            this.$http.get("http://localhost:8083/papper/findAll?currentPage=" + this.currentPage + "&size=" + this.size ).then(res=>{

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
      handleShow(index, row) {
            console.log(index, row);
          window.open(row.url,'_blank')
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
              "http://localhost:8083/papper/delete",
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
        addPapper(){
            this.$router.push('/addPapper')
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
/* 鼠标悬浮时显示全部内容 */
.text-ellipsis:hover + .tooltip {
  display: block;
}

/* 提示框样式 */
.tooltip {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  white-space: normal;
  word-wrap: break-word;
  max-width: 200px;
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
}
</style>