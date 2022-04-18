<template>
  <el-container class="app_container">
    <el-aside v-show="isRadio === 0">
      <el-select v-model="hostName" placeholder="选择IP地址" @change="getDataBase">
        <el-option v-for="item in hostNameList" :key="item.host"
          :label="item.host" :value="item.host">
        </el-option>
      </el-select>
      <el-collapse v-if="selectDataBaseList && selectDataBaseList.length > 0"
        v-model="activeCollapseNames" accordion @change="getTableRow">
        <el-collapse-item v-for="(base,index) in selectDataBaseList"
          :name="base.id" :key="base.id">
          <template #title>
            &nbsp;
            <el-icon>
              <coin />
            </el-icon>
            &nbsp;
            {{ base.descName }}
          </template>
          <el-tree :data="selectDataBaseTableList" @node-click="selectTable"
            :props="{children: 'children',label: 'tableName'}"></el-tree>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-container>
      <el-header>
        <el-form :inline="true" :model="pageForm" :rules="formRules"
          ref="pageFormRef">
          <el-form-item>
            <el-radio-group v-model="isRadio">
              <el-radio-button :label="0">依据表生成</el-radio-button>
              <el-radio-button :label="1">依据网址解析生成</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="请选择模版" v-model="pageForm.templateName">
              <el-option v-for="item in selectTemplateList" :key="item.value"
                :label="
                item.name +
                (item.value == '' || item.value == undefined
                  ? ''
                  : '-' + item.value)
              " :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="isRadio === 0">
            <el-select placeholder="请选择生成配置"
              v-model="pageForm.generatorConfigName">
              <el-option v-for="item in selectConfigList" :key="item.value"
                :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="isRadio === 1">
            <el-select placeholder="请选择解析配置" v-model="pageForm.analysisId">
              <el-option v-for="(item, i) in selectAnalysisList" :key="i"
                :label="
                item.type +
                (item.url == '' || item.url == undefined ? '' : '-' + item.url)
              " :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="confirmVisible"
              @click="generate">生成代码</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-row>
          表名：{{ tableItme.tableName }}
        </el-row>
        <el-table v-if="tableData && tableData.length >0" stripe
          v-adaptive="100" :data="tableData" v-loading="listLoading"
          style="margin-top: 30px">
          <el-table-column prop="columnName" align="center" width="160"
            label="字段名称">
          </el-table-column>
          <el-table-column prop="dataType" align="center" label="数据类型">
          </el-table-column>

          <el-table-column prop="columnKey" align="center" label="是否主键">
          </el-table-column>

          <el-table-column prop="columnDefault" align="center" label="默认值">
          </el-table-column>

          <el-table-column prop="isNullable" align="center" label="是否可为空">
          </el-table-column>
          <el-table-column prop="columnComment" align="center" width="300"
            label="字段描述">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="生成预览"
      fullscreen>
      <el-row>
        <el-button type="primary" size="mini" @click="copyName">
          复制名称
        </el-button>
        <el-button type="danger" size="mini" @click="copy">
          复制代码
        </el-button>
      </el-row>
      <el-tabs style="margin-top: 20px;text-align:left;"
        v-model="typeActiveName" type="border-card" @tab-click="typeActiv">
        <el-tab-pane v-for="(t, i) in codeList" :key="t.name" :label="t.name"
          :name="i + ''">
          <el-tabs v-model="typeActiveName" v-highlight>
            <input type="hidden" :id="'span-' + i" :value="t.name" />
            <pre v-if="typeActiveName == i + ''">
                <code :id="'code-'+i"> {{ t.value }} </code>
              </pre>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CodeGenerationController from '@/controller/CodeGenerationController'

export default defineComponent({
  name: 'CodeGeneration',
  setup() {
    const controller = new CodeGenerationController()

    return {
      ...controller
    }
  }
})
</script>

<style lang="scss" scoped>
.app_container {
  width: 100%;
  height: auto;

  .el-aside {
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 10px;
  }
  .el-header {
    height: auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
  }
  .el-container {
    height: 100%;
  }
}
</style>