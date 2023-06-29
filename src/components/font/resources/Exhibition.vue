<template>
  <div class="body">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">展览馆</span>
      </div >
      <el-input
          style="width: 450px; margin-top: 20px"
          placeholder="请输入要查找的展馆名称"
          v-model="input"
          ref="input"
      >
          <i  slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button style="margin-left: 100px" type="primary" icon="el-icon-plus" @click="toadd">发布展馆</el-button>
      <div class="carousel" style="margin-top: 20px">
          <div class="image-container" >
              <div class="text-container" >
                  <img style="cursor: pointer"  @click="toDetail(index)" v-for="(exhibition, index) in exhibitionList" :key="index" :src="exhibition.url" :class="{ active: activeIndex === index }">
              </div>
              <div class="text-container">
                  <div class="item" v-for="(exhibition, index) in exhibitionList" :key="index" @click="activeIndex = index">
                      <span >{{ exhibition.title }}</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row" style="display: flex;flex-direction: row; margin-top: 25px;margin-left: 50px">
              <div  style="margin-top: 15px; " class="col-sm-12 col-md-12 col-lg-6" v-for="(exhibition, index) in exhibitionList" :key="index" >
                  <el-card   :body-style="{ padding: '0px' }" style="width: 80%;">
                      <img @click="toDetail(index)" style="width: 100%;height: 300px;cursor: pointer"  :src="exhibition.url" :class="{ active: activeIndex === index }">
                      <div style="padding: 14px;" >
                              <div >
                                  <span>{{ exhibition.title }}</span>
                              </div>
                              <div>
                                  <span style="color: #99a9bf;">{{ exhibition.created_date }}</span>
                              </div>
                              <div style="display: flex;justify-content: center;align-items: center">
                                  <el-button style="margin-top: 30px" type="primary" icon="el-icon-date" :style="{display: exhibition.Clicked ? 'none' : 'block'}" @click="toggleIcon(index)" >预约</el-button>
                                  <el-button style="margin-top: 30px" :style="{display: exhibition.Clicked ? 'block' : 'none'}" type="success" icon="el-icon-check" @click="deleteBook(index)" circle></el-button>
                              </div>
<!--                          <el-button type="success" icon="el-icon-check" circle></el-button>-->
                      </div>
                  </el-card>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
let id;
if(JSON.parse(localStorage.getItem("user")) === null)
    id = -1;
else
    id = JSON.parse(localStorage.getItem("user")).id
console.log('id = ',id)
export default {
    name: "Exhibition",
    data() {
        return {
            exhibitionList:[],
            BookedIds:[],
            owner:{
                userId:id,
                exhibitionId:'',
            },
            carouselHeight: '400px',
            activeIndex: 0,
            input:''
        }
    },
    created() {
        this.getExhibition();
    },
    mounted() {

        this.$refs.input.$refs.input.addEventListener('keyup', this.handleEnter);

        console.log(this.input.toString())


    },
    beforeDestroy() {
        this.$refs.input.$refs.input.removeEventListener('keyup', this.handleEnter);
    },
    methods: {
        handleEnter(event){
            if (event.keyCode === 13) {
                console.log(this.input)
                this.$router.push({path:'/userHome2/exhibitionDetail2',query:{title:this.input}})
            }
        },
        changeIndex(index) {
            this.activeIndex = index;
        },
        toDetail(index){
          this.$router.push({path:'/userHome2/exhibitionDetail',query:{eid:this.exhibitionList[index].id}})
        },
        getExhibition(){
            this.getBooks()
            this.$http.get("http://localhost:8083/exhibition/findAllByStatusFont?status=1").then(res=>{
                this.exhibitionList = res.data
                for(let i = 0; i<this.exhibitionList.length; i++)
                {
                    if(this.BookedIds.includes(this.exhibitionList[i].id))
                        this.exhibitionList[i].Clicked = true;
                    else
                        this.exhibitionList[i].Clicked = false;

                }
                console.log(this.exhibitionList);
            })
        },
        getBooks() {
            this.$http.get("http://localhost:8083/owner/findExhibitionById?userId=" + id)
                .then(res => {
                    this.BookedIds = res.data.map(item => item.exhibitionId); // 获取已收藏作品的ID
                })
                .catch(error => {
                    console.error(error);
                });
            console.log(this.BookedIds);
        },
        toadd(){
            this.$router.push('/userHome2/addExhibition')
        },
        toggleIcon(index) {
            console.log(index);
            this.exhibitionList[index].Clicked = true
            this.owner.exhibitionId = this.exhibitionList[index].id
            console.log(this.exhibitionList[index].Clicked);
            if(this.exhibitionList[index].Clicked)
            {
                this.$http.post('http://localhost:8083/owner/Book',this.owner)
                    .then(res=>{
                        if(res.data.code == 200)
                        {

                            this.$message.success("预约成功！")
                        }

                        else
                            this.$message.warning("该展馆已约满！")
                    })
                    .catch(res=>{
                        this.$message.error("预约失败！");
                    })
            }
            Vue.set(this.exhibitionList, index, this.exhibitionList[index]); // 手动触发响应式更新

        },
        deleteBook(index){
            console.log(this.exhibitionList[index].Clicked);
            this.exhibitionList[index].Clicked = false
            this.owner.exhibitionId = this.exhibitionList[index].id
            console.log(this.owner);
            if (!this.exhibitionList[index].Clicked)
            {
                this.$http.post('http://localhost:8083/owner/deleteExhibition',this.owner)
                    .then(res=>{
                        this.$message.error("取消预约！")

                    })
                    .catch(res=>{
                        this.$message.warning("取消失败！")
                    })
            }

            Vue.set(this.exhibitionList, index, this.exhibitionList[index]); // 手动触发响应式更新
        },

    }
}
</script>

<style scoped>
.body{
    margin-top: 40px;

}
.carousel .image-container img {
    display: none;
}

.carousel .image-container img.active {
    display: block;
}
.bottom{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.item2{
    margin-left: 60px;
}
.image-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.text-container{
    width: 30%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(128,128,128,0.5);
}
img{
    width: 100%;
    height: 100%;
}
.item{
    margin-top: 10px;
    background-color: rgba(123, 141, 255, 0.1);
    width: 80%;
    height: 30px;
    cursor: pointer;
    /*pointer-events: all;*/
}

</style>