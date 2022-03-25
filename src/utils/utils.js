import { Message } from 'element-ui';
function findChildren(cItem, data, lastShowChild) {
  const list = data.filter((item) => item.parentId == cItem.id);
  list.map((item) => {
    item.children = findChildren(item, data);
  });
  if (!lastShowChild && list.length == 0) {
    return null
  }
  return list;
}
export default {
  showMessage: (type, message) => {
    Message({
      message,
      type,
    });
  },
  toTree: (data, lastShowChild = true) => {
    // 筛选一级数据
    const list = data.filter((item) => item.parentId == null);
    list.map((item) => {
      item.children = findChildren(item, data, lastShowChild);
    });
    if (!lastShowChild && list.length == 0) {
      return null
    }
    return list;
  },
};
