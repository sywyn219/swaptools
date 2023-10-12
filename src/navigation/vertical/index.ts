// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: '首页',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: '定时交易',
      path: '/time-swap',
      icon: 'eos-icons:cronjob',
    },
    {
      title: '买卖目标',
      path: '/target-swap',
      icon: 'mingcute:target-fill',
    },
    {
      title: '批量买入',
      path: '/batch-buy',
      icon: 'fluent-mdl2:sell',
      vFlip: true,
    },
    {
      title: '批量卖出',
      path: '/batch-sell',
      icon: 'fluent-mdl2:sell',
    },
    {
      title: '批量归集',
      path: '/batch-input',
      icon: 'fluent-mdl2:gather',
    },
    {
      title: '批量转出',
      path: '/batch-output',
      icon: 'tabler:relation-one-to-many',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: '节点列表',
      icon: 'mdi:shield-outline',
    }
  ]
}

export default navigation
