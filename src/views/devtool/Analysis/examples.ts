export default [
    {
      label: 'selector',
      children: [
        {
          label: '[String]选择器,通过document.querySelector可获取到的元素'
        }
      ]
    },
    {
      label: 'name',
      children: [
        {
          label: '[String][output]当前节点名称,输出文件中的key值'
        }
      ]
    },
    {
      label: 'operation',
      children: [
        {
          label: '[String]对选中节点进行的操作,默认click,此项暂未实现'
        }
      ]
    },
    {
      label: 'children',
      children: [
        {
          label: '[Array]子级集合,以下内容为子级中均可包含的内容'
        },
        {
          label: 'selector',
          children: [
            {
              label:
                '[String]选择器,通过document.querySelector可获取到的元素'
            }
          ]
        },
        {
          label: 'name',
          children: [
            {
              label: '[String][output]当前节点名称,输出文件中的key值'
            }
          ]
        },
        {
          label: 'operation',
          children: [
            {
              label: '[String]对选中节点进行的操作,默认click,此项暂未实现'
            }
          ]
        },
        {
          label: 'after',
          children: [
            {
              label: '[Object]对目标元素获取数据前的前置操作'
            },
            {
              label: 'selector',
              children: [
                {
                  label: '[String]选择器'
                }
              ]
            },
            {
              label: 'operation',
              children: [
                {
                  label: '[String]对选中节点进行的操作,默认click'
                }
              ]
            }
          ]
        },
        {
          label: 'before',
          children: [
            {
              label: '[Object]对目标元素获取数据后的后置操作'
            },
            {
              label: 'selector',
              children: [
                {
                  label: '[String]选择器'
                }
              ]
            },
            {
              label: 'operation',
              children: [
                {
                  label: '[String]对选中节点进行的操作,默认click'
                }
              ]
            }
          ]
        },
        {
          label: 'output',
          children: [
            {
              label: '[Array]输出内容'
            },
            {
              label: 'selector',
              children: [
                {
                  label: '[String]选择器'
                }
              ]
            },
            {
              label: 'root',
              children: [
                {
                  label: '[Boolean]从父级选择器往内选'
                }
              ]
            },
            {
              label: 'name',
              children: [
                {
                  label: '[String][output]输出的key值'
                }
              ]
            },
            {
              label: 'value',
              children: [
                {
                  label:
                    '[Array][output]选取数据集合,例：["attributes","title","value"]末尾值为最终取值'
                }
              ]
            }
          ]
        }
      ]
    }
]