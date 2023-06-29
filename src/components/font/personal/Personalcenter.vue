<template>
  <div class="app">
      <el-container>
          <el-header>
              <div class="head">
                  <div class="img">
                      <img :src="this.user.pic" alt="">
                  </div>
                  <div class="name">
                      <span style="color: blue; font-weight: bold;font-size: 30px">{{this.user.username}}</span>
                  </div>
              </div>
          </el-header>
          <el-main class="main">
              <el-aside width="200px">
                  <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      active-text-color="#ffd04b">
                      <el-menu-item index="/personalcenter/message" @click="toPmessage">
                          <i class="el-icon-menu"></i>
                          <span slot="title">个人资料</span>
                      </el-menu-item>
                      <el-menu-item index="/personalcenter/collect" @click="tocollect">
                          <i class="el-icon-document"></i>
                          <span slot="title">个人收藏</span>
                      </el-menu-item>
                      <el-submenu index="">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>个人作品</span>
                          </template>
                          <el-menu-item-group style="background-color: rgba(123, 165, 255, 0.32);">
                              <el-menu-item index="/personalcenter/image" @click="toimage">图片作品</el-menu-item>
                              <el-menu-item index="/personalcenter/video" @click="tovideo">视频作品</el-menu-item>
                              <el-menu-item index="/personalcenter/audio" @click="toaudio">音频作品</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <el-menu-item index="/personalcenter/exhibition" @click="toExihibition">
                          <i class="el-icon-date"></i>
                          <span slot="title">已预约展馆</span>
                      </el-menu-item>
                      <el-menu-item index="/personalcenter/repair" @click="toRepair">
                          <i class="el-icon-setting"></i>
                          <span slot="title">修改密码</span>
                      </el-menu-item>
                      <el-menu-item @click="LoginOut">
                          <i class="el-button--search"></i>
                          <span slot="title">退出登录</span>
                      </el-menu-item>
                  </el-menu>
              </el-aside>
              <el-main class="p-main">
                  <!--          功能区域需要显示的数据是由其他组件提供的-->
                  <router-view></router-view>
              </el-main>
          </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
    name: "Personalcenter.vue",
    data(){
        return{
            user:{
                username:"",
                sex:"",
                email:'',
                birthday:'',
                phonenumber:'',
                pic:'',
                id:''
            },
            time:''
        };
    },
    created() {
        this.getUser()
        console.log(this.user);
    },
    methods:{
        getUser(){
            this.$http.get("http://localhost:8083/user/editUser?userId=" + JSON.parse(localStorage.getItem("user")).id)
                .then(res=>{
                    this.user.username = res.data.username
                    this.user.birthday = new Date(res.data.birthday)
                    this.user.sex = res.data.sex
                    this.user.email = res.data.email
                    if (!res.data.pic)
                    {
                        this.user.pic = require("@/assets/23.png")
                    }
                    else
                        this.user.pic = res.data.pic
                    console.log('头像',this.user.pic);
                    this.user.id = res.data.id
                    this.user.phonenumber = res.data.phonenumber
                })
            console.log("前",this.user);
        },
        getData(){
            this.user = JSON.parse(localStorage.getItem("user"))
            this.time = new Date()
        },

        LoginOut(){
            this.$store.commit('logout')
            this.$router.push("/login");
        },
        tocollect(){
            this.$router.push('/personalcenter/collect')
        },
        toPmessage(){
            this.$router.push('/personalcenter/message')
        },
        toaudio(){
            this.$router.push('/personalcenter/audio')
        },
        tovideo(){
            this.$router.push('/personalcenter/video')
        },
        toimage(){
            this.$router.push('/personalcenter/image')
        },
        toRepair(){
            this.$router.push('/personalcenter/repair')
        },
        toExihibition(){
            this.$router.push('/personalcenter/exhibition')
        }
    }
}
</script>
<style scoped>
.app{
    margin-top: 30px;
}
.head{
    display: flex;
    width: 100%;
    height: 150px;
    background-color: rgba(123, 165, 255, 0.32);
    z-index: 1; /* 让侧边栏在内容区域之上 */
    position: fixed;
}
.img{
    margin-left: 100px;
    width: 80px;
    height: 100%;
    /*border: red 1px solid;*/
    align-items: center;
    justify-content: center;
    display: flex;
}
img{

    width: 100%;
    height: 50%;
    border-radius: 50%;
    /*border: red 1px solid;*/
}
.name{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: auto;
    /*border: red 1px solid;*/
}
.el-menu{
    background-color: rgba(123, 165, 255, 0.32);
    width: 100%;
    height: auto;
}
.main{
    margin-left: 100px;
    font-weight: bold;
}
.el-aside{
    z-index: 1; /* 让侧边栏在内容区域之上 */
    position: fixed;
    margin-top:90px;
    background-color: rgba(123, 165, 255, 0.32);
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
    height: 100%;
}
.p-main{
    margin-top: 90px;
    margin-left: 250px;
/*    overflow-x: auto;
    white-space: nowrap;*/
    /*border: black 1px solid;*/
}
/*图标*/
.el-button--search {
    background: url('@/assets/下一个.png') no-repeat center;
    background-color: rgba(123, 165, 255, 0);
    background-size: contain;
    padding-left: 20px; /* 根据图片宽度调整 */
}
</style>