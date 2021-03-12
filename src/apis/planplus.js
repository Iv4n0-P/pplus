import axios from 'axios'

export default axios.create({
    baseURL: 'https://www.pp.cirrus.hr/',
    auth: {
        username: 'react@cirrus.hr',
        password: 'plaNPlus'
        }
})