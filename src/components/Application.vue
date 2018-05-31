<template>
  <div class="application-container">
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <a class="navbar-brand text-white">
        <b>Toastify your Ledger Nano</b>
        <small class="p-4">XRP(L) tool by <a href="https://twitter.com/WietseWind" class="text-white" target="_blank">@WietseWind</a></small>
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
        <p>
          Your device is connected to the internet (at least: your browser thinks it is). You are about to enter
          your mnemonic, allowing a possible attacker to steal your funds.
          You might want to be offline when you do this. Continue only if you trust your computer
          is not infected and you disabled your browser plugins. <b>Continue only if you know what you are doing.</b>
        </p>
        <p>
          If you want to coninue offline, you can
          <a href="https://github.com/WietseWind/toastify-ledger/releases">download a release</a> of
          this tool, and transfer it to a safe environment.
        </p>
      </div>
      <button @click="online=false" class="btn float-right btn-sm btn-danger">I accept the risk, continue →</button>
    </main>

    <main role="main" class="container" v-if="!online && !local && !devMode">
      <h1 class="mt-5 text-danger"><b>You are not running his tool locally!</b></h1>
      <div class="mt-3 alert alert-danger">
        <p>
          You are running this tool from a website (http/https) environment. Please make sure you are running
          the <b>original tool @WietseWind</b>, and not a modified (malicious) version hosted by someone else.
           <b>Continue only if you know what you are doing.</b>
        </p>
        <p>
          If you want to make sure you are running the right version of this tool,
          <a href="https://github.com/WietseWind/toastify-ledger/releases">download the most recent release</a>
          directly from Github.
        </p>
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
        <!-- <div class="text-center">
          <VueQrcode value="Hello, World!" :options="{ size: 200, foreground: '#000000' }"></VueQrcode>
        </div> -->
        <div class="row">
          <div class="col-12" v-if="step === 1">
            <p>
              If you have a XRP account (wallet) with a mnemonic (words, probably 24) as your secret, you can't use most of the
              tools and wallets available for the XRP Ledger. This is the case for owners of most of the available
              hardware wallets.
            </p>
            <p>
              Instead of a mnemonic, most of the XRP accounts (wallets) are secured using a <b>family seed</b> (secret)
              that looks something like this: <code class="text-primary">snmwCiwbFoCd53zrYTZvCgV2c24uH</code>. Software wallets (like Toast), decentralized XRP exchanges
              (like Gatehub) and other tools require a family seed (secret) to sign transactions.
            </p>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="acceptRisks.thatsme" id="acceptRisks_thatsme">
              <label class="form-check-label" for="acceptRisks_thatsme">My XRP account (wallet) is secured with a mnemomic instead of a family seed (secret)</label>
            </div>
            <p v-show="acceptRisks.thatsme" class="mt-5">
              Setting a <b>Regular Key</b> attaches a family seed (secret) to your account in addition to your 24 word seed.
            </p>
            <p v-show="acceptRisks.thatsme">
              When your account (wallet) has a <b>Regular Key</b> configured, both your existing secret and the secret for the
              configured extra XRP account (wallet) are able to sign transactions. To set a <b>Regular Key</b>, this tool can compose
              a transaction and send it to the XRP ledger, allowing you to use both your existing wallet and a newly generated
              family seed (secret) to sign transactions.
            </p>
            <div class="form-check" v-show="acceptRisks.thatsme">
              <input type="checkbox" class="form-check-input" v-model="acceptRisks.understand" id="acceptRisks_understand">
              <label class="form-check-label" for="acceptRisks_understand">I understand this, and I want this tool to configure a <b>Regular Key</b> for my account (wallet)</label>
            </div>
            <p v-show="acceptRisks.thatsme && acceptRisks.understand" class="mt-5">
              The next step, this tool will <b>randomly generate a valid family seed (secret)</b>.
            </p>
            <p v-show="acceptRisks.thatsme && acceptRisks.understand" class="alert alert-danger text-center">
              <b>YOU NEED TO KEEP THIS FAMILY SEED (SECRET) SAFE!</b>
            </p>
            <div v-show="acceptRisks.thatsme && acceptRisks.understand">
              This means:
              <ul>
                <li>You are about to enter sensitive data in this tool. Make sure you trust this computer. <b>Do not continue if you are on a public computer.</b></li>
                <li>The family seed (secret) you are about to generate will be visible. <b>It is for your eyes only.</b> Make sure no one is watching or making pictures from your computer screen.</li>
                <li>You need to <b>WRITE THE FAMILY SEED (SECRET) DOWN</b> and keep it in a safe place.</li>
                <li>Please do not copy-paste your family seed (secret) to a document and please do not store the family seed (secret) on a cloud environment.</li>
                <li>If someone has your family seed (secret), they can <b>steal all your XRP</b>.</li>
              </ul>
            </div>
            <div class="form-check" v-show="acceptRisks.thatsme && acceptRisks.understand">
              <input type="checkbox" class="form-check-input" v-model="acceptRisks.keepSecretSafe" id="acceptRisks_keepSecretSafe">
              <label class="form-check-label" for="acceptRisks_keepSecretSafe">I promise to keep my family seed (secret) safe</label>
            </div>
          </div>
          <div class="col-12" v-if="step === 2">
            <p>
              This is the family seed (secret) generated for your wallet. Please write down your secret.
              When you wrote down your secret, please type your family seed (secret) in the input field to confirm you wrote down the family seed (secret).
            </p>
            <h2 class="secure text-center mt-5" v-if="!account.focusConfirm && account.secret !== account.confirm">
              <code class="text-primary">
                <b>{{ account.secret }}</b>
              </code>
            </h2>
            <h2 class="secure text-center mt-5" v-if="account.focusConfirm || account.secret === account.confirm">
              <code class="text-muted">
                <b>s{{ 'X'.repeat(account.secret.length - 1) }}</b>
              </code>
            </h2>
            <p class="mt-5 text-center">
              <b>Confirm the family seed (secret) you wrote down</b> by typing it back into the input field (case sensitive).<br />
              <small :class="{ 'text-danger': account.secret !== account.confirm, 'text-muted': account.secret === account.confirm }">
                Only if the string you entered matches the family seed (secret) the next-button will be enabled.
              </small>
            </p>
            <!-- <pre>{{ account }}</pre> -->
            <div class="row mb-5">
              <div class="d-none d-md-block col-2"></div>
              <div class="col-12 col-md-8">
                <input type="text" :class="{ 'text-success is-valid': account.secret === account.confirm }" @blur="account.focusConfirm = false" @focus="account.focusConfirm = true" class="form-control form-control-lg" v-model="account.confirm" placeholder="Confirm the family seed (secret)">
              </div>
            </div>
          </div>
          <div class="col-12" v-if="step === 3">
            <p>Step 3 ... Not done yet.</p>
          </div>
          <div class="col-12" v-if="step === 4">
            <p>Step 4 ... Not done yet.</p>
          </div>
          <div class="col-12" v-if="step === 5">
            <p>Step 5 ... Not done yet.</p>
          </div>
          <div class="col-12" v-if="step === 6">
            <p>Step 6 ... Not done yet.</p>
          </div>
          <div class="col-12" v-if="step === 7">
            <p>Step 7 ... Not done yet.</p>
          </div>
          <div class="col-12">
            <button :disabled="disableNext" :class="{ 'btn-primary': !disableNext, 'btn-secondary': disableNext }" v-if="Object.keys(titles).indexOf((step + 1) + '') > -1" @click="step++" class="float-right btn d-block btn-lg text-right mt-3">
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
import keypairs from 'ripple-keypairs'

export default {
  name: 'Application',
  components: {
    VueQrcode
  },
  mounted () {
    this.generateAccount()

    window.onoffline = () => { this.online = false }
    window.ononline = () => { this.online = true }
    window['on' + (navigator.onLine ? 'online' : 'offline')]()
    this.local = !document.location.protocol.match(/^http/)

    if (this.devMode) {
      this.acceptRisks.thatsme = true
      this.acceptRisks.understand = true
      this.acceptRisks.keepSecretSafe = true
      this.step = 3
      this.account.confirm = this.account.secret
    }
  },
  computed: {
    devMode () {
      return process.env.NODE_ENV === 'development'
    },
    disableNext () {
      switch (this.step) {
        case 1:
          return !this.acceptRisks.understand || !this.acceptRisks.keepSecretSafe
        case 2:
          return this.account.confirm.trim() !== this.account.secret.trim()
        default:
          return true
      }
    }
  },
  methods: {
    generateAccount () {
      this.account.secret = keypairs.generateSeed({})
      this.account.keypair = keypairs.deriveKeypair(this.account.secret)
      this.account.address = keypairs.deriveAddress(this.account.keypair.publicKey)
    }
  },
  data () {
    return {
      online: false,
      local: false,
      acceptRisks: {
        thatsme: false,
        understand: false,
        keepSecretSafe: false
      },
      account: {
        secret: '',
        keypair: {},
        address: '',
        confirm: '',
        focusConfirm: false
      },
      step: 1,
      titles: {
        1: { menu: 'Intro', title: 'Introduction & warnings', subtitle: 'Why Toastify your ledger?' },
        2: { menu: 'Family seed (secret)', title: 'Your newly generated family seed (secret)', subtitle: 'Write it down, and store it some place safe!' },
        3: { menu: 'Enter mnemonic', title: 'Enter your mnemonic (words)', subtitle: 'Probably a phrase of 24 lower case words' },
        4: { menu: 'Verify', title: 'xxx', subtitle: 'yyyy' },
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
  label.form-check-label {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .secure {
    pointer-events: none;
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }
</style>
