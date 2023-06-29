<template>
  <div class="app">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="昵称" prop="username">
              <el-input  v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phonenumber">
              <el-input  v-model="ruleForm.phonenumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input  v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
              <el-date-picker style="width: 100%"
                  v-model="ruleForm.birthday"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="头像" prop="pic">
              <el-upload
                  :multiple="false"
                  :limit="1"
                  list-type="picture-card"
                  :auto-upload="false"
                  action="http://localhost:8083/user/updatePerson"
                  :file-list="fileList"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="fileChange"
                  ref="upload"
                  :data="ruleForm"
              >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                      <img v-if="ruleForm.pic !== ''" class="el-upload-list__item-thumbnail"
                           :src="ruleForm.pic" alt="">

                      <img v-else class="el-upload-list__item-thumbnail"
                           :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                  <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>

                  <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                  </span>
              </span>
                  </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
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
    name: "Pmessage",
    data(){
        const checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
        };
        const validateEmail = (rule, value, callback) => {
            let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (!emailReg.test(value)) {
                callback(new Error('邮箱格式错误'));
            } else {
                callback();
            }
        };
        const validatePhone = (rule, value, callback) => {
            let phoneReg = /^1[34578]\d{9}$/;
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else if (!phoneReg.test(value)) {
                callback(new Error('手机号码格式错误'));
            } else {
                callback();
            }
        };
        return {
            ruleForm:{
                username:"",
                sex:"",
                email:'',
                birthday:'',
                phonenumber:'',
                pic:'',
                id:''
            },
            disabled: false,
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [{url: '', name: ''}],
            rules: {
                username: [
                    { required:true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                phonenumber: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' }
                ],
                birthday: [
                    { required: true, message: '请选择日期', trigger: 'blur' }
                ]
            },
        };
    },
    created() {
        this.getUser();

    },
    methods:{
        submitForm(formName) {
            let self = this

            this.$refs[formName].validate((valid) => {
                if (valid) {

                    self.$refs.upload.submit();
                    self.dialogVisible = false;
                    this.ruleForm.pic = this.fileList[0].raw;
                    window.location.reload()
                    // 更新成功后,跳转到电影列表页面
                    this.$message.success("保存成功")

                } else {
                    console.log('保存失败!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleRemove: function (file, fileList) {
            this.ruleForm.pic = '';
            this.fileList = fileList;
        },
        fileChange: function (file, fileList) {
            this.fileList = fileList;
        },
        handlePictureCardPreview: function (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
      getUser(){
          this.$http.get("http://localhost:8083/user/editUser?userId=" + JSON.parse(localStorage.getItem("user")).id)
              .then(res=>{
                  this.ruleForm.username = res.data.username
                  this.ruleForm.birthday = new Date(res.data.birthday)
                  this.ruleForm.sex = res.data.sex
                  this.ruleForm.email = res.data.email
                  this.ruleForm.id = res.data.id
                  this.ruleForm.phonenumber = res.data.phonenumber
                  if (!res.data.pic)
                  {
                      this.ruleForm.pic = require("@/assets/23.png")
                  }
                  else
                      this.ruleForm.pic = res.data.pic
                  console.log('头像',this.user.pic);
              })
          console.log("前",this.ruleForm);
      }
    }
}
</script>

<style scoped>

</style>