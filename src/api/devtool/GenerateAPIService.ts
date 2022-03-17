import request from '@/utils/Request';
const serviceName = "/generate/api";

export function test(data: any) {
    return request({
        url: serviceName + '/test',
        method: 'post',
        data: data
    })
}