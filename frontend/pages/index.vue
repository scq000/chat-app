<template>
<div>
  <h1>hello world</h1>
  <ul>
    <li v-for="message in messages" class="chat-message">
        <strong>
            {{message.name}}
        </strong>

        <p>
            {{message.body}}
        </p>
    </li>
  </ul>

  <form  @submit.prevent="postMessage">
      <input type="text" placeholder="Name" v-model="name">
      <textarea name="message" rows="5" cols="80" placeholder="write a message" v-model="newMessage"></textarea>
      <button type="submit">Post Message</button>
  </form>
</div>
</template>

<style>
body {
  margin: 50px;
  font-family: sans-serif;
}

.chat-message {
    list-style: none;
    margin-bottom: 20px;
    margin-bottom: 1px solid #e5e5e5;
}

form input,form textarea {
    display: block;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
}
</style>

<script>
import axios from 'axios';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';

export default {
  data() {
    return axios.get('http://localhost:3030/messages').
        then(response => {
          return {
            messages: response.data.data,
            name: '',
            newMessage: ''
          }
        });
  },
  methods: {
      postMessage() {
          axios.post('http://localhost:3030/messages', {
              body: this.newMessage,
              name: this.name
          }).then(() => {
              this.newMessage = '';
              this.name = '';
          });
      }
  },
  mounted() {
      const app = feathers().configure(socketio(io('http://localhost:3030')));

      app.service('messages').on('created', message => {
          this.messages.push(message);
      });
  }
}
</script>
