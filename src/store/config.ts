// api接口配制文件
/*
local：本地开发配制
dev：测试环境配制
sit：预发布环境配制
uat：验收环境配制
prod：正式环境配制
url：目标地址
imgFileUrl：图片地址
fileUrl：文件地址
cndUrl：cdn静态文件地址
*/
/*
NOW 服务环境
*/
const CURRENT = 'production';
const ADDITIONAL =  (process.env.NODE_ENV != 'development')? process.env.NODE_ENV:CURRENT;
const IS_ADDITIONAL = ADDITIONAL == '' ? undefined :ADDITIONAL;
export const NOW = IS_ADDITIONAL || process.env.NODE_ENV || 'development';
export const isDev = ( NOW == "production" || process.env.NODE_ENV == NOW ) ? "":"";
export const isHttps = NOW == "production" ? "http://":"http://";

console.warn(process.env.NODE_ENV,NOW,isDev,isHttps);

const apiConfiguration = {
  
  'development':
  {
    'url': 'http://localhost:3000',
    'imgFileUrl': '',
    'fileUrl': 'http://localhost:3000',
    'cdnUrl': ''
  },
  'testing':
  {
    'url': 'http://192.168.0.243:9528'+isDev,
    'imgFileUrl': 'http://192.168.0.243:9528'+isDev,
    'fileUrl': 'http://192.168.0.243:9528'+isDev,
    'cdnUrl': 'http://192.168.0.243:9528'+isDev
  },
  'production':
  {
    'url': 'http://localhost:3000',
    'imgFileUrl': '',
    'fileUrl': 'http://localhost:3000',
    'cdnUrl': ''
  },
}
export default apiConfiguration[NOW];
