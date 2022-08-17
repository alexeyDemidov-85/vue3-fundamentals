import { createStore } from 'vuex'
import user from './user'
import events from './events'
import notification from './notification'

export default createStore({
    modules: {
        user,
        events,
        notification,
    },
})
