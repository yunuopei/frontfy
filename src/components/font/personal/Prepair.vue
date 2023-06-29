<template>
  <div class="app">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldpassword">
              <el-input type="password" v-model="ruleForm.oldpassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
              <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpassword">
              <el-input v-model.number="ruleForm.checkpassword"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>

let id;
let oldpwd;
if(JSON.parse(localStorage.getItem("user")) === null)
    id = -1;
else
{
    id = JSON.parse(localStorage.getItem("user")).id;
    oldpwd = JSON.parse(localStorage.getItem('user')).password;
}

console.log('id = ',id,oldpwd)

export default {
    name: "Prepair",
    data(){
        const checkOldPassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('旧密码不能为空'));
            }else if (value != oldpwd)
                callback(new Error('旧密码正确'))
            else
                callback();
        };
        const validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'));
            }
            else
                callback();
        };
        const validatecheckpwd = (rule, value, callback) => {
            console.log(this.ruleForm.newpassword);
            if (!value) {
                callback(new Error('请确认密码'));
            } else if (value != this.ruleForm.newpassword) {
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        return{
            ruleForm:{
                oldpassword:'',
                newpassword:'',
                checkpassword:''
            },
            rules: {
                oldpassword: [
                    { validator: checkOldPassword, trigger: 'blur' }
                ],
                newpassword: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                checkpassword: [
                    { validator: validatecheckpwd, trigger: 'blur' }
                ]
            },
            user:{
                password:'',
                id:id
            }
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.user.password = this.ruleForm.newpassword
                    console.log("提交");
                    this.$http.post('http://localhost:8083/user/updatePassword',this.user)
                        .then(res=>{
                            this.$message.success('修改成功！')
                            console.log(res.data);
                        })
                        .catch(res=>{
                            this.$message.error('修改失败！')
                        })
                } else {
                    console.log('保存失败!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>