import api from './index'

const Domain = {
  get: async (id) => await api.get(`domain/${id}`),
  fetchDomainList: async () => await api.get('domain'),
  refreshRatings: async () => await api.get('domain/refresh'),
  addNewDomain: async data => await api.post('domain', data),
}
export default Domain
