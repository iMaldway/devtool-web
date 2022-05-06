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
        v-adaptive="100" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <!-- 名称 -->
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>

        <!-- 作者名称 -->
        <el-table-column prop="author" align="center" label="作者名称">
        </el-table-column>

        <!-- 版权内容 -->
        <el-table-column prop="copyright" align="center" label="版权内容">
        </el-table-column>

        <!-- 包名称 -->
        <el-table-column prop="packageName" align="center" label="包名称">
        </el-table-column>

        <!-- 模块名称 -->
        <el-table-column prop="moduleName" align="center" label="模块名称">
        </el-table-column>

        <!-- 表前缀 -->
        <el-table-column prop="tablePrefix" align="center" label="表前缀">
        </el-table-column>

        <!-- 描述信息 -->
        <el-table-column prop="describe" align="center" label="描述信息">
        </el-table-column>

        <el-table-column fixed="right" width="200" align="center" label="操作">
          <template v-slot:default="scope">
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

        <!-- 名称 -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
        </el-form-item>

        <!-- 包名称 -->
        <el-form-item label="包名称" prop="packageName">
          <el-input v-model="dataForm.packageName" placeholder="包名称"></el-input>
        </el-form-item>

        <!-- 模块名称 -->
        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="dataForm.moduleName" placeholder="模块名称"></el-input>
        </el-form-item>

        <!-- 表前缀 -->
        <el-form-item label="表前缀" prop="tablePrefix">
          <el-input v-model="dataForm.tablePrefix" placeholder="表前缀"></el-input>
        </el-form-item>

        <!-- 作者名称 -->
        <el-form-item label="作者名称" prop="author">
          <el-input v-model="dataForm.author" placeholder="作者名称"></el-input>
        </el-form-item>

        <!-- 版权内容 -->
        <el-form-item label="版权内容" prop="copyright">
          <el-input v-model="dataForm.copyright" placeholder="版权内容"></el-input>
        </el-form-item>

        <!-- 描述信息 -->
        <el-form-item label="描述信息" prop="describe">
          <el-input v-model="dataForm.describe" placeholder="描述信息"></el-input>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialog.visible=false">
          <el-icon>
            <close />
          </el-icon>
          <span class="btn_text">取消</span>
        </el-button>
        <el-button type="primary" :loading="dialog.confirmVisible"
          @click="confirm">
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
import GeneratorConfigController from '../../../controller/GeneratorConfigController'

export default defineComponent({
  name: 'GeneratorConfig',
  setup() {
    const controller = new GeneratorConfigController()
    return {
      ...controller
    }
  }
})
</script>
<style lang="scss" scoped></style> 