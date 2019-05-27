<template>
<div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <span class="md-title">Chat</span>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-field class="messageClass">
          <label>Messages</label>
          <md-textarea rows='300' v-model="textarea" disabled></md-textarea>
        </md-field>

        <md-field>
          <label>Your message</label>
          <md-input v-model="message" v-on:keyup.enter="sendMessage()"></md-input>
        </md-field>
          <md-button class="md-primary md-raised" v-on:click="sendMessage()">OK</md-button>

      </md-app-content>
    </md-app>
  </div>
</template>


<script>
  export default {
    name: 'Chat',
    data () {
      return {
        textarea: '',
        message: '',
        count: 0
      }
    }, sockets:{
      connect () {
        console.log('connected to chat server')
      },
      count (val) {
        this.count = val.count
      },
      message (data) { // this function gets triggered once a socket event of `message` is received
        this.textarea += data + '\n' // append each new message to the textarea and add a line break
      }
    }, methods: {
      sendMessage () {
        // this will emit a socket event of type `function`

        if (this.message.localeCompare("") != 0 && this.message.localeCompare(" ") != 0){
          this.$socket.emit('message', this.message) // send the content of the message bar to the server
          this.message = '' // empty the message bar
        }
      }
    }
  }
</script>


<style scoped>
/* Add "scoped" attribute to limit CSS to this component only */
.md-app{
  max-width:20%;
  display:flex;
  justify-content:flex-end;
  margin-left:80%;
  //margin-right:10px;
  height:100vh;
}

.md-button {
  width:16vw;
}

.page-container {
  background-image: url("../assets/imagefond.png");
  background-repeat: no-repeat;
  background-size:contain;
  height:100vh;
}

.md-textarea {
  min-height:56vh !important;
}

.md-content {
  background-color:white;
}
</style>
