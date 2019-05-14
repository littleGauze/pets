import config from '../config'
import router from '../router'
import { logout, toast, getPrefer } from './utils'

const axios = require('axios')

const { apiBase, apiKeys, serverBase } = config
const api = axios.create({
  timeout: 10000,
  responseType: 'json'
})

const server = axios.create({
  baseURL: serverBase,
  timeout: 10000,
  responseType: 'json',
  withCredentials: true
})

export default function request (params) {
  const prefer = getPrefer()
  params.baseURL = apiBase.replace('{prefer}', prefer)
  params.headers = { 'x-api-key': apiKeys[prefer] }
  return api(params).then(res => {
    // parse the page count
    const count = res.headers['pagination-count'] || 0
    const limit = res.headers['pagination-limit'] || 1
    const page = res.headers['pagination-page'] || 0
    const pageCount = Math.ceil(count / limit)
    return { page, limit, pageCount, data: res.data }
  })
}

function service (params) {
  return server(params).then(res => {
    const { data } = res
    if (data.status === 200) {
      return data.data
    }

    if (data.message === 'you must login first') {
      logout()
      toast.error(data.message)
      return router.push('/')
    }

    return data
  })
}

export { service }
