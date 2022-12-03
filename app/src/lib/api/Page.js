import api from './index'
import {getLength} from '../helpers'

const Page = {
  fetchAll: async () => await api.get('page'),
  fetchError: async () => await api.get('page/error'),
  fetchCount: async () => await getLength(Page.fetchAll),
  fetchErrorCount: async () => await getLength(Page.fetchError),
  fetchRecentChecked: async (count = 10) => {
    return await api.get(`page/recent?$count={count}`)
  },

}

export default Page