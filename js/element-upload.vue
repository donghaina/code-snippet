<template>
	<div class="hello">
		<el-upload
				ref="upload"
				multiple
				:http-request="handleUpload"
				:on-remove="handleRemove"
				:on-exceed="handleExceed"
				:limit="10"
				:show-file-list="true"
				:file-list="fileList">
			<el-button
					type="success"
					icon="el-icon-upload"
					size="mini">添加附件
			</el-button>
		</el-upload>
	</div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.researchForm.fileList = fileList;
        console.log(this.researchForm.fileList);
      },
      handleExceed() {
        this.$message.warning({
          message: '不能超过10个附件'
        })
      },
      handleUpload(param) {
        const self = this;
        let file = param.file;
        if (!file) return;
        let originName = file.name;
        let originSize = file.size;
        let originType = file.type;
        uAxios.get('/api/qcloud/secret').then(res => {
          let result = res.data.data;
          self.qq_cloud_config = result;
          self.cos = new COS({
            getAuthorization: function (options, callback) {
              callback({
                TmpSecretId: result.tmp_secret_id,
                TmpSecretKey: result.tmp_secret_key,
                XCosSecurityToken: result.xcos_security_token,
                ExpiredTime: result.expired_time,
              });
            }
          });
          let bucket = result.bucket;
          let region = result.region;
          let upload_dir = result.dir;
          self.cos.putObject({
            Bucket: bucket,
            Region: region,
            Key: result.dir + file.name,
            Body: file
          }, function (err, data) {
            console.log(err || data);
            if (err) {
              self.$message.error({
                message: err.error
              });
            } else {
              let file_path = 'https://' + bucket + '.cos.' + region + '.myqcloud.com/' + upload_dir + file.name;
              console.log('文件上传成功 ' + file_path);
              uAxios.post('/api/file/research/0', {
                name: originName,
                url: file_path,
                size: originSize,
                type: originType
              }).then(res => {
                if (res.data.code === 1) {
                  let result = res.data.data
                  self.fileList.push({
                    id: result.id,
                    url: result.url,
                    name: result.upload_name
                  })
                  if (self.fileList.length === 1) {
                    self.title = self.fileList[0].name.split('.')[0];
                  }
                  self.$message.success({
                    message: originName + '上传成功'
                  });
                  self.file = null;
                } else {
                  self.$message.error({
                    message: res.data.msg
                  });
                }
              })
            }
          });
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.hello {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		h1 {
			color: #42b983;
		}
	}
</style>