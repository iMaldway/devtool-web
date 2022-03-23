import { reactive, ref } from "vue";
import * as DevtoolGeneratorDatabase from "../api/devtool/DevtoolGeneratorDatabaseService";
import * as DevtoolTemplate from "../api/devtool/DevtoolTemplateService";
import * as DevtoolGeneratorConfigService from "../api/devtool/DevtoolGeneratorConfigService";

import * as DevtoolAnalysisService from "../api/devtool/DevtoolAnalysisService";

import * as DevtoolGenerator from "../api/devtool/DevtoolGeneratorService";

import CopyUtils from "../utils/CopyUtils";

import { ElMessage } from "element-plus";

export default class DatabaseController {
  /**
   * @todo 当前激活的host
   */
  public hostName;
  /**
   * @todo host集合
   */
  public hostNameList;
  /**
   * @todo 选中host下数据库集合
   */
  public selectDataBaseList;
  /**
   * @todo 加载选择表格字段动画
   */
  public listLoading;
  /**
   * @todo 选中表格的字段信息
   */
  public tableData;
  /**
   * @todo 当前激活的数据库
   */
  public activeCollapseNames;
  /**
   * @todo 当前选择数据库下的表集合
   */
  public selectDataBaseTableList;
  /**
   * @todo 模板集合
   */
  public selectTemplateList;
  /**
   * @todo 生成配置集合
   */
  public selectConfigList;
  /**
   * @todo 解析配置集合
   */
  public selectAnalysisList;
  /**
   * @todo 生成代码集合
   */
  public codeList;
  /**
   * @todo 当前选中数据库信息
   */
  public tableInfo;
  /**
   * @todo 当前选中表信息
   */
  public tableItme;
  /**
   * @todo 生成类型：0依据表单生成
   */
  public isRadio;
  /**
   * @todo 生成代码按钮加载动画控制
   */
  public confirmVisible;
  /**
   * @todo 生成配置选择表单
   */
  public pageForm;
  /**
   * @todo 生成配置选择表单Ref
   */
  public pageFormRef;
  /**
   * @todo 生成配置选择表单校验
   */
  public formRules;
  /**
   * @todo 打开代码生成预览界面
   */
  public dialogVisible;
  /**
   * @todo 激活标签
   */
  public typeActiveName;
  /**
   * @todo 复制代码工具
   */
  private CopyUtils = new CopyUtils();

  constructor() {
    this.pageFormRef = ref();
    this.hostName = ref("");
    this.typeActiveName = ref("0");
    this.activeCollapseNames = ref("-1");
    this.listLoading = ref(false);
    this.confirmVisible = ref(false);
    this.dialogVisible = ref(false);
    this.tableData = ref([]);
    this.isRadio = ref(0);
    this.hostNameList = ref([]);
    this.selectDataBaseList = ref<any>([]);
    this.selectDataBaseTableList = ref([]);
    this.selectTemplateList = ref<any>([]);
    this.selectConfigList = ref<any>([]);
    this.selectAnalysisList = ref([]);
    this.codeList = ref<any>([]);
    this.tableInfo = ref({
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
      tableName: "",
    });
    this.formRules = reactive({
      templateName: [
        {
          required: true,
          message: "模板不能为空",
          trigger: "blur",
        },
      ],
      generatorConfigName: [
        {
          required: true,
          message: "生成配制不能为空",
          trigger: "blur",
        },
      ],
    });
    this.pageForm = ref({
      templateName: undefined,
      generatorConfigName: undefined,
      analysisId: undefined,
    });

    this.tableItme = ref({});

    this.getHostNameList();
    this.getSelectData();
    this.getSelectConfigData();
    this.getAnalysis();
  }

  /** *
   * @todo 获取Host下的数据库信息
   * @returns {void}
   */
  getDataBase = async () => {
    let res = await DevtoolGeneratorDatabase.getList({
      pageNumber: 1,
      pageSize: 999,
      host: this.hostName.value,
    });
    this.selectDataBaseList.value = res.list;
    this.activeCollapseNames.value = res.list[0]?.id;
    this.getTableRow(this.activeCollapseNames.value);
  };

  /** *
   * @todo 获取Host列表
   * @returns {void}
   */
  getHostNameList = async () => {
    let res = await DevtoolGeneratorDatabase.getHostList();
    this.hostNameList.value = res.list;
    this.hostName.value = res.list[0].host;
    this.getDataBase();
  };

  /** *
   * @todo 获取选中数据库的表信息
   * @param {string} key 表信息的ID
   * @returns {void}
   */
  getTableRow = async (key: any) => {
    if (key || key === 0) {
      const activeItems = this.selectDataBaseList.value.filter(
        (item: any) => item.id && item.id === key
      );
      const itme: any = activeItems[0];
      if (this.tableInfo.value.database != itme.name) {
        this.tableInfo.value = {
          host: itme.host,
          port: itme.port,
          username: itme.username,
          password: itme.password,
          database: itme.name,
          tableName: "",
        };
        const res = await DevtoolGeneratorDatabase.getTables(
          this.tableInfo.value
        );
        this.selectDataBaseTableList.value = res.list;

        this.selectTable(res.list[0]);
      }
    }
  };

  /** *
   * @todo 获取选中表格的字段信息
   * @returns {void}
   */
  getList = async () => {
    this.listLoading.value = true;
    const res = await DevtoolGeneratorDatabase.getTableInfo(
      this.tableInfo.value
    );
    this.tableData.value = res.list;
    this.listLoading.value = false;
  };

  /** *
   * @todo 选择表，将加载表格字段信息
   * @returns {void}
   */
  selectTable = (item: any) => {
    this.tableInfo.value.tableName = item.tableName;
    this.tableItme.value = item;
    this.getList();
  };

  /** *
   * @todo 获取模板
   * @returns {void}
   */
  getSelectData = async () => {
    const res = await DevtoolTemplate.getList({
      status: 1,
      pageNumber: 1,
      pageSize: 9999,
    });
    if (res && res.list.length > 0) {
      let list: any = [];
      for (let i in res.list) {
        let item = res.list[i];
        list.push({
          name: item.name,
          value: item.describe,
        });
      }
      this.selectTemplateList.value = list;
      this.pageForm.value.templateName = this.selectTemplateList.value[0]
        ? this.selectTemplateList.value[0].name
        : undefined;
    }
  };

  /** *
   * @todo 获取配置
   * @returns {void}
   */
  getSelectConfigData = async () => {
    const res = await DevtoolGeneratorConfigService.getList({
      pageNumber: 1,
      pageSize: 9999,
    });
    if (res && res.list.length > 0) {
      let list: any = [];
      for (let i in res.list) {
        let item = res.list[i];
        list.push({
          name: item.name,
          value: item.tablePrefix,
        });
      }
      this.selectConfigList.value = list;
      this.pageForm.value.generatorConfigName = this.selectConfigList.value[0]
        ? this.selectConfigList.value[0].name
        : undefined;
    }
  };

  /** *
   * @todo 获取解析信息
   * @returns {void}
   */
  getAnalysis = async () => {
    let res = await DevtoolAnalysisService.getList({
      pageNumber: 1,
      pageSize: 999,
    });
    this.selectAnalysisList.value = res.list;
  };

  /** *
   * @todo 根据解析模式选择生成代码方案
   * @returns {void}
   */
  generate = () => {
    if (this.isRadio.value === 0) {
      this.generateCode();
    } else {
      this.buildByAnalysis();
    }
  };

  /** *
   * @todo 切换标签页
   * @returns {void}
   */
  typeActiv = (itme: any) => {
    this.typeActiveName.value = itme.index;
  };

  /** *
   * @todo 复制名称
   * @returns {void}
   */
  copyName = () => {
    this.CopyUtils.copyInputByTypeIsHidden("span-" + this.typeActiveName.value);
  };

  /** *
   * @todo 复制代码
   * @returns {void}
   */
  copy = () => {
    this.CopyUtils.copy("code-" + this.typeActiveName.value);
  };

  /** *
   * @todo 生成代码
   * @returns {void}
   */
  generateCode = async () => {
    if (
      this.tableInfo.value.database == undefined ||
      this.tableInfo.value.tableName == undefined
    ) {
      ElMessage({
        type: "warning",
        message: "请选择好数据库以及表",
      });
      return;
    }
    if (this.pageFormRef && this.pageFormRef.value) {
      this.pageFormRef.value.validate(async (valid: boolean) => {
        if (!valid) {
          ElMessage({
            type: "warning",
            message: "请填写完整!",
          });
          return;
        }
        this.confirmVisible.value = true;
        //重置状态
        this.typeActiveName.value = "0";
        //构建data
        const data = {
          generatorConfigName: this.pageForm.value.generatorConfigName,
          tableName: this.tableInfo.value.tableName,
          templateName: this.pageForm.value.templateName,
          host: this.tableInfo.value.host,
          port: this.tableInfo.value.port,
          username: this.tableInfo.value.username,
          password: this.tableInfo.value.password,
          database: this.tableInfo.value.database,
        };
        try {
          this.codeList.value = [];
          let res = await DevtoolGenerator.build(data);
          for (let key in res) {
            let itme = res[key];
            this.codeList.value.push({
              name: key,
              value: itme,
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          this.dialogVisible.value = true;
          this.confirmVisible.value = false;
        }
      });
    }
  };

  /** *
   * @todo 解析网址生成代码
   * @returns {void}
   */
  buildByAnalysis = async () => {
    if (
      this.pageForm.value.templateName == undefined ||
      this.pageForm.value.analysisId == undefined
    ) {
      ElMessage({
        type: "warning",
        message: "请选择好模板以及解析配置",
      });
      return;
    }
    this.confirmVisible.value = true;
    //重置状态
    this.typeActiveName.value = "0";
    const data = {
      templateName: this.pageForm.value.templateName,
      analysisId: this.pageForm.value.analysisId,
    };
    try {
      this.codeList = [];
      let res = await DevtoolGenerator.buildByAnalysis(data);
      for (let key in res) {
        let itme = res[key];
        this.codeList.push({
          name: key,
          value: itme,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.dialogVisible.value = true;
      this.confirmVisible.value = false;
    }
  };
}
