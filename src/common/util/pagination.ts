export function pagination(page: string, size: string) {
  const _page = +page;
  const _size = + size;

  const limit = _size;
  // sql数组默认index从0开始计算
  const offset = (_page - 1) * limit;

  return { offset, limit };
}