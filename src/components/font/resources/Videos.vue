<template>
    <div class="body">
        <div>
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">视频作品</span>
        </div >
        <div class="container">
            <div class="row" style="display: flex;flex-direction: row; margin-top: 25px"  >
                <div style="margin-top: 15px" class="col-sm-12 col-md-6 col-lg-4" v-for="(video,index) in displayVideos" >
                    <el-card :body-style="{ padding: '0px' }">
                        <video controls v-bind:src="video.url" class="image" />
                        <!--                      <video v-bind:src="image.url" controls></video>-->
                        <!--                      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                        <div style="padding: 14px;">
                            <span>{{ video.title }}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ video.created_date }}</time>
                                <br>
                                <i class="fi fi-rr-heart" style="font-size: 25px; float: left"></i>
                                <el-button style="margin-left: 30px" @click="toDetail(video.id)" type="text" class="button">查看</el-button>
                                <!--                              <el-button @click="toggleIcon">
                                                                  <i :class="iconClass"></i>
                                                              </el-button>-->
                                <i style="float: right; cursor: pointer; font-size: 25px" :class="{'el-icon-star-off': !video.Clicked, 'el-icon-star-on': video.Clicked}" @click="toggleIcon(index)"></i>
                                <!--                              <i @click="toggleIcon(index)" style="float: right; cursor: pointer; font-size: 25px" :class='iconClass'>{{image.Clicked}}</i>-->
                            </div>
                        </div>

                    </el-card>
                </div>
                <div class="show" v-if="videoList.length>6" @click="showAllVideo = !showAllVideo">
                    <span>{{text}}</span>
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
import {image} from "zrender/lib/svg-legacy/graphic";
import Vue from "vue";

export default {
    name: "Video",
    computed: {
        displayVideos(){
            if(this.showAllVideo)
                return this.videoList
            else
                return this.videoList.slice(0,6)
        },
        text(){
            return this.showAllVideo ? "收起" : "查看更多"
        }
    },
    data(){
        return {
            collectedIds:[],
            videoList:[],
            input:'',
            owner:{
                userId:id,
                collectedId:'',
            },
            showAllVideo:false
        }
    },

    created() {
        console.log(this.input.toString())
        this.getVideos()
    },
    methods:{
        toggleIcon(index) {
            console.log(index);
            this.videoList[index].Clicked = !this.videoList[index].Clicked
            this.owner.collectedId = this.videoList[index].id
            console.log(this.videoList[index].Clicked);
            if(this.videoList[index].Clicked)
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

            Vue.set(this.videoList, index, this.videoList[index]); // 手动触发响应式更新
        },
        getVideos(){
            this.getCollectedWorks()
            // console.log("create func");
            this.$http.get("http://localhost:8083/works/findAllFont?categoryId=3").then(res=>{
                this.videoList = res.data

                for(let i = 0; i<this.videoList.length; i++)
                {
                    if(this.collectedIds.includes(this.videoList[i].id))
                        this.videoList[i].Clicked = true
                    else
                        this.videoList[i].Clicked = false;
                }
                console.log(this.videoList);
            })
        },
        getCollectedWorks() {
            this.$http.get("http://localhost:8083/owner/findCollectById?userId=" + id + "&categoryId=3")
                .then(res => {
                    this.collectedIds = res.data.map(item => item.collectedId); // 获取已收藏作品的ID
                })
                .catch(error => {
                    console.error(error);
                });
        },
        toDetail(id){
            console.log(id)
            this.$router.push({path:"/userHome2/videoDetail", query: {videoId: id}});
            // this.$router.push('/userHome2/imageDetail')
        }
    }
}
</script>

<style scoped>
.body{
    margin-top: 40px;
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