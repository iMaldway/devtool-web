import { VNode, Directive } from "vue";

/**
 * @todo 表格自适应高度
 */
const directive: Directive = {
  created() {
    /**
     * 在绑定元素的 attribute 或事件监听器被应用之前调用。
     *  在指令需要附加须要在普通的 v-on 事件监听器前调用的事件监听器时，这很有用
     */
  },
  beforeMount() {
    /**
     * 当指令第一次绑定到元素并且在挂载父组件之前调用
     */
  },
  mounted(el, binding) {
    /**
     * 在绑定元素的父组件被挂载后调用
     */
    // 强关联.el-main
    const elMain = document.getElementsByClassName("el-main");
    const fatherHeigth = elMain[0].clientHeight;
    const brotherHeight = el.parentElement?.offsetTop || 0;
    const spacingheight = binding.value;
    /**
     * 当前表格高度
     * 父级高度-兄级元素高度-间距高度 = 当前元素高度
     * 间距高度：除去兄级元素高度外，距离底部的高度
     */
    el.style.height = fatherHeigth - brotherHeight - spacingheight + "px";
    /**
     * 当前表格头部高度
     */
    const thead = el.getElementsByTagName("thead");
    const theadEl = thead ? thead[0] : { clientHeight: 80 };
    const theadHeight = theadEl.clientHeight || 80;
    console.log(theadHeight);
    /**
     * 当前表格主体高度
     * 获取当前表格下表格主体部分
     */
    const bodyWrapper = el.getElementsByClassName("el-table__body-wrapper");
    const bodyWrapperEl = bodyWrapper
      ? bodyWrapper[0]
      : { style: { height: 0 } };
    bodyWrapperEl.style.height =
      fatherHeigth - brotherHeight - spacingheight - theadHeight + "px";
  },
  beforeUpdate(el: HTMLElement, binding: any, vnode: VNode, prevVnode: VNode) {
    /**
     * 在更新包含组件的 VNode 之前调用
     */
  },
  updated(el: HTMLElement, binding: any, vnode: VNode, prevVnode: VNode) {
    /**
     *  在包含组件的 VNode 及其子组件的 VNode 更新后调用
     */
  },
  beforeUnmount() {
    /**
     * 在卸载绑定元素的父组件之前调用
     */
  },
  unmounted() {
    /**
     * 当指令与元素解除绑定且父组件已卸载时, 只调用一次
     */
  },
};

export default directive;
