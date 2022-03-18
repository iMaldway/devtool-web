import BasicController from "./BasicController";
import * as Api from "../api/devtool/DevtoolAnalysisService";
import * as GenerateAPI from "../api/devtool/GenerateAPIService";
import { reactive } from "vue";

import { ElMessageBox, ElMessage } from "element-plus";

export default class AnalysisController extends BasicController {
  public dataForm: any;
  public searchForm;
  public dataFormRules;
  public searchRules;
  public Api;
  public testVisible;
  public test;

  constructor() {
    super();
    this.Api = Api;
    this.testVisible = false;
    this.test = "";
    this.dataForm = reactive({
      type: undefined,
      url: undefined,
      body: undefined,
    });
    this.dataFormRules = reactive({
      type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
      url: [{ required: true, message: "网址不能为空", trigger: "blur" }],
      body: [{ required: true, message: "主体内容不能为空", trigger: "blur" }],
    });
    this.searchForm = reactive({
      pageNumber: 1,
      pageSize: 10,
      name: undefined,
    });
    this.searchRules = reactive({});
    this.getList();
  }

  getList = async () => {
    this.listLoading.value = true;
    try {
      const res = await this.Api.getList(this.searchForm);
      this.tableData.value = res.list;
      this.total.value = res.total;
    } catch (error) {
      console.error(error);
    } finally {
      this.listLoading.value = false;
    }
  };
  resetForm = () => {
    if (!this.searchFormRef) return;
    this.searchFormRef.value.resetFields();
    this.searchForm.pageNumber = 1;
    this.searchForm.pageSize = 10;
    this.searchForm.name = undefined;
    this.getList();
  };
  onTest = () => {
    if (this.dataFormRef && this.dataFormRef.value) {
      this.dataFormRef.value.validate(async (valid: boolean) => {
        if (!valid) {
          ElMessage({
            type: "warning",
            message: "请将必须的数据填写完整!",
          });
          return;
        }
        try {
          this.testVisible = true;
          let res = await GenerateAPI.test({
            url: this.dataForm.url,
            body: this.dataForm.body,
          });
          this.test = JSON.stringify(res, null, 2);
        } catch (error) {
          console.error(error);
        } finally {
          this.testVisible = false;
        }
      });
    }
  };
  confirm = () => {
    if (this.dataFormRef && this.dataFormRef.value) {
      this.dataFormRef.value.validate(async (valid: boolean) => {
        this.dialog.confirmVisible = true;
        if (!valid) {
          ElMessage({
            type: "warning",
            message: "请将必须的数据填写完整!",
          });
          return;
        }
        const isEdit = this.dialog.type === "edit";
        let data = null;
        try {
          if (isEdit) {
            data = await this.Api.update(this.dataForm);
          } else {
            delete this.dataForm.id;
            data = await this.Api.add(this.dataForm);
          }
        } catch (e) {
          console.error("接口异常");
        } finally {
          this.dialog.visible = false;
        }
        ElMessage({
          type: data ? "success" : "warning",
          message: data ? "操作成功" : "服务器开小差了，请稍后再试",
        });

        this.getList();
        this.dialog.confirmVisible = false;
      });
    }
  };
  handleAdd = () => {
    this.dialog.type = "new";
    this.dialog.visible = true;
    if (this.dataFormRef && this.dataFormRef.value) {
      this.dataFormRef.value.resetFields();
    }
  };
  handleEdit = async (scope: any) => {
    this.dialog.type = "edit";
    this.dialog.visible = true;
    if (this.dataFormRef && this.dataFormRef.value) {
      this.dataFormRef.value.resetFields();
    }
    let id = scope.row.id;
    const res: any = await this.Api.getInfo(id);
    Object.assign(this.dataForm, res);
  };
  handleDelete = (scope?: any) => {
    if (!scope.row && this.multipleSelection.length <= 0) {
      ElMessage({
        type: "warning",
        message: "请选择要删除的数据!",
      });
      return;
    }
    let row = scope ? scope.row : null;
    ElMessageBox.confirm("确定删除选中的数据吗?", "删除", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        try {
          await this.Api.remove(row ? row.id : this.multipleSelection);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        } catch (error) {
          ElMessage({
            type: "warning",
            message: "删除失败",
          });
          console.error(error);
        }
        this.getList();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除",
        });
      });
  };
  handleSizeChange = (val: number) => {
    this.searchForm.pageSize = val;
    this.getList();
  };
  handleCurrentChange = (val: number) => {
    this.searchForm.pageNumber = val;
    this.getList();
  };
}
