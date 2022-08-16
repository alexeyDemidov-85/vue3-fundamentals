<template>
    <h1>Events for Good</h1>
    <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
        <div class="pagination">
            <router-link
                v-if="hasPrevPage"
                id="page-prev"
                :to="{ name: 'EventList', query: { page: this.page - 1 } }"
                rel="prev"
            >
                &#60; Previuos
            </router-link>
            <router-link
                v-if="hasNextPage"
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
import EventCard from '@/components/EventCard.vue'
import EventServices from '@/services/EventServices'

export default {
    name: 'EventList',
    components: {
        EventCard,
    },
    props: ['page'],
    data() {
        return {
            events: null,
            totalEvents: 0,
            defaultPerPage: 2,
        }
    },
    computed: {
        hasPrevPage() {
            return this.page > 1
        },
        hasNextPage() {
            const totalPages = Math.ceil(this.totalEvents / this.defaultPerPage)

            return totalPages > this.page
        },
    },
    beforeRouteEnter(routeTo, routeFrom, next) {
        const DEFAULT_PER_PAGE = 2
        const currentPage = parseInt(routeTo.query.page) || 1
        return EventServices.getEvents(DEFAULT_PER_PAGE, currentPage)
            .then(({ data, headers = {} }) => {
                next((component) => {
                    console.log(component)
                    component.events = data
                    component.totalEvents = headers['x-total-count']
                })
            })
            .catch(() => {
                next({ name: 'NetworkError' })
            })
    },
    beforeRouteUpdate(routeTo) {
        const DEFAULT_PER_PAGE = 2
        const currentPage = parseInt(routeTo.query.page) || 1
        return EventServices.getEvents(DEFAULT_PER_PAGE, currentPage)
            .then(({ data, headers = {} }) => {
                this.events = data
                this.totalEvents = headers['x-total-count']
            })
            .catch(() => {
                return { name: 'NetworkError' }
            })
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
