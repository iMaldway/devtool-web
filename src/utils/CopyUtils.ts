/**
 * 复制网页内容工具类
 * */
export default class CopyUtils {
  /**
   * @param {String} elementId
   * @returns {Boolean}
   */
  copy = (elementId: string) => {
    // 获取selection对象
    var selection = window.getSelection();
    // 清空selection对象
    selection?.removeAllRanges();
    //选择一个节点
    let ele: any;
    if (elementId) {
      ele = document.getElementById(elementId);
    } else {
      ele = document.getElementsByTagName("body").item(0);
    }
    // 创建一个Range实例
    var range = new Range();
    //选中节点
    range.selectNodeContents(ele);
    // selection对象设置range实例
    selection?.addRange(range);
    // 执行浏览器复制命令
    let boo = document.execCommand("Copy");
    //返回复制结果
    return boo;
  };

  /**
   * @param {String} value
   * @returns {Boolean}
   */
  copyValue = (value: string) => {
    let transfer = document.createElement("input");
    document.body.appendChild(transfer);
    transfer.value = value;
    transfer.focus();
    transfer.select();
    let boo = false;
    if (document.execCommand("copy")) {
      boo = document.execCommand("copy");
    }
    transfer.blur();
    document.body.removeChild(transfer);
    return boo;
  };

  /**
   * @param {String} elementId
   * @returns {Boolean}
   */
  copyInputByTypeIsHidden = (elementId: string) => {
    if (elementId) {
      let ele: any = document.getElementById(elementId);
      console.log(ele);
      return this.copyValue(ele?.value || ele?.defaultValue);
    }
    return false;
  };
}
