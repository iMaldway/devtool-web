export default class Address {
  constructor() {}
  getURLParameter = () => {
    let params = {};
    const hash = window.location.hash;
    const param = hash.split("?");
    if (param.length > 1) {
      const items = param[1].split("&");
      for (let i in items) {
        let item = items[i];
        let keyValue = item.split("=");
        params[keyValue[0]] = keyValue[1] || "";
      }
    }
    return params;
  };
}
