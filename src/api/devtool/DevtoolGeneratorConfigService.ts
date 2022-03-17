import request from '@/utils/Request';
const serviceName = "/devtool/config";

// 查询列表
export function getList(data: any) {
  return request({
    url: serviceName,
    method: 'get',
    params: data
  })
}

// 新增
export function add(data: any) {
  return request({
    url: serviceName,
    method: 'post',
    data: data
  })
}

// 修改
export function update(data: any) {
  return request({
    url: serviceName,
    method: 'put',
    data: data
  })
}

// 删除
export function remove(id: string | number) {
  return request({
    url: serviceName,
    method: 'delete',
    data: {
      'id': id
    }
  })
}

// 根据id获取详细信息
export function getInfo(id: string | number) {
  return request({
    url: serviceName,
    method: 'get',
    params: { 'id': id }
  })
}
