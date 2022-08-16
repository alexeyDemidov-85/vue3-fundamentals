import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/alexeyDemidov-85/test-server',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default {
    getEvents(perPage, page) {
        return apiClient.get(`/events`, {
            params: {
                _limit: perPage,
                _page: page,
            },
        })
    },
    getEvent(id) {
        return apiClient.get(`/events/${id}`)
    },
}
