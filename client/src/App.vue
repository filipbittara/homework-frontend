<template>
  <input v-model="username" placeholder="What's your name?">

  <Canvas @clicked="onClickChild"/>
  <button v-on:click="sendMessage()">Send Message</button>
  
  
  <div v-for="(item, index) in messages" :key="index" >
    {{item.username}} sent everyone this beautiful picture on {{item.date}}
    <div v-html="item.svg"/>
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue'


export default {
  name: 'App',
  components: {
    Canvas
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
}
</style>
