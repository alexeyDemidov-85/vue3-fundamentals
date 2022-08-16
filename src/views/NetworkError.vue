<template>
    <div class="network-error">
        <h1>Uh-oh!</h1>
        <h3>
            It's look like you're experecieng some network issues, please take a
            breath and <a href="#" @click="goToPrevPage">click here</a> to try
            again.
        </h3>
    </div>
</template>

<script>
export default {
    name: 'NetworkError',
    methods: {
        goToPrevPage() {
            this.$router.go(-1)
        },
    },
}
</script>

<style></style>
