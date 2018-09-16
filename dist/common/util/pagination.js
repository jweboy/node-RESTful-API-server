"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pagination(page, size) {
    const _page = +page;
    const _size = +size;
    const limit = _size;
    const offset = (_page - 1) * limit;
    return { offset, limit };
}
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map