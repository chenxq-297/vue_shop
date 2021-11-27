import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { ElMessage } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.config.globalProperties.$message=ElMessage
}

