<template>

    <div class="body">
        <div>
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">{{ exhibitionList.title }}</span>
        </div>
        <div style="display: flex; justify-content: center; align-items: center">
            <div>
                <span style="color: #99a9bf">创建时间：</span>
                <span style="color: #99a9bf">{{ exhibitionList.created_date }}</span>
            </div>
            <div style="margin-left: 30px">
                <span style="color: #99a9bf">发布者：</span>
                <span style="color: #99a9bf">{{ exhibitionList.username }}</span>
            </div>

        </div>
        <div style="margin-top: 30px; width: 100%">
            <!--          <img v-bind:src="exhibitionList.url"  />-->
            <img v-bind:src="exhibitionList.url" style="width: 80%; height: 80%" preload="auto" controls></img>
        </div>
        <div style="margin-top: 30px">
            <span style="font-weight: bold; font-family: KaiTi; font-size: 20px; ">简介</span>
            <p style="text-indent: 2em">{{ exhibitionList.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExhibitionDetail",
    data() {
        return {
            exhibitionList: []
        }
    },
    created() {
        this.getImages()
    },
    methods: {
        getImages() {
            this.$http.get('http://localhost:8083/exhibition/findById?eid=' + this.$route.query.eid)
                .then(res => {
                    this.exhibitionList = res.data;
                    console.log(this.exhibitionList)
                })
        },
        getImageByTitle() {
            this.$http.get('http://localhost:8083/images/findByTitle?imageTitle=' + this.$route.query.imageTitle)
                .then(res => {
                    this.exhibitionList = res.data;
                    console.log(this.exhibitionList)
                })
        }
    }
}
</script>

<style scoped>

.body {
    margin-top: 100px;
}

img {
    width: 80%;
    height: 600px;
}
</style>