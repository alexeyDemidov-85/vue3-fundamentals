import EventServices from '@/services/EventServices'

const state = {
    events: [],
    event: null,
    totalEvents: 0,
}

const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_TOTAL_EVENTS(state, total) {
        state.totalEvents = total
    },
    SET_EVENT(state, event) {
        state.event = event
    },
}
const actions = {
    registerEvent({ commit }, event) {
        return EventServices.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event)
            })
            .catch((error) => {
                throw error
            })
    },
    fetchEvents({ commit }, { perPage, page }) {
        return EventServices.getEvents(perPage, page)
            .then(({ data, headers = {} }) => {
                commit('SET_EVENTS', data)
                commit('SET_TOTAL_EVENTS', headers['x-total-count'])
            })
            .catch((error) => {
                throw error
            })
    },
    fetchEvent({ commit, state }, id) {
        const existingEvent = state.events.find((event) => event.id === id)
        if (existingEvent) {
            commit('SET_EVENT', existingEvent)
        } else {
            return EventServices.getEvent(id)
                .then(({ data: event }) => {
                    commit('SET_EVENT', event)
                })
                .catch((error) => {
                    throw error
                })
        }
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}
