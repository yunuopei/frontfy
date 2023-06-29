<template>
    <div class="body">
        <div>
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">音频作品</span>
        </div >
        <div class="container">
            <div class="row" style="display: flex;flex-direction: row; margin-top: 25px">
                <div v-for="(audio,index) in displayAudios" style="margin-top: 15px" class="col-sm-12 col-md-6 col-lg-4">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="content" style="width: 100%;height: 200px;display: flex;justify-content: center;align-items: flex-end">
                            <audio controls v-bind:src="audio.url" style='width: 250px; height: 50px; padding: 0px 0px; z-index: 9999' ></audio>
                        </div>
                        <div style="padding: 14px;">
                            <span>{{ audio.title }}</span>
                            <div class="bottom clearfix" >
                                    <time class="time" style="color: #99a9bf">{{ audio.created_date }}</time>
                                <br>

                                    <el-button style="margin-left: 30px" @click="toDetail(audio.id)" type="text" class="button">查看</el-button>
                                    <i style="float: right; cursor: pointer; font-size: 25px" :class="{'el-icon-star-off': !audio.Clicked, 'el-icon-star-on': audio.Clicked}" @click="toggleIcon(index)"></i>

                            </div>
                        </div>
                    </el-card>
                </div>
                <div class="show" v-if="audioList.length>6" @click="showAllAudio = !showAllAudio">
                    <span>{{text}}</span>
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
    name: "AudioAndVideo",
    data(){
        return{
            collectedIds:[],
            owner:{
                userId:id,
                collectedId:'',
            },
            audioList:[],
            input:'',
            showAllAudio:false
        }
    },
    computed:{
        displayAudios(){
            if(this.showAllAudio)
                return this.audioList
            else
                return this.audioList.slice(0,6)
        },
        text(){
            return this.showAllAudio ? "收起" : "查看更多"
        }
    },
    created() {

        this.getAudio()

    },
    methods:{
        toggleIcon(index) {
            console.log(index);
            this.audioList[index].Clicked = !this.audioList[index].Clicked
            this.owner.collectedId = this.audioList[index].id
            console.log(this.audioList[index].Clicked);
            if(this.audioList[index].Clicked)
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

            Vue.set(this.audioList, index, this.audioList[index]); // 手动触发响应式更新
        },
        getAudio(){
            this.getCollectedWorks()
            // console.log("create func");
            this.$http.get("http://localhost:8083/works/findAllFont?categoryId=2").then(res=>{
                this.audioList = res.data
                for(let i = 0; i<this.audioList.length; i++)
                {
                    if(this.collectedIds.includes(this.audioList[i].id))
                        this.audioList[i].Clicked = true
                    else
                        this.audioList[i].Clicked = false;
                }
                console.log(this.audioList);
            })
        },
        getCollectedWorks() {
            this.$http.get("http://localhost:8083/owner/findCollectById?userId=" + id + "&categoryId=2")
                .then(res => {
                    this.collectedIds = res.data.map(item => item.collectedId); // 获取已收藏作品的ID
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getVideo(){
            this.$http.get("http://localhost:8083/works/findAllFont?categoryId=2").then(res=>{
                this.audioList = res.data
                for(let i = 0; i<this.audioList.length; i++)
                {
                    this.audioList[i].Clicked = false;
                }
                console.log(res.data);
            })
        },
        toDetail(id){
            this.$router.push({path:"/userHome2/audioDetail", query: {audioId: id}});
        }
    }

}
</script>

<style scoped>
.body{
    margin-top: 40px;
}
.content{
    background-image: url("@/assets/20.jpg");
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