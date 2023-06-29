<template>
  <div class="app">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">图片作品</span>
      </div >
      <div class="container">
          <div class="row" style="display: flex;flex-direction: row; margin-top: 25px"  >
              <div style=" margin-top: 15px;margin-left: 60px; " class="col-sm-12 col-md-6 col-lg-3 " v-for="(itmes,index) in datalist" >
                  <div class="card">
                      <el-card :body-style="{ padding: '0px' }">
                          <!--                      <img v-bind:src="image.url" class="image" />-->
                          <!--                      <video v-bind:src="image.url" controls></video>-->
                          <img  @click="toDetail(itmes.id)" style="cursor: pointer" :src="itmes.url" class="image">
                          <div style="padding: 14px;">
                              <span>{{ itmes.title }}</span>
                              <div class="bottom clearfix">
                                  <span style="font-weight: normal;color: #99a9bf" class="overflow-ellipsis">{{ description(itmes.description) }}</span>
                                  <br>
                                  <el-button type="text" class="button" @click="toModify(itmes.id)">编辑</el-button>
                                  <el-button type="text" class="button" style="color: red" @click="deleteworks(itmes)">删除</el-button>
                              </div>
                          </div>
                      </el-card>
                  </div>

              </div>
          </div>
      </div>
  </div>
</template>

<script>
let id;
if(JSON.parse(localStorage.getItem("user")) === null)
    id = -1;
else
    id = JSON.parse(localStorage.getItem("user")).id
console.log('id = ',id)
export default {
    name: "Pimage",
    data(){
        return{
            datalist:[]
        }
    },
    created() {
        this.getData()
    },
    methods:{
        toModify(id){
            this.$router.push({path:'/personalcenter/modifyImage',query:{workId:id}})
        },
        toDetail(id){
            console.log(id)
            this.$router.push({path:"/userHome2/imageDetail", query: {imageId: id}});
            // this.$router.push('/userHome2/imageDetail')
        },
        getData(){
            this.$http.get('http://localhost:8083/works/findAllByUserId?userId=' + id + "&categoryId=1")
                .then(res=>{
                    this.datalist = res.data
                })
        },
        description(description) {
            console.log(description);
            const maxLength = 10; // 设置最大长度为10个字符
            if (description.length > maxLength) {
                return description.slice(0, maxLength) + '...';
            } else {
                return description;
            }
        },
        deleteworks(image){
            console.log(image);
            this.$http.post('http://localhost:8083/works/delete',image)
                .then(res=>{
                    this.$message.success("删除成功！")
                    window.location.reload()
                })
                .catch(res=>{
                    this.$message.error("删除失败！")
                })
        }

    },
}
</script>

<style scoped>
.card{
    height: 300px;
    width: 300px;
    margin-left: 30px;
}
.el-card{
    width: 100%;
    height: 100%;
}
.image{
    width: 100%;
    height: 200px;
}
.overflow-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>