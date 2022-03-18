export default [
    {
      label: '数据库表数据模型',
    },
    {
      label: 'tableInfo',
      children: [
        {
          label: '[Object]表格相关信息'
        },
        {
          label: 'tableSchema',
          children: [
            {
              label: '[String]'
            }
          ]
        },
        {
          label: 'tableName',
          children: [
            {
              label: '[String]表名'
            }
          ]
        },
        {
          label: 'columnName',
          children: [
            {
              label: '[String]字段名称'
            }
          ]
        },
        {
          label: 'ordinalPosition',
          children: [
            {
              label: '[String]'
            }
          ]
        },
        {
          label: 'columnDefault',
          children: [
            {
              label: '[String]字段默认值'
            }
          ]
        },
        {
          label: 'isNullable', 
          children: [
            {
              label: '[String]是否可为空'
            }
          ]
        },
        {
          label: 'dataType',
          children: [
            {
              label: '[String]数据类型'
            }
          ]
        },
        {
          label: 'columnComment',
          children: [
            {
              label: '[String]字段描述'
            }
          ]
        },
        {
          label: 'columnKey',
          children: [
            {
              label: '[String]是否主键'
            }
          ]
        },
      ]
    },
    {
      label: 'generatorConfigInfo',
      children: [
        {
          label: '[Object]配置相关信息'
        },
        {
          label: 'name',
          children: [
            {
              label: '[String]配置名称'
            }
          ]
        },
        {
          label: 'author',
          children: [
            {
              label: '[String]配置作者'
            }
          ]
        },
        {
          label: 'copyright',
          children: [
            {
              label: '[String]版权内容'
            }
          ]
        },
        {
          label: 'packageName',
          children: [
            {
              label: '[String]包名称'
            }
          ]
        },
        {
          label: 'moduleName',
          children: [
            {
              label: '[String]模块名称'
            }
          ]
        },
        {
          label: 'tablePrefix',
          children: [
            {
              label: '[String]表前缀'
            }
          ]
        },
        {
          label: 'describe',
          children: [
            {
              label: '[String]描述信息'
            }
          ]
        },
      ]
    },
    {
      label: 'className',
      children: [
        {
          label: '[String]类名,没有表前缀信息的'
        }
      ]
    },
    {
      label: 'classname',
      children: [
        {
          label: '[String]类名(小写)'
        }
      ]
    },
    {
      label: 'serviceName',
      children: [
        {
          label: '[String]服务名称，等同于类名称变种'
        }
      ]
    },
    {
      label: 'servicename',
      children: [
        {
          label: '[String]服务名称（小写）'
        }
      ]
    },
    {
      label: 'tableName',
      children: [
        {
          label: '[String]表名'
        }
      ]
    },
    {
      label: 'tablename',
      children: [
        {
          label: '[String]表名(小写)'
        }
      ]
    },
    {
      label: 'primaryKey',
      children: [
        {
          label: '[String]主键'
        }
      ]
    },
]