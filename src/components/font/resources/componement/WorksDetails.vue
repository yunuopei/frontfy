<template>

    <div class="body">
        <el-card style="margin-top: 20px" shadow="always" v-for="works in worksList">
            <div  class="content">
                <div class="item1" @click="toDetail(works.url,works.id)">
                    <template v-if="isImage(works.url)">
                        <img :src="works.url" alt="Image">
                    </template>
                    <template v-else-if="isAudio(works.url)">
                        <audio controls>
                            <source :src="works.url" type="audio/mpeg">
                        </audio>
                    </template>
                    <template v-else-if="isVideo(works.url)">
                        <video controls>
                            <source :src="works.url" type="video/mp4">
                        </video>
                    </template>
                    <template v-else>
                        <a :href="works.url">Link</a>
                    </template>
                </div>
                <div class="item2" style="display: flex;flex-direction: column">
                    <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">标题:{{works.title}}</span>
                    <span style="color: gray;font-size: 15px">创建时间:{{works.created_date}}</span>
                    <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">描述:</span>
                    <p style="text-indent: 2em">{{works.description}}</p>
                </div>
            </div>


        </el-card>
    </div>

</template>

<script>
import Video from "@/components/font/resources/Videos.vue";

export default {
    name: "WorksDetails",
    components: {Video},
    data(){
        return{
            worksList:[]
        }
    },
    created() {
        this.getworksByTitle()
    },
    methods:{
        getworksByTitle(){
            this.$http.get('http://localhost:8083/works/findByAll?keyword='+this.$route.query.title)
                .then(res=>{
                    this.worksList = res.data;
                    console.log(this.worksList)
                })
        },
        toDetail(url,id){
            if(this.isImage(url))
                this.$router.push({path:"/userHome2/imageDetail", query: {imageId: id}});
            else if(this.isVideo(url))
                this.$router.push({path:"/userHome2/videoDetail", query: {videoId: id}});
            else
                this.$router.push({path:"/userHome2/audioDetail", query: {audioId: id}});

        },
        isImage(link) {
            return link.endsWith('.jpg') || link.endsWith('.png') || link.endsWith('.webp'); // 判断链接是否为图片
        },
        isAudio(link) {
            return link.endsWith('.mp3') || link.endsWith('.wav') || link.endsWith('.ogg'); // 判断链接是否为音频
        },
        isVideo(link) {
            return link.endsWith('.mp4') || link.endsWith('.mov'); // 判断链接是否为视频
        }
    }
}
</script>

<style scoped>
.body{
    margin-top: 100px;
}
.content{
    display: flex;
    flex-direction: row;
}
img,video{
    width: 100%;
    height: 200px;
}
audio{
    width: 100%;
    height: 200px;
    background-image: url("@/assets/20.jpg");
}
.item1{
    width: 20%;
    cursor: pointer;
    /*border: red solid 1px;*/
}
.item2{
    margin-left: 30px;
    width: 60%;
    /*border: red solid 1px;*/
}
</style>