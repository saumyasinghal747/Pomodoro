
<script>

export default {
  name: 'vTitle',
  props: ['title', 'suffix'],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title + ' - ' + this.suffix;
      }
    },
    suffix: {
      immediate: true,
      handler() {
        document.title = this.title + ' - ' + this.suffix;
      }
    }
},
  render () {
},
}

</script>

