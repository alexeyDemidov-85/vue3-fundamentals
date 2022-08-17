<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div class="nav">
            <router-link :to="{ name: 'EventDetails' }">Details</router-link>
            |
            <router-link :to="{ name: 'EventRegister' }">Register</router-link>
            |
            <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'EventLayout',
    props: ['id'],
    created() {
        this.getEvent(this.id)
    },
    beforeRouteUpdate(to, from, next) {
        const eventId = to.params.id
        if (eventId) {
            this.getEvent(eventId).then(() => {
                next()
            })
        }
    },
    computed: {
        ...mapState('events', {
            event: 'event',
        }),
    },
    methods: {
        getEvent(id) {
            return this.$store
                .dispatch('events/fetchEvent', id)
                .then()
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        this.$router.push({
                            name: '404Resource',
                            params: { resource: 'event' },
                        })
                    } else {
                        this.$router.push({ name: 'NetworkError' })
                    }
                })
        },
    },
}
</script>

<style></style>
