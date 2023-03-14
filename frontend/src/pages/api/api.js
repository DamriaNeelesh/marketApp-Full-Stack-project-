import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const get = async () => {
  const { data } = await axios.get(API_URL)
  console.log(data)
  return data
}

export default getCoins
