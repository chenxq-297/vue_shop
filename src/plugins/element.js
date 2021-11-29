import { ElButton, ElForm, ElFormItem, ElInput,} from 'element-plus'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import { ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem } from 'element-plus'
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElRow, ElCol, ElTable, ElTableColumn, ElSwitch, ElPagination, ElDialog } from 'element-plus'

import { ElMessage, ElMessageBox } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElContainer).use(ElHeader).use(ElAside).use(ElMain)
  app.use(ElMenu).use(ElSubmenu).use(ElMenuItemGroup).use(ElMenuItem)
  app.use(ElBreadcrumb).use(ElBreadcrumbItem).use(ElCard).use(ElRow).use(ElCol).use(ElTable).use(ElTableColumn).use(ElSwitch).use(ElPagination).use(ElDialog)
  app.config.globalProperties.$message=ElMessage
  app.config.globalProperties.$ElMessageBox=ElMessageBox
}

