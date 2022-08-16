<template>
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
</template>

<script>
export default {
    name: 'EventRegister',
    inject: ['GStore'],
    props: {
        event: {
            type: Object,
            require: true,
        },
    },
    methods: {
        register() {
            //API Call
            // If .then - to EventDetails
            this.setSuccessMessage()
            this.deleteMessageWithDelay()
            this.$router.push({
                name: 'EventDetails',
            })
        },
        setSuccessMessage() {
            this.GStore.flashMessage = `You are successfully registered for ${this.event.title}`
        },
        deleteMessageWithDelay(delay = 3000) {
            setTimeout(() => {
                this.GStore.flashMessage = ''
            }, delay)
        },
    },
}
</script>

<style></style>
