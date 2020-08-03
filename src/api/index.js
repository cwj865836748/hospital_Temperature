import { service } from '@/plugins/axios'

export default {
  mine: {
    add: '/api/reportlog/report',
    adds (data = {}) {
      return service({
        url: '/api/reportlog/report',
        method: 'POST',
        data

      })
    }
  }
}
