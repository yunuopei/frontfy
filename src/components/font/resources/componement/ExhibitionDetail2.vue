<template>

    <div class="body">
        <el-card style="margin-top: 20px" shadow="always" v-for="works in ExhibitionList">
            <div  class="content">
                <div class="item1" @click="toDetail(works.id)">
                        <img :src="works.url" alt="Image">
                </div>
                <div class="item2" style="display: flex;flex-direction: column">
                    <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">标题:{{works.title}}</span>
                    <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">容量:{{works.accommodate}}</span>
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
    name: "ExhibitionDetail2",
    data(){
        return{
            ExhibitionList:[]
        }
    },
    created() {
        this.getworksByTitle()
    },
    methods:{
        getworksByTitle(){
            this.$http.get('http://localhost:8083/exhibition/findByAll?keyword='+this.$route.query.title)
                .then(res=>{
                    this.ExhibitionList = res.data;
                    console.log(this.ExhibitionList)
                })
        },
        toDetail(id){
            this.$router.push({path:'/userHome2/exhibitionDetail',query:{eid:id}})
        },
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