import axios from 'axios'
import { apiPrefix } from '../../config'
import { getAccessToken } from '../auth/helpers'

function fetchAPI({ isPOST, endpoint, data }) {
  return new Promise((resolve, reject) => {
    getAccessToken((token) => {
      if (token) {
        const axiosConfig = {
          url: apiPrefix + endpoint,
          method: isPOST ? 'POST' : 'GET',
          mode: 'cors',
          headers: {
            Authorization: token,
          },
        }

        if (isPOST) axiosConfig.data = data
        else axiosConfig.params = data


        window.console.info(`Getting ${endpoint} using axios`)
        axios(axiosConfig)
          .then((result) => {
            const status = result.status
            window.console.info(`Getting ${endpoint} succeed`)

            if (status === 401) {
              // do something on unauthorize
              reject(result)
            } else {
              resolve(result.data)
            }
          })
          .catch((error) => {
            if (error.response) {
              window.console.warn(`Getting ${endpoint} failed`)
              window.console.warn(error)

              const status = error.response.status
              if (status === 401) {
                // do something on unauthorize
              }

              reject({ status, error: error.response.data.Message })
            }
          })
      } else {
        reject({error: 'No token provided'})
      }
    })
  })
}

export default fetchAPI
