<template>
    <div>
        <el-upload
                class="upload-demo"
                action="/api/upload"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :auto-upload="false"
                :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传音频文件，且不超过10MB</div>
        </el-upload>
        <el-table :data="fileList" style="margin-top: 20px;">
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column prop="preview" label="预览">
                <template slot-scope="scope">
                    <a :href="scope.row.url" download>{{ scope.row.name }}</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: [] // 存放已选择的文件列表
        };
    },
    methods: {
        handleSuccess(response, file) {
            // 上传成功的回调函数
            console.log(response);
        },
        beforeUpload(file) {
            // 上传之前的校验函数
            const isAudio = file.type.includes('audio');
            const isLt10M = file.size / 1024 / 1024 < 10;

            if (!isAudio) {
                this.$message.error('只能上传音频文件!');
            }
            if (!isLt10M) {
                this.$message.error('上传音频文件大小不能超过 10MB!');
            }

            return isAudio && isLt10M;
        },
        submitUpload() {
            // 手动触发上传
            this.$refs.upload.submit();
        }
    }
};
</script>
