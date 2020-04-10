const app = new Vue({
  el: '#app',
  data: {
    min: 1,
    max: 255,
    length: 20,
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
    animation: true,
    generatedPassword: '',
    shuffledPassword: '',
    shuffleInterval: 0,
  },
  methods: {
    generatePassword() {
      if (!this.lowercase && !this.uppercase && !this.numbers && !this.symbols) {
        alert('Please select at least one character set!');
        return;
      }

      const options = {
        length: this.length,
        lowercase: this.lowercase,
        uppercase: this.uppercase,
        numbers: this.numbers,
        symbols: this.symbols,
      };

      this.generatedPassword = this.getRandomPassword(options);

      let charIndex = 0;

      if (this.shuffleInterval) {
        clearInterval(this.shuffleInterval);
      }

      this.shuffleInterval = window.setInterval(() => {
        if (charIndex > this.generatedPassword.length) {
          window.clearInterval(this.shuffleInterval)
          this.shuffleInterval = 0;
          return
        }

        const newSuffleValue = [...new Array(this.generatedPassword.length)]
          .map((empty, i) =>
            i < charIndex
              ? this.generatedPassword[i]
              : this.getRandomChar(options),
          )
          .join('')

        this.shuffledPassword = newSuffleValue;

        charIndex++
      }, 30)
    },
    getAlphabet(options) {
      const internalAlphabet = (options.lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '') +
        (options.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
        (options.numbers ? '0123456789' : '') +
        (options.symbols ? '!@#$%&*()_`´{[^~]};:/?<>,.=-+' : '')
      return internalAlphabet
    },
    getRandomChar(options) {
      const alphabet = this.getAlphabet(options)
      return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    },
    getRandomPassword(options) {
      const alphabet = this.getAlphabet(options)
      let result = ''

      for (let i = 0; i < options.length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
      }

      return result
    },
    copyToClipboard() {
      const inputElem = document.createElement('input')
      inputElem.value = this.generatedPassword
      document.body.appendChild(inputElem)

      inputElem.focus()
      inputElem.select()

      document.execCommand('copy')

      document.body.removeChild(inputElem)
    },
  }
})