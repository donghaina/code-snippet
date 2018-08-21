// 将文件大小转换为对应的单位
function bytesToSize(bytes) {
  if (bytes === 0) return "0 B";
  let k = 1000, // or 1024
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
}