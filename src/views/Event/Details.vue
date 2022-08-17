<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'EventDetails',
    computed: {
        ...mapState('events', {
            event: 'event',
        }),
    },
}
</script>

<style></style>
