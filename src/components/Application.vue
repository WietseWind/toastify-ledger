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
              <label class="form-check-label" for="acceptRisks_thatsme">My XRP account (wallet) is secured with a mnemonic instead of a family seed (secret)</label>
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
                <b>s{{ repeat('X', account.secret.length - 1) }}</b>
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
                <input type="text" :class="{ 'is-valid': account.secret === account.confirm }" @blur="account.focusConfirm = false" @focus="account.focusConfirm = true" class="form-control form-control-lg" v-model="account.confirm" placeholder="Confirm the family seed (secret)">
              </div>
            </div>
          </div>
          <div class="col-12" v-if="step === 3">
            <p>
              Please enter your mnemonic <b>separated by a space</b>. Your mnemonic is probably a sentence of 24 lowercase words. However, mnemonics with an other amount of words are in circulation as well (but less common).
            </p>
            <textarea :class="{ 'is-valid': formattedMnemonic.words === mnemonic.text.trim() && formattedMnemonic.count === 24, 'is-invalid': formattedMnemonic.words !== mnemonic.text.trim() }" type="text" class="mnemonic form-control form-control-lg" v-model="mnemonic.text" placeholder="Enter your mnemonic"></textarea>
            <div class="form-check mt-4">
              <input type="checkbox" class="form-check-input" v-model="mnemonic.hasPassphrase" id="mnemonic_hasPassphrase">
              <label class="form-check-label" for="mnemonic_hasPassphrase">I have a mnemonic with passphrase, also known as the '25th word'</label>
            </div>
            <input v-if="mnemonic.hasPassphrase" type="text" class="mt-3 form-control form-control-lg" v-model="mnemonic.passphrase" placeholder="Enter your passphrase">
          </div>
          <div class="col-12" v-if="step === 4">
            <p>
              <b>Please check</b> if the account (wallet address) <b>matches your XRP wallet address</b>.
              Based on the mnemonic you entered, your XRP wallet address should be:
            </p>
            <h2 class="secure text-center mt-5" v-if="mnemonic.account.address === ''">
              <code class="text-secondary">
                Calculating...
              </code>
            </h2>
            <h2 class="secure text-center mt-5" v-if="mnemonic.account.address !== ''">
              <code class="text-primary">
                <b>{{ mnemonic.account.address }}</b>
              </code>
            </h2>
            <div class="text-center mt-5">
              <div class="form-check text-center" :class="{ 'text-muted': mnemonic.account.address== '' }">
                <input type="checkbox" :disabled="mnemonic.account.address === ''" class="form-check-input" v-model="mnemonic.accept" id="mnemonic_accept">
                <label class="form-check-label" :class="{ 'disabled': mnemonic.account.address === '' }" for="mnemonic_accept">Yes, I checked and this is indeed my XRP wallet address</label>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="step === 5">
            <p>This is what we are going to do, <b>please read this list carefully</b>:</p>
            <ul>
              <li>Open Toast Wallet, and go to <b>Settings</b> and click <b>Submit Offline Transaction</b></li>
              <li>Scan the <b class="text-danger">red</b> QR code displayed below</li>
              <li>Follow the (step by step) instructions below</li>
            </ul>
            <div class="row">
              <div class="col-12 col-lg-4 mt-2">
                <div class="card text-center" :class="{ 'text-muted bg-light': toast.scanned }">
                  <div class="card-body">
                    <h5 class="card-title">1. Scan in Toast</h5>
                    <div class="card-text">
                      <VueQrcode :value="mnemonic.account.address" :options="{ size: 200, background: 'transparent', foreground: toast.scanned ? '#a0a0a0' : '#dc3545' }"></VueQrcode>
                    </div>
                  </div>
                  <div class="card-footer bg-transparent" :class="{ 'border-white': !toast.scanned, 'border-light': toast.scanned }">
                    <button v-if="toast.scanned" disabled class="btn btn-outline-secondary">✓ Done</button>
                    <button v-if="!toast.scanned" @click="toast.scanned = true" class="btn btn-primary">Continue →</button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4 mt-2">
                <div class="card text-center" :class="{ 'text-muted bg-light': !toast.scanned || toast.codeComplete }">
                  <div class="card-body">
                    <h5 class="card-title">2. Type code</h5>
                    <div class="card-text">
                      Enter the <b class="text-primary" :class="{ 'text-muted': !toast.scanned || toast.codeComplete }">blue</b> <code class="text-primary" :class="{ 'text-muted': !toast.scanned || toast.codeComplete }"><q>Confirmation Code</q></code> from Toast Wallet.
                      <input :disabled="!toast.scanned" v-on:keyup="toast.codeOk.checked = false" type="text" :class="{ 'text-primary': !toast.codeComplete, 'text-secondary': toast.codeComplete, 'is-invalid text-danger': (!toast.codeOk.is && toast.codeOk.checked) }" class="toast-confirmation-code mt-5 form-control text-center form-control-lg" placeholder="XXXX XXXX XXXX" v-model="toast.code">
                      <small class="text-danger text-center" v-if="!toast.codeOk.is && toast.codeOk.checked">Invalid code, please double check</small>
                    </div>
                  </div>
                  <div class="card-footer bg-transparent" :class="{ 'border-light': toast.codeComplete, 'border-white': !toast.codeComplete }" v-if="toast.scanned">
                    <button v-if="!toast.codeComplete" @click="checkToastCode" :disabled="toast.code.length <= 3 || (toast.codeOk.checked && !toast.codeOk.ok)" class="btn btn-primary">Continue →</button>
                    <button v-if="toast.codeComplete" @click="checkToastCode" class="btn btn-outline-primary">✓ Done</button>
                  </div>
                  <div class="card-footer bg-transparent border-light" v-if="!toast.scanned">
                    <small class="text-muted">Complete the previous steps...</small>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4 mt-2">
                <div class="card text-center" :class="{ 'text-muted bg-light': !toast.scanned || !toast.codeComplete }">
                  <div class="card-body">
                    <h5 class="card-title">3. Scan in Toast</h5>
                    <div class="card-text">
                      <VueQrcode v-if="toast.scanned && toast.codeComplete" :value="regularKeyTx.string" :options="{ size: 240, background: 'transparent', foreground: '#28a745' }"></VueQrcode>
                      <!-- <pre class="text-left">{{ regularKeyTx.signedTx }}</pre> -->
                      <svg v-if="!toast.scanned || !toast.codeComplete" width="100" height="100" class="mt-5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 30.066 30.066" style="enable-background:new 0 0 30.066 30.066;" xml:space="preserve">
                        <path d="M14.335,14.465c0,0-3.516-3.422-4.887-7.355V6.039h11.168V7.11c-1.782,4.343-4.887,7.355-4.887,7.355H14.335z" style="fill: #cccccc;"></path>
                        <path d="M24.642,4.907V3.219h1.602V0H3.823v3.219h1.6v1.688c0,2.579,4.628,9.622,4.848,10.13   c-0.216,0.508-4.848,7.551-4.848,10.119v1.687h-1.6v3.223h22.42v-3.223h-1.602v-1.687c0-2.581-4.631-9.577-4.875-10.125   C20.01,14.485,24.642,7.486,24.642,4.907z M23.039,25.156v1.687H7.024v-1.687c0-1.853,4.907-9.195,4.907-10.125   c0-0.929-4.907-8.269-4.907-10.124V3.219H23.04v1.688c0,1.855-4.948,9.195-4.948,10.124C18.093,15.961,23.039,23.303,23.039,25.156   z" style="fill: #cccccc;"></path>
                      </svg>
                    </div>
                  </div>
                  <div v-if="toast.scanned && toast.codeComplete" class="card-footer bg-transparent border-white">
                    <button @click="regularKeySet" class="btn btn-primary">Continue →</button>
                  </div>
                  <div v-if="!toast.scanned || !toast.codeComplete" class="card-footer bg-transparent border-light">
                    <small class="text-muted">Complete the previous steps...</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="step === 6">
            <p>
              You are done! You successfully added a <b>Regular Key</b> to your XRP account (wallet), allowing to use your mnemonic wallet
              with every XRP wallet / tool that requires a family seed (secret). Let's start by adding your mnemonic wallet to <b>Toast Walllet</b>.
            </p>
            <ul>
              <li>Open <b>Toast Wallet</b> and click <b>Add Account</b> (from the <b>Home</b>-panel)</li>
              <li>Click <b>Add Existing Address</b></li>
            </ul>
            <p>Now enter your new <b>family seed (secret)</b> (generated at step 2) in the <b>Ripple Secret</b> field in Toast Wallet:</p>
            <div class="row">
              <div class="col-0 col-md-2 col-lg-3"></div>
              <div class="col-12 col-md-8 col-lg-6">
                <div class="card border-primary">
                  <div class="card-body">
                    <div class="card-text text-center">
                      <h6><code class="text-muted">{{ account.secret }}</code></h6>
                      <p class="alert alert-warning text-center p-1">
                        <small>This is the family seed (secret) for your Regular Key. Keep this key safe!</small>
                      </p>
                      <VueQrcode :value="account.secret" :options="{ size: 200, foreground: '#2079F9', background: 'transparent' }"></VueQrcode>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="mt-5">
              Now enter the account address (wallet) in the <b>Ripple Address</b> field in Toast Wallet.
              This is the wallet address of your mnemonic account (wallet). You can receive XRP on this address.
            </p>
            <div class="row">
              <div class="col-0 col-md-2 col-lg-3"></div>
              <div class="col-12 col-md-8 col-lg-6">
                <div class="card border-primary">
                  <div class="card-body">
                    <div class="card-text text-center">
                      <h6><code class="text-muted">{{ mnemonic.account.address }}</code></h6>
                      <VueQrcode :value="mnemonic.account.address" :options="{ size: 200, foreground: '#2079F9', background: 'transparent' }"></VueQrcode>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul class="mt-5">
              <li>You can enter a title for your wallet in the <b>Account Nickname</b> field</li>
              <li>
                Enter a passphrase in the <b>Enter your Passphrase</b> field. You will need this passphrase
                when you want to send a transaction.
              </li>
            </ul>
          </div>
          <div class="col-12" v-if="step === 7">
            <p>
              Nice job! You did it: you can now use both your mnemonic passphrase and your freshly generated
              <b>family seed (secret)</b> to sign XRP transactions. You can now use all available XRP tools 😀
            </p>
            <p>
              If you enjoyed Toast Wallet and this tool, you can buy us a beer 🍺
            </p>
            <div class="row mt-5 mb-5">
              <div class="col-6 text-center">
                <h5>Toast Wallet</h5>
                <small>By <b>StarStone Limited</b></small>
                <div class="text-center">
                  <code class="text-secondary"><small>rToastMYRQh8boeo5Ys1CnPySmt3c9x3Y</small></code>
                  <br />
                  <VueQrcode class="mt-3" value="https://ripple.com//send?to=rToastMYRQh8boeo5Ys1CnPySmt3c9x3Y&dt=100999"></VueQrcode>
                </div>
              </div>
              <div class="col-6 text-center">
                <h5>Toastify Tool</h5>
                <small>By <b>@WietseWind</b></small>
                <div class="text-center">
                  <code class="text-secondary"><small>rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT</small></code>
                  <br />
                  <VueQrcode class="mt-3" value="https://ripple.com//send?to=rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT&dt=100999"></VueQrcode>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <button :disabled="disableNext" :class="{ 'btn-primary': !disableNext, 'btn-secondary': disableNext }" v-if="Object.keys(titles).indexOf((step + 1) + '') > -1 && titles[step].buttons" @click="step++" class="float-right btn d-block btn-lg text-right mt-3">
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
import sign from 'ripple-sign-keypairs'
import bip39 from 'bip39'
import bip32 from 'ripple-bip32'
import BN from 'bn.js'

export default {
  name: 'Application',
  components: {
    VueQrcode
  },
  watch: {
    'toast.code' () {
      this.decodeToastOfflineCode()
    },
    step (step) {
      if (this.mnemonic.account.mnemonic !== this.mnemonic.text + ' / ' + (this.mnemonic.hasPassphrase ? this.mnemonic.passphrase : '')) {
        // Recalculate
        this.mnemonic.accept = false
        this.mnemonic.account.privateKey = ''
        this.mnemonic.account.publicKey = ''
        this.mnemonic.account.address = ''
        if (step === 4) {
          this.$nextTick(() => {
            setTimeout(this.mnemonicToAccount, 250)
          })
        }
      }
    }
  },
  mounted () {
    this.generateAccount()

    window.onoffline = () => { this.online = false }
    window.ononline = () => { this.online = true }
    window['on' + (navigator.onLine ? 'online' : 'offline')]()
    this.local = !document.location.protocol.match(/^http/)

    if (this.devMode) {
      // this.acceptRisks.thatsme = true
      // this.acceptRisks.understand = true
      // this.acceptRisks.keepSecretSafe = true
      // this.step = 7
      // this.account.confirm = this.account.secret

      // this.mnemonic.text = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap'
      // this.mnemonic.accept = true
      // this.mnemonic.account.mnemonic = this.mnemonic.text + ' / '
      // this.mnemonic.account.address = 'r9JynAPy1xUEW2bAYK36fy5dKKNNNKK1Z5'
      // this.mnemonic.account.privateKey = '000762EED5BA4F378FFA60621C6DEF72F4A0A579112ADA5F5D6B2A35EC27E893A5'
      // this.mnemonic.account.publicKey = '0203A564B266EE3F01AADD3A87289DDE215AAC70EF62F9019EE5B14967A370E1A9'

      // this.toast.scanned = true
      // this.toast.code = '3132 5B2B 7413 C'
      // this.decodeToastOfflineCode()
      // this.checkToastCode()
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
        case 3:
          let mnemonicValid = this.mnemonic.text.trim() !== this.formattedMnemonic.words || this.formattedMnemonic.count < 1 || this.formattedMnemonic.words.length < 20
          let passphraseValid = this.mnemonic.hasPassphrase && this.mnemonic.passphrase === ''
          return mnemonicValid || passphraseValid
        case 4:
          return this.mnemonic.account.address === '' || !this.mnemonic.accept
        case 6:
          return false
        default:
          return true
      }
    },
    formattedMnemonic () {
      let words = this.mnemonic.text.trim().toLowerCase().replace(/[^a-z]/g, ' ').replace(/[ ]+/g, ' ')

      return {
        words: words,
        count: words === '' ? 0 : words.split(' ').length
      }
    },
    regularKeyTx () {
      let tx = {
        Flags: 0,
        TransactionType: 'SetRegularKey',
        Account: this.mnemonic.account.address,
        Fee: (this.toast.codeOk.data.fee * 1000000) + '',
        RegularKey: this.account.address,
        Sequence: this.toast.codeOk.data.accID,
        LastLedgerSequence: this.toast.codeOk.data.ledID,
        Memos: [
          {
            Memo: {
              MemoType: Buffer.from('tool', 'utf8').toString('hex').toUpperCase(),
              MemoData: Buffer.from('https://github.com/WietseWind/toastify-ledger', 'utf8').toString('hex').toUpperCase()
            }
          }
        ]
      }

      let signedTx = sign(JSON.stringify(tx), this.mnemonic.account)

      return {
        signedTx: signedTx,
        string: 'ripple:signed-transaction:' + signedTx.signedTransaction
      }
    }
  },
  methods: {
    regularKeySet () {
      this.$swal({
        icon: 'success',
        text: 'Did Toast tell you your transaction was successful?',
        dangerMode: false,
        buttons: {
          cancel: 'No',
          yes: {
            text: 'Yes',
            value: 'yes'
          }
        }
      }).then(value => {
        if (value === 'yes') {
          this.step = 6
          this.toast.scanned = false
          this.toast.code = ''
        } else {
          this.$swal({
            icon: 'warning',
            title: `Please check the message from Toast and act accordingly.`,
            text: `If you don't know how to continue, please contact @WietseWind at Twitter, and please remember to NEVER share your family seed (secret) or mnemonic publicly!`,
            dangerMode: false,
            buttons: {
              cancel: 'Close'
            }
          }).then(value => {})
        }
      })
    },
    hexToBytes (a) {
      return new BN(a, 16).toArray(null, a.length / 2)
    },
    decodeToastOfflineCode () {
      let state = false
      let offlinecode = this.toast.code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
      let accID
      let ledID
      let fee
      if (/^[A-F0-9]+$/m.test(offlinecode)) {
        try {
          let compression = this.hexToBytes(offlinecode.slice(2, 4))
          offlinecode = offlinecode.slice(4)
          let removedZerosLedId = compression & 7
          let removedZerosAccId = compression >> 3
          accID = '0'.repeat(removedZerosAccId) + offlinecode.slice(0, 8 - removedZerosAccId)
          offlinecode = offlinecode.slice(8 - removedZerosAccId)
          ledID = '0'.repeat(removedZerosLedId) + offlinecode.slice(0, 8 - removedZerosLedId)
          offlinecode = offlinecode.slice(8 - removedZerosLedId)
          while (offlinecode.length < 8) offlinecode = '0' + offlinecode
          fee = offlinecode
          offlinecode = accID + ledID + fee
          state = true
        } catch (e) {
          console.log(e.message)
        }
      }
      accID = parseInt('0x' + accID)
      ledID = parseInt('0x' + ledID)
      fee = parseInt('0x' + fee) / 1000000
      this.toast.codeOk.data.accID = accID
      this.toast.codeOk.data.ledID = ledID !== null ? ledID + 1029 + 36225052 : null
      this.toast.codeOk.data.fee = isNaN(fee) ? null : fee
      return state
    },
    checkToastCode () {
      this.toast.codeComplete = false
      this.toast.codeOk.is = false
      this.toast.codeOk.checked = true
      if (this.toast.codeOk.data.fee !== null && this.toast.codeOk.data.fee < 1 && this.toast.codeOk.data.fee > 0 && this.toast.codeOk.data.ledID !== null && this.toast.codeOk.data.ledID > 39000000) {
        this.toast.codeOk.is = true
        this.toast.codeComplete = true
      }
    },
    mnemonicToAccount () {
      let passphrase

      this.mnemonic.accept = false
      this.mnemonic.account.mnemonic = this.mnemonic.text + ' / ' + (this.mnemonic.hasPassphrase ? this.mnemonic.passphrase : '')

      if (this.mnemonic.hasPassphrase && this.mnemonic.passphrase !== '') {
        passphrase = this.mnemonic.passphrase
      }

      if (this.formattedMnemonic.words.length >= 20 && this.formattedMnemonic.words === this.mnemonic.text.trim()) {
        let seed = bip39.mnemonicToSeed(this.formattedMnemonic.words, passphrase)
        let m = bip32.fromSeedBuffer(seed)
        let keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()

        this.mnemonic.account.privateKey = keyPair.privateKey
        this.mnemonic.account.publicKey = keyPair.publicKey
        this.mnemonic.account.address = keypairs.deriveAddress(keyPair.publicKey)

        return true
      }
      return false
    },
    generateAccount () {
      this.account.secret = keypairs.generateSeed({})
      this.account.keypair = keypairs.deriveKeypair(this.account.secret)
      this.account.address = keypairs.deriveAddress(this.account.keypair.publicKey)
    },
    repeat (char, length) {
      let str = ''
      for (let i = 0; i < length; i++) {
        str += char
      }
      return str
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
      mnemonic: {
        text: '',
        hasPassphrase: false,
        passphrase: '',
        accept: false,
        account: {
          privateKey: '',
          publicKey: '',
          address: '',
          mnemonic: ''
        }
      },
      toast: {
        scanned: false,
        code: '',
        codeComplete: false,
        codeOk: {
          is: false,
          checked: false,
          data: {
            accID: null,
            ledID: null,
            fee: null
          }
        },
        signed: false,
        tx: {}
      },
      step: 1,
      titles: {
        1: { buttons: true, menu: 'Intro', title: 'Introduction & warnings', subtitle: 'Why Toastify your ledger?' },
        2: { buttons: true, menu: 'Family seed (secret)', title: 'Your newly generated family seed (secret)', subtitle: 'Write it down, and store it some place safe!' },
        3: { buttons: true, menu: 'Enter mnemonic', title: 'Enter your mnemonic (words)', subtitle: 'Probably a phrase of 24 lower case words.' },
        4: { buttons: true, menu: 'Verify', title: 'Verify your account address', subtitle: 'Your account is derived from your mnemonic. Please check it.' },
        5: { buttons: false, menu: 'Submit using Toast', title: 'Use Toast Wallet to add your Regular Key', subtitle: 'Please open Toast Wallet, and follow the instructions below.' },
        6: { buttons: true, menu: 'Add wallet to Toast', title: 'Woohoo! 🎉', subtitle: 'You just added superpowers to your XRP account (wallet) 😉' },
        7: { buttons: true, menu: 'Done', title: 'You did it!', subtitle: 'Do you feel generous?' }
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
    &.disabled {
      cursor: default;
      &:hover {
        text-decoration: none;
      }
    }
  }
  textarea.mnemonic {
    height: calc(12em - 11vw);
    min-height: 5em;
    resize: none;
  }
  .text-center>.form-check,
  .text-center>.card {
    display: inline-block;
    margin: 0 auto 0 auto;
  }
  .card { height: 100%; }
  .toast-confirmation-code { text-transform: uppercase }
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
