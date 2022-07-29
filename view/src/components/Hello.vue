<template>
  <div>
    <div class="container col-sm-10">
      <div>
        <img id="a" src="../assets/img/a.jpeg" >
      </div>
      <div class="jumbotron">
        <h1>欢迎进入多人聊天室！</h1>
        <p>登录开启在线聊天吧！！！</p>
        <br>
        <div class="form-group col-sm-6 offset-sm-3">
          <label for="exampleInputEmail1">用户名</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            v-model="value"
          />
        </div>
        <p><a class="btn btn-primary btn-lg" role="button" @click="go"> 点此登录</a></p>
      </div>
    </div>
  </div>
</template>

<script>
const ws = new WebSocket("ws://localhost:8080")
export default {
  data() {
    return {
      value:''
    }
  },
  mounted() {
    ws.addEventListener('open', this.handleWsOpen.bind(this), false)
    ws.addEventListener('close', this.handleWsClose.bind(this), false)
    ws.addEventListener('error', this.handleWsError.bind(this), false)
    // ws.addEventListener('message', this.handleWsMessage.bind(this), false)
  },
  methods: {
    async go() {
      await this.$http.post('/api/users',{name: this.value})
      ws.send('update')
      localStorage.setItem('username', this.value)
      this.$router.push('/room')
    },
    handleWsOpen() {
      console.log('websocket open');
    },
    handleWsClose() {
      console.log('websocket close');
    },
    handleWsError() {
      console.log('websocket error');
    }
    // handleWsMessage() {
    // }
  }
};
</script>

<style lang="less" scoped>
#a {
  height: 150px;
  width: 100%;
}
.jumbotron {
  height: 450px;
}

</style>