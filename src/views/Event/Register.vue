<template>
    <h1>Register an event here!</h1>

    <div class="form-container">
        <form @submit.prevent="register">
            <label>Select a category: </label>
            <select v-model="event.category">
                <option
                    v-for="option in categories"
                    :value="option"
                    :key="option"
                    :selected="option === event.category"
                >
                    {{ option }}
                </option>
            </select>

            <h3>Name & describe your event</h3>

            <label>Title</label>
            <input v-model="event.title" type="text" placeholder="Title" />

            <label>Description</label>
            <input
                v-model="event.description"
                type="text"
                placeholder="Description"
            />

            <h3>Where is your event?</h3>

            <label>Location</label>
            <input
                v-model="event.location"
                type="text"
                placeholder="Location"
            />

            <h3>When is your event?</h3>
            <label>Date</label>
            <input v-model="event.date" type="text" placeholder="Date" />

            <label>Time</label>
            <input v-model="event.time" type="text" placeholder="Time" />

            <button type="submit">Register Me</button>
        </form>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'

const EVENT_SKELETON = {
    id: '',
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    organizer: '',
}
export default {
    name: 'EventRegister',
    data() {
        return {
            categories: [
                'sustainability',
                'nature',
                'animal welfare',
                'housing',
                'education',
                'food',
                'community',
            ],
            event: Object.assign({}, EVENT_SKELETON),
        }
    },
    computed: {
        ...mapState('user', {
            user: 'user',
        }),
    },
    methods: {
        register() {
            const event = {
                ...this.event,
                id: uuidv4(),
                organizer: this.user,
            }
            this.$store.dispatch('events/registerEvent', event).then(() => {
                this.showSuccessMessage()
                this.$router.push({
                    name: 'EventDetails',
                    params: { id: event.id },
                })
            })
        },
        cleanForm() {
            this.event = Object.assign({}, EVENT_SKELETON)
        },
        showSuccessMessage() {
            this.$store.dispatch('notification/showFlashMessage', {
                message: 'Congratulation! Your event was added!',
            })
        },
    },
}
</script>

<style>
.form-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10%;
}
select:focus {
    border-color: #16c0b0;
    outline: 0;
}
input {
    display: block;
    width: 100%;
    height: 30px;
    margin-bottom: 24px;
}
input[type='text'] {
    padding: 0px 10px;
}
input:focus {
    border-color: #16c0b0;
    outline: 0;
}
</style>
