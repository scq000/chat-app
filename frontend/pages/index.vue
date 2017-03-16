<template>
<div>
  <h1>hello world</h1>
  <ul>
    <li v-for="message in messages">
      {{ message }}
    </li>
  </ul>
</div>
</template>

<style>
body {
  margin: 50px;
  font-family: sans-serif;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return axios.get('http://localhost:3030/messages').
    then(response => {
      return {
        messages: response.data.data
      }
    });
  }
}
</script>
