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
      url:"http://123.207.32.32:8000/home/multidata"
    }).then(res=>{
      this.data=res
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
