<template>
  <div class="app">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">已预约展馆</span>
      </div >
      <div class="container">
          <div class="row" style="display: flex;flex-direction: row; margin-top: 25px"  >
              <div style=" margin-top: 15px" class="col-sm-12 col-md-6 col-lg-3" v-for="(exihibition,index) in exihibitionList" >
                  <el-card :body-style="{ padding: '0px' }">
                      <!--                      <img v-bind:src="image.url" class="image" />-->
                      <!--                      <video v-bind:src="image.url" controls></video>-->
                      <img  @click="toDetail(exihibition.exhibitions.id)" style="cursor: pointer" :src="exihibition.exhibitions.url" class="image">
                      <div style="padding: 14px;">
                          <span>{{ exihibition.exhibitions.title }}</span>

                          <div class="bottom clearfix">
                              <span style="font-weight: normal;color: #99a9bf" class="overflow-ellipsis">{{ description(exihibition.exhibitions.description) }}</span>
                              <br>
                              <el-button type="text" @click="deleteExhibition(exihibition.exhibitions.id)" class="button" style="color: red">取消预约</el-button>
                          </div>
                      </div>
                  </el-card>
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
    name: "Pexhibition",
    data(){
        return{
            exihibitionList:[],
            owner:{
                userId:id,
                exhibitionId:'',
            },
        }
    },
    created() {
        this.getData()
    },
    methods:{
        deleteExhibition(id){
            this.owner.exhibitionId = id
            this.$http.post('http://localhost:8083/owner/deleteExhibition',this.owner)
                .then(res=>{
                    this.$message.error("取消预约！")
                    window.location.reload()
                })
                .catch(res=>{
                    this.$message.warning("取消失败！")
                })
        },
        toDetail(id){
            this.$router.push({path:'/userHome2/exhibitionDetail',query:{eid:id}})
        },
        getData(){
            this.$http.get('http://localhost:8083/owner/findExhibitionById?userId=' + id)
                .then(res=>{
                    this.exihibitionList = res.data
                    console.log(this.exihibitionList);
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
    }
}
</script>

<style scoped>
img{
    width: 250px;
    height: 250px;
}
.overflow-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>