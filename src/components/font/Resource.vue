<template>

  <div class="body">
          <div>
              <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">资源</span>
          </div >
          <div class="container" style="margin: auto; margin-top: 20px">
              <div class="row" style="margin-top: 40px;margin: auto">
                  <div class="col-md-6 item" @click="toTuxiang" >
                      <span>图像</span>
                  </div>
                  <div class="col-md-6 item" @click="toAudioAndVideo">
                      <span>音乐欣赏</span>
                  </div>
                  <div class="col-md-6 item" @click="toVideo">
                      <span>视频欣赏</span>
                  </div>
                  <div class="col-md-6 item" @click="toExhibition ">
                      <span>展览</span>
                  </div>
              </div>

          </div>

      <div>
          <div  :style="{display: this.display ? 'block' : 'none'}">
              <el-input
                      style="width: 450px; margin-top: 20px"
                      placeholder="请输入要查找的作品标题"
                      v-model="input"
                      ref="input"
              >
                  <i  slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button style="margin-left: 100px" type="primary" icon="el-icon-plus" @click="toadd">上传作品</el-button>
          </div>
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
    name: "Resource",
    data(){
        return{
            input:'',
            display:true
        }
    },
    mounted() {

        if(this.$route.path == "/userHome2/resource/exhibition")
            this.display = false
        console.log(this.display);
        this.$refs.input.$refs.input.addEventListener('keyup', this.handleEnter);

        console.log(this.input.toString())


    },
    beforeDestroy() {
        this.$refs.input.$refs.input.removeEventListener('keyup', this.handleEnter);
    },
    methods:{
        handleEnter(event){
            if (event.keyCode === 13) {
                console.log(this.input)
                this.$router.push({path:'/userHome2/worksDetails',query:{title:this.input}})
            }
        },
        toTuxiang(){
            this.display = true
            this.$router.push('/userHome2/resource/tuxiang');
        },
        toAudioAndVideo(){
            this.display = true
            this.$router.push('/userHome2/resource/audioAndVideo')
        },
        toExhibition(){
            this.display = true
            this.display = false
            this.$router.push('/userHome2/resource/exhibition')
        },
        toVideo(){
            this.display = true
            this.$router.push('/userHome2/resource/video')
        },
        toadd(){
            this.$router.push('/userHome2/addWorks')
        },
    }
}
</script>

<style scoped>

.body{
    margin-top: 110px;
}
.item{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-left: 50px;
    font-family: KaiTi;
    background-color: rgba(128,128,128,0.1);
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}
.item:hover{
    background-color: rgba(128,128,128,0.5);
    color: white;
    cursor: pointer;
}
</style>