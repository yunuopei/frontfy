<template>
<div>
    <div>
        <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">视频作品</span>
    </div >
    <div class="container">
        <div class="row" style="display: flex;flex-direction: row; margin-top: 25px"  >
            <div style=" margin-top: 15px;margin-left: 40px" class="col-sm-12 col-md-6 col-lg-3" v-for="itmes in datalist" >
                <div class="card">
                    <el-card :body-style="{ padding: '0px' }">
                        <!--                      <img v-bind:src="image.url" class="image" />-->
                        <!--                      <video v-bind:src="image.url" controls></video>-->
                        <video controls :src="itmes.url" class="image"></video>
                        <div style="padding: 14px;">
                            <span @click="toDetail(itmes.id)" class="pointed">{{ itmes.title }}</span>

                            <div class="bottom clearfix">
                                <span style="font-weight: normal;color: #99a9bf">{{ description(itmes.description) }}</span>
                                <br>
                                <el-button type="text" class="button" @click="toModify(itmes.id)">编辑</el-button>
                                <el-button type="text" class="button" style="color: red" @click="deleteworks(itmes)">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>

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
    name: "Pvideo",
    data(){
        return{
            datalist:[]
        }
    },
    created() {
        this.getData()
    },
    methods:{
        toModify(id){
            // this.$router.push('/personalcenter/modifyVideo')
            this.$router.push({path:'/personalcenter/modifyVideo',query:{workId:id}})
        },
        getData(){
            this.$http.get('http://localhost:8083/works/findAllByUserId?userId=' + id + "&categoryId=3")
                .then(res=>{
                    this.datalist = res.data
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
        toDetail(id){
            console.log(id)
            this.$router.push({path:"/userHome2/videoDetail", query: {videoId: id}});
            // this.$router.push('/userHome2/imageDetail')
        },
        deleteworks(video){
            console.log(video);
            this.$http.post('http://localhost:8083/works/delete',video)
                .then(res=>{
                    this.$message.success("删除成功！")
                    window.location.reload()
                })
                .catch(res=>{
                    this.$message.error("删除失败！")
                })
        }
    }
}
</script>

<style scoped>

.card{
    height: 300px;
    width: 300px;
    margin-left: 30px;
}
.el-card{
    width: 100%;
    height: 100%;
}

video{
    width: 100%;
    height: 180px;
    /*width: 250px;
    height: 250px;*/
}
.overflow-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pointed{
    cursor: pointer;
}
.pointed:hover{
    color: deepskyblue;
}
</style>