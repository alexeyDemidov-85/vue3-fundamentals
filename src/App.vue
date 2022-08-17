<template>
    <div v-if="flashMessage" id="flashMessage">
        {{ flashMessage }}
    </div>
    <div class="nav">
        <router-link :to="{ name: 'EventList' }">Events</router-link> |
        <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <router-view />
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'App',
    computed: {
        ...mapState('notification', {
            flashMessage: 'flashMessage',
        }),
    },
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.nav {
    padding: 30px;
}

.nav a {
    font-weight: bold;
    color: #2c3e50;
}

.nav a.router-link-exact-active {
    color: #42b983;
}
h4 {
    font-size: 20px;
}
@keyframes yellowfade {
    from {
        background-color: yellow;
    }
    to {
        background-color: transparent;
    }
}
#flashMessage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px;
    animation-name: yellowfade;
    animation-duration: 3s;
}

button {
    align-items: center;
    height: 50px;
    padding: 0 40px;
    background: linear-gradient(to right, #16c0b0, #84cf6a);
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s linear;
}
button:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
