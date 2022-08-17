<template>
    <h1>Events for Good</h1>
    <div v-if="events.length" class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
        <div class="pagination">
            <router-link
                v-if="hasPrevPage && !apiBusy"
                id="page-prev"
                :to="{ name: 'EventList', query: { page: this.page - 1 } }"
                rel="prev"
            >
                &#60; Previuos
            </router-link>
            <router-link
                v-if="hasNextPage && !apiBusy"
                id="page-next"
                :to="{ name: 'EventList', query: { page: this.page + 1 } }"
                rel="next"
            >
                Next &#62;
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '@/components/EventCard.vue'

export default {
    name: 'EventList',
    components: {
        EventCard,
    },
    data() {
        return {
            defaultPerPage: 2,
            apiBusy: false,
        }
    },
    computed: {
        ...mapState('events', {
            events: 'events',
            totalEvents: 'totalEvents',
        }),
        hasPrevPage() {
            return this.page > 1
        },
        hasNextPage() {
            const totalPages = Math.ceil(this.totalEvents / this.defaultPerPage)
            return totalPages > this.page
        },
        page() {
            return parseInt(this.$route.query.page) || 1
        },
    },
    created() {
        this.getEvents()
    },
    beforeRouteUpdate(to, from, next) {
        this.getEvents(parseInt(to.query.page)).then(() => {
            next()
        })
    },
    methods: {
        getEvents(page = this.page, perPage = this.defaultPerPage) {
            this.apiBusy = true
            return this.$store
                .dispatch('events/fetchEvents', { perPage, page })
                .catch(() => {
                    this.$router.push({ name: 'NetworkError' })
                })
                .finally(() => {
                    this.apiBusy = false
                })
        },
    },
}
</script>
<style>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pagination {
    display: flex;
    width: 290px;
}
.pagination a {
    color: #2c3e50;
    text-decoration: none;
    flex-grow: 1;
}
#page-prev {
    text-align: left;
}
#page-next {
    text-align: right;
}
</style>
