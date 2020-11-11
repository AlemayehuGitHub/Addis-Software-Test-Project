// @flow

import axios from 'axios'

import type { Axios } from 'axios'

// const API_ROOT = 'http://localhost:4000/employee'

class ApiService {

  get(path: string): Promise<Object> | Promise<Array<Object>> {
    return axios.get(path).then(response => response.data)
      .catch(function (error){
        console.log(error)
      })
  }

  post(path: string, payload: Object): Promise<Object> {
    return axios.post(path, payload).then(res => console.log(res.data))
  }

  patch(path: string, payload: Object): Promise<Object> {
    return axios.post(process.env.MONGODB_URI+':'+process.env.PORT+'/employee/edit/'+path, payload).then(response => response.data)
  }

  delete(path: string): Promise<number> {
    return axios.post(process.env.MONGODB_URI+':'+process.env.PORT+'/employee/delete/'+path).then(response => response.data)
  }
}

export default new ApiService()
