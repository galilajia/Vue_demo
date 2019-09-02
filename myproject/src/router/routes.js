import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      show: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      show: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      show: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
