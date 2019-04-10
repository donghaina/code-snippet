function getQueryArgs() {
  // 将查询字符串转换为Object
  let qs = location.search.length > 0 ? location.search.substring(1) : "";
  let args = {};
  let items = qs.length ? qs.split("&") : [];
  let item = null;
  let name = null;
  let value = null;
  let len = items.length;
  for (let i = 0; i < len; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}