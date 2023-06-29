<template>
    <div class="app">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input  v-model="ruleForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input  v-model="ruleForm.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作品上传" prop="url">
                <el-upload
                    :multiple="false"
                    :limit="1"
                    :auto-upload="false"
                    action="http://localhost:8083/works/updateWorksById"
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="fileChange"
                    ref="upload"
                    :data="ruleForm"
                    name="file">
                    <div >
                        <el-button slot="trigger" size="small" type="primary">作品文件
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                              <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                              <i class="el-icon-delete"></i>
                            </span>
                        </el-button>
                        <div v-if="ruleForm.url">
                            <audio controls width="100%" :src="ruleForm.url" alt=""></audio>
                        </div>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible"  @visible-change="handleDialogVisibleChange">
                    <audio controls width="100%" :src="dialogImageUrl" alt=""></audio>
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "ModifyAudio",
    data(){
        return {
            ruleForm: {
                title: '',
                description: '',
                url: '',
                id:'',
                'file': ''
            },
            disabled: false,
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [{url: '', name: ''}],
            rules: {
                title: [
                    { required:true, message: '请输入标题', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入描述', trigger: 'blur' }
                ]
            },
        };
    },
    created() {
        this.getData();

    },
    methods:{
        submitForm(formName) {
            let self = this

            this.$refs[formName].validate((valid) => {
                if (valid) {

                    self.$refs.upload.submit();
                    self.dialogVisible = false;
                    this.ruleForm.url = this.fileList[0].raw;
                    window.location.reload()
                    console.log(this.ruleForm);
                    //window.location.reload()
                    // 更新成功后,跳转到电影列表页面
                    this.$message.success("保存成功")

                } else {
                    console.log('保存失败!!');
                    return false;
                }
            });
        },
        handleDialogVisibleChange(visible){
            if (visible) {
                this.dialogImageUrl = this.ruleForm.url;
                console.log(this.dialogImageUrl);
            }

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleRemove: function (file, fileList) {
            this.ruleForm.url = '';
            this.fileList = fileList;
        },
        fileChange: function (file, fileList) {
            this.fileList = fileList;
        },
        handlePictureCardPreview: function (file) {
            console.log("file",file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        getData(){
            this.$http.get('http://localhost:8083/works/findAllById?wid=' + this.$route.query.workId)
                .then(res=>{
                    console.log(res.data);
                    this.ruleForm.title = res.data.title
                    this.ruleForm.url = res.data.url
                    this.ruleForm.description = res.data.description
                    this.ruleForm.id = res.data.id
                    this.dialogImageUrl = res.data.url
                    console.log(this.dialogImageUrl);
                })
        },
    }
}
</script>

<style scoped>

</style>