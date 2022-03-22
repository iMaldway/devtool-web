import BasicController from "./BasicController";
import * as Api from "../api/devtool/DevtoolGeneratorDatabaseService";
import { reactive } from "vue";

import { ElMessageBox, ElMessage } from "element-plus";

export default class DatabaseController extends BasicController {
  public dataForm: any;
  public searchForm;
  public dataFormRules;
  public searchRules;
  public Api;

  /**
   * @todo 默认数据源
   */
  public defaultDataSource = {
    name: undefined,
    descName: undefined,
    driverClassName: "mysql",
    host: undefined,
    port: undefined,
    jdbcUrl: undefined,
    jdbcParams: undefined,
    username: undefined,
    password: undefined,
  };

  constructor() {
    super();
    this.Api = Api;
    this.dataForm = reactive({
      name: undefined,
      descName: undefined,
      driverClassName: "mysql",
      host: undefined,
      port: undefined,
      jdbcUrl: undefined,
      jdbcParams: undefined,
      username: undefined,
      password: undefined,
    });
    this.dataFormRules = reactive({
      name: [
        { required: true, message: "数据库名称不能为空", trigger: "blur" },
      ],
      driverClassName: [
        { required: true, message: " 数据驱动类不能为空", trigger: "blur" },
      ],
      host: [{ required: true, message: "host不能为空", trigger: "blur" }],
      port: [{ required: true, message: "port不能为空", trigger: "blur" }],
      username: [
        { required: true, message: "数据库账号不能为空", trigger: "blur" },
      ],
      password: [
        { required: true, message: "数据库密码不能为空", trigger: "blur" },
      ],
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
          ElMessage({
            type: "success",
            message: "操作成功",
          });
        } catch (e) {
          console.error("接口异常");
        } finally {
          this.dialog.visible = false;
        }

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
    } else {
      this.resetDataForm(this.dataForm);
      this.dataForm.driverClassName = "mysql";
    }
  };
  handleEdit = async (scope: any) => {
    this.dialog.type = "edit";
    this.dialog.visible = true;
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
