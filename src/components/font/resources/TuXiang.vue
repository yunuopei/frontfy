<template>
  <div class="body">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">图像作品</span>
      </div >
      <div class="container">
          <div class="row" style="display: flex;flex-direction: row; margin-top: 25px"  >
              <div style="margin-top: 15px" class="col-sm-12 col-md-6 col-lg-4" v-for="(image,index) in displayImages" >
                  <el-card :body-style="{ padding: '0px' }">
                      <img v-bind:src="image.url" class="image" />
<!--                      <video v-bind:src="image.url" controls></video>-->
<!--                      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                      <div style="padding: 14px;">
                          <span>{{ image.title }}</span>
                          <div class="bottom clearfix">
                              <time class="time">{{ image.created_date }}</time>
                              <br>
                              <i class="fi fi-rr-heart" style="font-size: 25px; float: left"></i>
                              <el-button style="margin-left: 30px" @click="toDetail(image.id)" type="text" class="button">查看</el-button>
<!--                              <el-button @click="toggleIcon">
                                  <i :class="iconClass"></i>
                              </el-button>-->
                                 <i style="float: right; cursor: pointer; font-size: 25px" :class="{'el-icon-star-off': !image.Clicked, 'el-icon-star-on': image.Clicked}" @click="toggleIcon(index)"></i>
<!--                              <i @click="toggleIcon(index)" style="float: right; cursor: pointer; font-size: 25px" :class='iconClass'>{{image.Clicked}}</i>-->
                          </div>
                      </div>

                  </el-card>
              </div>
              <div class="show" v-if="imageList.length>6"  @click="showAllImage = !showAllImage">
                  <span>{{text}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {image} from "zrender/lib/svg-legacy/graphic";
import Vue from "vue";

let id;
if(JSON.parse(localStorage.getItem("user")) === null)
    id = -1;
else
    id = JSON.parse(localStorage.getItem("user")).id
console.log('id = ',id)
export default {
    name: "TuXiang",
    computed: {
        image() {
            return image
        },
        displayImages(){
            if(this.showAllImage)
                return this.imageList
            else
                return this.imageList.slice(0,6)
        },
        text(){
            return this.showAllImage ? "收起" : "查看更多"
        }
    },
    data(){
      return {
          imageList:[],
          collectedIds: [],
          input:'',
          showAllImage:false,
          owner:{
              userId:id,
              collectedId:'',
          }
      }
    },


    created() {
        this.getImages()
    },
    methods:{
        toggleIcon(index) {
            console.log(index);
            this.imageList[index].Clicked = !this.imageList[index].Clicked
            console.log(this.imageList[index].Clicked);
            this.owner.collectedId = this.imageList[index].id
            console.log(this.owner);
            if(this.imageList[index].Clicked)
            {
                this.$http.post('http://localhost:8083/owner/addCollect',this.owner)
                    .then(res=>{
                        this.$message.success("收藏成功！")
                    })
                    .catch(res=>{
                        this.$message.error("收藏失败！");
                    })

            }
            else
            {
                this.$http.post('http://localhost:8083/owner/delectCollect',this.owner)
                    .then(res=>{
                        this.$message.error("取消收藏！")
                    })
                    .catch(res=>{
                        this.$message.warning("取消失败！")
                    })
            }


            Vue.set(this.imageList, index, this.imageList[index]); // 手动触发响应式更新

        },


        getImages(){
            this.getCollectedWorks(); // 获取已收藏作品
            // console.log("create func");
            this.$http.get("http://localhost:8083/works/findAllFont?categoryId=1").then(res=>{
                this.imageList = res.data
                for (let i = 0; i < this.imageList.length; i++) {
                    if (this.collectedIds.includes(this.imageList[i].id)) {
                        this.imageList[i].Clicked = true; // 已收藏的作品
                    } else {
                        this.imageList[i].Clicked = false; // 未收藏的作品
                    }
                }
                })
        },
        getCollectedWorks() {
            this.$http.get("http://localhost:8083/owner/findCollectById?userId=" + id + "&categoryId=1")
                .then(res => {
                    this.collectedIds = res.data.map(item => item.collectedId); // 获取已收藏作品的ID
                })
                .catch(error => {
                    console.error(error);
                });
        },
        toDetail(id){
            console.log(id)
            this.$router.push({path:"/userHome2/imageDetail", query: {imageId: id}});
            // this.$router.push('/userHome2/imageDetail')
        }
    }
}
</script>

<style scoped>
    .body{
        margin-top: 30px;
    }
    .item{
        width: 30%;
        height: auto;
        /*border: solid 1px red;*/
        margin-left: 33px;
    }
    img{
        width: 100%;
        height: 200px;
    }
    video{
        width: 100%;
        height: 200px;
    }
.show{
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
    font-family: KaiTi;
    cursor: pointer;
}
.show:hover{
    color: #64b3f4;
}
</style>