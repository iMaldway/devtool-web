import { ref, reactive, Ref } from "vue";
import router from "../router";
/**
 * @class 基础服务对象
 */
export default class BasicServices {
  /**
   * @todo 提交表单ref
   */
  public dataFormRef: Ref;
  /**
   * @todo 搜索表单ref
   */
  public searchFormRef: Ref;
  /**
   * @todo 表格加载动画控制
   */
  public listLoading: Ref<boolean>;
  /**
   * @todo 查询总数
   */
  public total: Ref<number>;
  /**
   * @todo 弹窗相关对象
   */
  public dialog: any;
  /**
   * @todo 表格数据数据
   */
  public tableData: Ref<Object[]>;
  /**
   * @todo 分页页码数据
   */
  public pageSizes: number[];
  /**
   * @todo 多选保存数组
   */
  public multipleSelection: any[];

  constructor() {
    this.dialog = reactive({
      visible: false,
      type: "new",
      confirmVisible: false,
    });
    this.dataFormRef = ref();
    this.searchFormRef = ref();
    this.tableData = ref([]);
    this.pageSizes = reactive([10, 15, 20, 25]);
    this.multipleSelection = reactive([]);
    this.listLoading = ref(false);
    this.total = ref(100);
  }

  /**
   * @todo 选中表格回调函数
   * @param {any[]} val 选择数组
   */
  handleSelectionChange = (val?: any[]) => {
    if (val) {
      let arr: any[] = [];
      for (let i = 0; i < val.length; i++) {
        let itme = val[i];
        arr.push(itme.id);
      }
      this.multipleSelection = [...arr];
      val = [];
    }
  };

  /**
   * @todo 以params方式跳转到指定path路由页面
   * @param {string} path
   * @param {object} params
   */
  goRouteParams = (path: string, params = {}) => {
    router.push({ path, params });
  };

  /**
   * @todo 以query方式跳转到指定path路由页面
   * @param {string} path
   * @param {object} params
   */
  goRouteQuery = (path: string, params = {}) => {
    router.push({ path, query: params });
  };

  /**
   * @todo 重置对象
   */
  resetDataForm = (formData: any) => {
    const keys = Object.keys(formData);
    for (let i in keys) {
      let key = keys[i];
      if (typeof formData[key] !== "object") {
        formData[key] = undefined;
      }
    }
  };
}
