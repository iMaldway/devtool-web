 <template>
  <el-row class="app_container">
    <el-row>
      <el-form :inline="true" :model="searchForm" ref="searchFormRef">
        <el-form-item prop="type">
          <el-input v-model="searchForm.type" placeholder="名称">
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

        <!-- 类型 -->
        <el-table-column prop="type" align="center" label="名称">
        </el-table-column>

        <!-- 网址 -->
        <el-table-column prop="url" align="center" label="网址">
        </el-table-column>

        <!-- 主体内容 -->
        <!-- <el-table-column prop="body" align="center" label="主体内容">
        </el-table-column> -->

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
    <el-dialog v-if="dialog.visible" fullscreen :close-on-click-modal="false"
      v-model="dialog.visible" :title="dialog.type==='edit'?'修改信息':'添加信息'">
      <el-form :model="dataForm" :rules="dataFormRules" ref="dataFormRef"
        label-width="120px" label-position="left">

        <!-- 类型 -->
        <el-form-item label="名称" prop="type">
          <el-input v-model="dataForm.type" placeholder="类型"></el-input>
        </el-form-item>

        <!-- 网址 -->
        <el-form-item label="网址" prop="url">
          <el-input v-model="dataForm.url" placeholder="网址"></el-input>
        </el-form-item>

        <el-form-item label="示例">
          <el-tree :data="examplesData" :props="examplesProps"></el-tree>
        </el-form-item>

        <!-- 主体内容 -->
        <el-form-item label="主体内容" prop="body">
          <Codemirror v-model:value="dataForm.body" style="text-align: left;"
            :options="cmOptions" border placeholder="主体内容" :height="400" />
        </el-form-item>

        <el-form-item label="测试">
          <el-button type="primary" :loading="testVisible" @click="onTest">点击测试
          </el-button>
        </el-form-item>

        <!-- 测试内容 -->
        <el-form-item label="测试内容">
          <Codemirror v-model:value="test" style="text-align: left;"
            :options="cmOptions" border placeholder="主体内容" :height="400" />
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
import AnalysisController from '../../../controller/AnalysisController'

import Codemirror from 'codemirror-editor-vue3'

// language
import 'codemirror/mode/javascript/javascript.js'

import examples from './examples'

export default defineComponent({
  name: 'Analysis',
  components: {
    Codemirror
  },
  setup() {
    const controller = new AnalysisController()
    const cmOptions = {
      mode: 'text/javascript', // 语言模式
      theme: 'default', // 主题
      lineNumbers: true, // 显示行号
      smartIndent: true, // 智能缩进
      indentUnit: 2, // 智能缩进单位为4个空格长度
      foldGutter: true, // 启用行槽中的代码折叠
      styleActiveLine: true // 显示选中行的样式
    }

    const examplesData = examples
    const examplesProps = {
      children: 'children',
      label: 'label'
    }

    return {
      ...controller,
      cmOptions,
      examplesData,
      examplesProps
    }
  }
})
</script>
<style lang="scss" scoped></style> 