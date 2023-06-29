<template>

    <div class="body">
        <div >
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">{{ videoList.title }}</span>
        </div >
        <div style="display: flex; justify-content: center; align-items: center">
            <div >
                <span style="color: #99a9bf">创建时间：</span>
                <span style="color: #99a9bf">{{videoList.created_date}}</span>
            </div>
            <div style="margin-left: 30px">
                <span style="color: #99a9bf">作者：</span>
                <span style="color: #99a9bf">{{ videoList.username }}</span>
            </div>

        </div>
        <div style="margin-top: 30px; width: 100%; height: 600px; ">
            <!--          <img v-bind:src="videoList.url"  />-->
            <video v-bind:src="videoList.url" style="width: 70%; height: 100%" preload="auto"  controls></video>
        </div>
        <div style="margin-top: 30px">
            <span style="font-weight: bold; font-family: KaiTi; font-size: 20px; ">简介</span>
            <p style="text-indent: 2em">{{ videoList.description }}</p>
        </div>
    </div>
</template>

<script>
import Video from "@/components/font/resources/Videos.vue";

export default {
    name: "VideoDetail",
    components: {Video},
    data(){
        return{
            videoList:[]
        }
    },
    created() {
        this.getImages()
    },
    methods:{
        getImages() {
            this.$http.get('http://localhost:8083/works/findAllById?wid='+this.$route.query.videoId)
                .then(res=>{
                    this.videoList = res.data;
                    console.log(this.videoList)
                })
        },
        getImageByTitle(){
            this.$http.get('http://localhost:8083/images/findByTitle?imageTitle='+this.$route.query.imageTitle)
                .then(res=>{
                    this.videoList = res.data;
                    console.log(this.videoList)
                })
        }
    }
}
</script>

<style scoped>

.body{
    margin-top: 100px;
}
video{
    width: 80%;
    height: 200px;
}
</style>