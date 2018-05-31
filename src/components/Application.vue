<template>
  <div class="application-container">
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <a class="navbar-brand text-white">
        <b>Toastify your Ledger Nano</b>
        <small class="p-4">A tool by <a href="https://twitter.com/WietseWind" class="text-white" target="_blank">@WietseWind</a></small>
      </a>
    </nav>

    <div class="nav-scroller bg-white box-shadow" v-if="(!online && local) || devMode">
      <nav class="nav nav-underline">
        <a v-for="menu in Object.keys(titles)" v-bind:key="menu" :class="{ 'text-muted': (step + '') !== menu, active: (step + '') === menu, 'text-dark': (step + '') === menu }" class="nav-link">
          {{ menu }}. {{ titles[menu].menu }}
        </a>
      </nav>
    </div>

    <main role="main" class="container" v-if="online && !devMode">
      <h1 class="mt-5 text-danger"><b>You are online!</b></h1>
      <div class="mt-3 alert alert-danger">
        You are online!
      </div>
      <button @click="online=false" class="btn float-right btn-sm btn-danger">I accept the risk, continue →</button>
    </main>

    <main role="main" class="container" v-if="!online && !local && !devMode">
      <h1 class="mt-5 text-danger"><b>You are not working locally!</b></h1>
      <div class="mt-3 alert alert-danger">
        You are running this from the web!
      </div>
      <button @click="local=true" class="btn float-right btn-sm btn-danger">I accept the risk, continue →</button>
    </main>

    <main role="main" class="container" v-if="(!online && local) || devMode">
      <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
        <div class="lh-100">
          <h4 class="mb-0 text-white lh-100">{{ step }}. {{ titles[step].title }}</h4>
          <span>{{ titles[step].subtitle }}</span>
        </div>
      </div>

      <div class="my-3 p-3 bg-white rounded box-shadow">
        <!-- <h6 class="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
        <div class="media text-muted pt-3">
          <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">@username</strong>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          </p>
        </div> -->
        <div class="row">
          <div class="col-12" v-if="step === 1">
            <p>
              Trololo Stap 1
            </p>
            <div class="text-center">
              <VueQrcode value="Hello, World!" :options="{ size: 200, foreground: '#000000' }"></VueQrcode>
            </div>
          </div>
          <div class="col-12" v-if="step === 2">
            <p>Trololo Stap 2</p>
          </div>
          <div class="col-12" v-if="step === 3">
            <p>Trololo Stap 3</p>
          </div>
          <div class="col-12" v-if="step === 4">
            <p>Trololo Stap 4</p>
          </div>
          <div class="col-12" v-if="step === 5">
            <p>Trololo Stap 5</p>
          </div>
          <div class="col-12" v-if="step === 6">
            <p>Trololo Stap 6</p>
          </div>
          <div class="col-12" v-if="step === 7">
            <p>Trololo Stap 7</p>
          </div>
          <div class="col-12">
            <button v-if="Object.keys(titles).indexOf((step + 1) + '') > -1" @click="step++" class="float-right btn btn-primary d-block btn-lg text-right mt-3">
              <b>Next →</b>
            </button>
            <button v-if="Object.keys(titles).indexOf((step - 1) + '') > -1" @click="step--" class="btn-lg btn-prev btn-outline-secondary btn d-block mt-3">
              ← Back
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VueQrcode from '@xkeshi/vue-qrcode'

export default {
  name: 'Application',
  components: {
    VueQrcode
  },
  mounted () {
    window.onoffline = () => { this.online = false }
    window.ononline = () => { this.online = true }
    window['on' + (navigator.onLine ? 'online' : 'offline')]()
    this.local = !document.location.protocol.match(/^http/)
  },
  computed: {
    devMode () {
      return false
      // return process.env.NODE_ENV === 'development'
    }
  },
  data () {
    return {
      online: false,
      local: false,
      acceptRisk: false,
      step: 1,
      titles: {
        1: { menu: 'Intro', title: 'Introduction & warnings', subtitle: 'Why Toastify your ledger?' },
        2: { menu: 'Generate secret', title: 'xxx', subtitle: 'yyyy' },
        3: { menu: 'Verify', title: 'xxx', subtitle: 'yyyy' },
        4: { menu: 'Enter mnemonic', title: 'xxx', subtitle: 'yyyy' },
        5: { menu: 'Submit using Toast', title: 'xxx', subtitle: 'yyyy' },
        6: { menu: 'Add wallet to Toast', title: 'xxx', subtitle: 'yyyy' },
        7: { menu: 'Done', title: 'xxx', subtitle: 'yyyy' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    cursor: default;
    &[href] { cursor: pointer; }
  }
  .btn-prev {
    opacity: .4;
    &:hover {
      opacity: .9;
    }
  }
</style>
