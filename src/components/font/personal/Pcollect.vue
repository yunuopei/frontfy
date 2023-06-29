<template>
  <div class="app">
      <div class="items">
          <div class="lable">
              <span>图片</span>
          </div>
          <div class="content">
              <div v-for="item in displayImages" style="display: flex; flex-direction: column">
                  <img @click="toDetailimg(item.works.id)" style="cursor: pointer" :src="item.works.url" alt="">
                  <span style="color: gray">{{item.works.title}}</span>
              </div>
              <div class="text" v-if="imageList.length>3" @click="showAllImages = !showAllImages">
                  <span>{{ showMoreText_m }}</span>
              </div>
          </div>


      </div  >
      <div class="items">
          <div class="lable">
              <span>视频</span>
          </div>
          <div class="content">
              <div v-for="video in displayVideos" style="display: flex; flex-direction: column">
                  <video controls :src="video.works.url"></video>
                  <span @click="toDetailvio(video.works.id)" class="pointed" >{{video.works.title}}</span>
              </div>
              <div class="text" v-if="videoList.length>3" @click="showAllVideos = !showAllVideos">
                  <span>{{ showMoreText_v }}</span>
              </div>
          </div>
      </div>
      <div  class="items">
          <div class="lable">
              <span>音频</span>
          </div>
          <div class="content">
              <div v-for="audio in displayAudios" style="display: flex; flex-direction: column">
                  <audio controls :src="audio.works.url" alt=""></audio>
                  <span @click="toDetailaio(audio.works.id)" class="pointed">{{audio.works.title}}</span>
              </div>
              <div class="text" v-if="audioList.length>3" @click="showAllAudios = !showAllAudios">
                  <span>{{ showMoreText_a }}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// 获取用户id
let id;
if(JSON.parse(localStorage.getItem("user")) === null)
    id = -1;
else
    id = JSON.parse(localStorage.getItem("user")).id
console.log('id = ',id)
export default {
    name: "Pcollect",
    data(){
        return{
            works:'',
            imageList:[],
            videoList:[],
            audioList:[],
            showAllImages:false,
            showAllVideos:false,
            showAllAudios:false
        }
    },
    created() {
        this.getData()
    },
    computed: {
        displayImages() {
            if(this.showAllImages)
                return this.imageList
            else
                return this.imageList.slice(0,3)
        },
        showMoreText_m() {
            return this.showAllImages ? '收起' : '更多'
        },
        displayVideos() {
            if(this.showAllVideos)
                return this.videoList
            else
                return this.videoList.slice(0,3)
        },
        showMoreText_v() {
            return this.showAllVideos ? '收起' : '更多'
        },
        displayAudios() {
            if(this.showAllAudios)
                return this.audioList
            else
                return this.audioList.slice(0,3)
        },
        showMoreText_a() {
            return this.showAllAudios ? '收起' : '更多'
        },
    },
    methods:{
        getData(){
            this.$http.get('http://localhost:8083/owner/findCollectById?userId=' + id + "&categoryId=1")
                .then(res=>{
                    this.imageList = res.data
                    console.log(this.imageList);
                })

            this.$http.get('http://localhost:8083/owner/findCollectById?userId=' + id + "&categoryId=3")
                .then(res=>{
                    this.videoList = res.data
                    console.log(this.videoList);
                })

            this.$http.get('http://localhost:8083/owner/findCollectById?userId=' + id + "&categoryId=2")
                .then(res=>{
                    this.audioList = res.data
                })
        },
        toDetailaio(id){
            console.log(id);
            this.$router.push({path:"/userHome2/audioDetail", query: {audioId: id}});
        },
        toDetailvio(id){
            console.log(id)
            this.$router.push({path:"/userHome2/videoDetail", query: {videoId: id}});
            // this.$router.push('/userHome2/imageDetail')
        },
        toDetailimg(id){
            console.log(id)
            this.$router.push({path:"/userHome2/imageDetail", query: {imageId: id}});
            // this.$router.push('/userHome2/imageDetail')
        }
    }
}
</script>

<style scoped>
.lable{
    float: left;
    font-size: 25px;
    font-family: KaiTi;

}
.app{
    display: flex;
    flex-direction: column;
}
.items{
    margin-top: 30px;
}
.content{
    display: flex;
}
img,video,audio{
    margin-top: 30px;
    width: 250px;
    height: 200px;
    margin-left: 25px;
}
audio{
    background-image: url("@/assets/20.jpg");
}
.text{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    cursor: pointer;
}
.text:hover{
    color: dodgerblue;
}
.pointed{
    cursor: pointer;
    margin-top: 10px;
}
.pointed:hover{
    color: deepskyblue;
}
</style>