<template>
  <div class="hello">
      {{data}}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data () {
    return {
      data:""
    }
  },
  created() {
    axios({
      url:"http://localhost:3000/song/url?id=29723022"
    }).then(res=>{
      this.data=res.data
    })

    axios.get({
      url:"http://localhost:3000/song/url?id=29723022"
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
