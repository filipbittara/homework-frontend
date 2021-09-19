<template>
  <div> 
    <Canvas @clicked="onClickChild"/>
    <div class="username">Tell me your name <input v-model="username"></div>
    <div v-if="username && username.trim() != ''">
      <button v-on:click="sendMessage()">Send your picture to everyone</button>
    </div>
  </div>
  <div>
    <message v-for="(item, index) in messages" :key="index" v-bind:username="item.username" v-bind:date="item.date" v-bind:svg="item.svg"/>
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue'
import Message from './components/Message.vue'


export default {
  name: 'App',
  components: {
    Canvas,
    Message
  },
  data: function() {
    return {
      connection: null,
      image: null,
      messages: [],
      username: null
    }
  },
  methods: {
    sendMessage: function() {
      this.connection.send(JSON.stringify({
        date: new Date().toLocaleString(),
        username: this.username,
        svg: this.image
      }));
    },
    onClickChild (value) {
      this.image = value
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket('ws://localhost:9898/')

    this.connection.onmessage = function(event) {
      let message = JSON.parse(event.data)
      console.log(message.svg);
      this.messages.unshift(message)
    }.bind(this)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr
}

.username {
  padding-top: 15px;
}

button {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

button:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
</style>
