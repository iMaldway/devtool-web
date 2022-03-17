import request from '@/utils/Request';
const serviceName = "/code/generation";

// 生成代码
export function build(data: any) {
  return request({
    url: serviceName + '/build',
    method: 'post',
    data: data,
  })
}

export function buildByAnalysis(data: any) {
  return request({
    url: serviceName + '/analysis',
    method: 'post',
    data: data,
  })
}

