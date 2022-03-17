import { ref, reactive } from "vue";
import router from "../router";
export default class BasicServices {
  public dataFormRef;
  public searchFormRef;
  public listLoading;
  public total;
  public dialog;
  public tableData;
  public pageSizes;
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

  goRouteParams = (path: string, params = {}) => {
    router.push({ path, params });
  };

  goRouteQuery = (path: string, params = {}) => {
    router.push({ path, query: params });
  };
}
