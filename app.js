var app = new Vue({
  el: '#app',
  data: {
    text: '',
    monotext: ''
  },
  watch: {
    text(newValue) {
      this.monotext = mono(newValue);
    }
}  
})

function mono(text) {

  function special(c) {
    const chars = {
      ' ': String.fromCodePoint(0x2000),
      '-': String.fromCodePoint(0x2013)
    }
    return chars[c] || c;
  }

  function char(c) {
    const charOffset = 0x1d670;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return chars.includes(c) ? String.fromCodePoint(chars.indexOf(c) + charOffset) : c;
  }

  function num(c) {
    const numOffset = 0x1d7f6;
    const numbers = '0123456789';
    return numbers.includes(c) ? String.fromCodePoint(numbers.indexOf(c) + numOffset) : c;
  }

  return Array
    .from(text)
    .map(c => special(c))
    .map(c => char(c))
    .map(c => num(c))
    .map(c => c)
    .join('');

}
