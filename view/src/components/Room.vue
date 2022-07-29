<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-7 offset-sm-1">
        <div class="jumbotron">
          <div id="room">
            <div class="panel panel-success">
              <div class="panel-heading">
                <h3 class="panel-title">
                  <p class="text-left">聊天室</p>
                </h3>
              </div>
              <div class="panel-body">
                <div id="room-text">
                  <p class="text-left" v-for="item in msgList" :key="item.id">
                    <span id="user-name">{{ item.name }}{{ item.id }}:</span
                    >{{ item.msg }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group">
            <input type="text" class="form-control" v-model="value" />
            <span class="input-group-addon">
              <button id="go" class="btn btn-primary" @click="go">go</button>
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div id="user-list" class="panel panel-default">
          <div class="panel-heading">在线用户列表</div>
          <div class="panel-body">
            <ul class="text-left">
              <li v-for="items in users" :key="items.id">{{ items.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ws = new WebSocket('ws://localhost:8080')

export default {
  data() {
    return {
      value: '',
      users: [],
      msgList: []
    }
  },

  created() {
    this.getData()
  },

  mounted() {
    ws.addEventListener('open', this.handleWsOpen.bind(this), false)
    ws.addEventListener('close', this.handleWsClose.bind(this), false)
    ws.addEventListener('error', this.handleWsError.bind(this), false)
    ws.addEventListener('message', this.handleWsMessage.bind(this), false)
  },

  methods: {
    go() {
      const username = localStorage.getItem('username')
      ws.send(JSON.stringify({
        name: username,
        id: new Date(),
        msg: this.value
      }))
      // this.msgList.push({
      //   name: username,
      //   id: new Date(),
      //   msg: this.value
      // })
      this.value = ''
    },

    async getData() {
      const { data: res } = await this.$http.get('/api/users')
      this.users = res.data
    },
    handleWsOpen() {
      console.log('websocket open');
    },
    handleWsClose() {
      console.log('websocket close');
    },
    handleWsError() {
      console.log('websocket error');
    },
    handleWsMessage(e) {
      if(e.data == 'update') {
        this.getData()
      } else {
        const msg = JSON.parse(e.data)
        this.msgList.push(msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 600px;
  margin-top: 30px;
  background-image: url('G:\vs code_html\vue-ws-koa\view\src\assets\img\b.jpeg');
  background-size: 100%;
}
.jumbotron {
  height: 450px;
  margin-top: 60px;
}
#room {
  height: 300px;
}
#go {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.panel-title {
  color: cadetblue !important;
}
#user-name {
  color: brown;
}
#room-text {
  height: 238px;
  width: 570px;
  overflow: auto;
  background: #eeeeee;
}
#user-list {
  background-color: #eeeeee;
  height: 450px;
  margin-top: 60px;
  .panel-heading {
    font-size: 20px;
    color: blue;
    padding-top: 50px;
  }
  ul {
    list-style: none;
    padding-left: 68px;
    color: rgb(85, 12, 12);
  }
}
</style>