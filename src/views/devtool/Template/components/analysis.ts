export default [
    {
        label: '网址解析数据模型',
    },
    {
      label: 'analysisData',
      children: [
        {
          label: '[Object]通过网址解析获取到的数据，其内容是按照解析规则生成'
        },
      ]
    },
    {
        label: 'analysisInfo',
        children: [
          {
            label: '[Object]网址解析分析配置'
          },
          {
            label: 'type',
            children: [
              {
                label: '[String]解析名称/类型'
              }
            ]
          },
          {
            label: 'url',
            children: [
              {
                label: '[String]解析地址'
              }
            ]
          },
          {
            label: 'body',
            children: [
              {
                label: '[String]解析内容'
              }
            ]
          },
        ]
      },
]