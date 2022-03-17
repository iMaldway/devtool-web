 <template>
  <el-row class="app_container">
    <el-row>
      <el-form :inline="true" :model="searchForm" ref="searchFormRef">
        <el-form-item prop="name">
          <el-input v-model="searchForm.name" placeholder="名称">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">
            <el-icon>
              <search />
            </el-icon>
            <span class="btn_text">查询</span>
          </el-button>
          <el-button @click="resetForm">
            <el-icon>
              <refresh />
            </el-icon>
            <span class="btn_text">重置</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button type="success" @click="handleAdd">
        <el-icon>
          <plus />
        </el-icon>
        <span class="btn_text">添加</span>
      </el-button>
      <el-button type="danger" @click="handleDelete">
        <el-icon>
          <delete />
        </el-icon>
        <span class="btn_text">删除</span>
      </el-button>
    </el-row>
    <el-row class="app_table">
      <el-table stripe :data="tableData" v-loading="listLoading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <!-- 模版名称 -->
        <el-table-column prop="name" align="center" label="模版名称">
        </el-table-column>

        <!-- 模版描述 -->
        <el-table-column prop="describe" align="center" label="模版描述">
        </el-table-column>

        <!-- 状态|-1=无效,0=未启用,1=启用 -->
        <el-table-column prop="status" align="center" label="状态">
          <template v-slot:default="{row}">
            <span v-if="row.status === -1">无效</span>
            <span v-else-if="row.status === 0">未启用</span>
            <span v-else-if="row.status === 1">启用</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" width="320" align="center" label="操作">
          <template v-slot:default="scope">
            <el-button type="success"
              @click="goRouteQuery('file',{'id':scope.row.id})">
              <el-icon>
                <plus />
              </el-icon>
              <span class="btn_text">模板文件</span>
            </el-button>
            <el-button type="primary" @click="handleEdit(scope)">
              <el-icon>
                <edit />
              </el-icon>
              <span class="btn_text">编辑</span>
            </el-button>
            <el-button type="danger" @click="handleDelete(scope)">
              <el-icon>
                <delete />
              </el-icon>
              <span class="btn_text">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="justify-content: flex-end">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper"
        :total="total" :page-sizes="pageSizes" :default-page-size="5"
        :page-size="searchForm.pageSize" @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-row>

    <!-- 提交/编辑 -->
    <el-dialog v-if="dialog.visible" :close-on-click-modal="false"
      v-model="dialog.visible" :title="dialog.type==='edit'?'修改信息':'添加信息'">
      <el-form :model="dataForm" :rules="dataFormRules" ref="dataFormRef"
        label-width="120px" label-position="left">

        <!-- 模版名称 -->
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="模版名称"></el-input>
        </el-form-item>

        <!-- 模版描述 -->
        <el-form-item label="模版描述" prop="describe">
          <el-input v-model="dataForm.describe" placeholder="模版描述"></el-input>
        </el-form-item>

        <!-- 状态|-1=无效,0=未启用,1=启用 -->
        <el-form-item label="状态" prop="status">
          <el-select v-model="dataForm.status" placeholder=" 状态">
            <el-option label="无效" :value="-1" />
            <el-option label="未启用" :value="0" />
            <el-option label="启用" :value="1" />
          </el-select>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialog.visible=false">
          <el-icon>
            <close />
          </el-icon>
          <span class="btn_text">取消</span>
        </el-button>
        <el-button type="primary" :loading="confirmVisible" @click="confirm">
          <el-icon>
            <check />
          </el-icon>
          <span class="btn_text">提交</span>
        </el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TemplateController from '../../../controller/TemplateController'

export default defineComponent({
  name: 'Template',
  setup() {
    const controller = new TemplateController()
    return {
      ...controller
    }
  }
})
</script>
<style lang="scss" scoped></style> 