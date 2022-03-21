 <template>
  <el-row class="app_container">
    <el-row>
      <el-form :inline="true" :model="searchForm" ref="searchFormRef">
        <el-form-item prop="name">
          <el-input v-model="searchForm.name" placeholder="数据库名称">
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

        <!-- 数据库名称 -->
        <el-table-column prop="name" align="center" label="数据库名称">
        </el-table-column>

        <!-- 数据库描述名称 -->
        <el-table-column prop="descName" align="center" label="数据库描述">
        </el-table-column>

        <!--  数据驱动类 -->
        <el-table-column prop="driverClassName" align="center" label=" 数据驱动类">
        </el-table-column>

        <!--  -->
        <el-table-column prop="host" align="center" label="host">
        </el-table-column>

        <!--  -->
        <el-table-column prop="port" align="center" label="port">
        </el-table-column>

        <!-- 不包括数据库和参数 -->
        <el-table-column prop="jdbcUrl" align="center" label="jdbcUrl">
        </el-table-column>

        <!-- 连接参数信息 -->
        <el-table-column prop="jdbcParams" align="center" label="连接参数信息">
        </el-table-column>

        <!-- 数据库名称 -->
        <el-table-column prop="username" align="center" label="数据库名称">
        </el-table-column>

        <!-- 数据库密码 -->
        <el-table-column prop="password" align="center" label="数据库密码">
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

        <!-- 数据库名称 -->
        <el-form-item label="数据库名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="数据库名称"></el-input>
        </el-form-item>

        <!-- 数据库名称 -->
        <el-form-item label="数据库账号" prop="username">
          <el-input v-model="dataForm.username" placeholder="数据库账号"></el-input>
        </el-form-item>

        <!-- 数据库密码 -->
        <el-form-item label="数据库密码" prop="password">
          <el-input v-model="dataForm.password" placeholder="数据库密码"></el-input>
        </el-form-item>

        <!--  数据驱动类 -->
        <el-form-item label=" 数据驱动类" prop="driverClassName">
          <el-select v-model="dataForm.driverClassName" placeholder=" 数据驱动类">
            <el-option label="Mysql" value="mysql" />
          </el-select>
        </el-form-item>

        <!--  -->
        <el-form-item label="host" prop="host">
          <el-input v-model="dataForm.host" placeholder=""></el-input>
        </el-form-item>

        <!--  -->
        <el-form-item label="port" prop="port">
          <el-input v-model="dataForm.port" placeholder=""></el-input>
        </el-form-item>

        <!-- 数据库描述名称 -->
        <el-form-item label="数据库描述" prop="descName">
          <el-input v-model="dataForm.descName" placeholder="数据库描述名称">
          </el-input>
        </el-form-item>

        <!-- 不包括数据库和参数 -->
        <el-form-item label="jdbcUrl" prop="jdbcUrl">
          <el-input v-model="dataForm.jdbcUrl" placeholder="不包括数据库和参数">
          </el-input>
        </el-form-item>

        <!-- 连接参数信息 -->
        <el-form-item label="参数信息" prop="jdbcParams">
          <el-input v-model="dataForm.jdbcParams" placeholder="连接参数信息">
          </el-input>
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
import DatabaseController from '../../../controller/DatabaseController'

export default defineComponent({
  name: 'Database',
  setup() {
    const controller = new DatabaseController()
    return {
      ...controller
    }
  }
})
</script>
<style lang="scss" scoped></style> 