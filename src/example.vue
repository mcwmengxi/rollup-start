<template>
  <div class="example">{{ message }}</div>
</template>

<script>
export default {
    name: "example",
    data () {
        return {
            message: 'Hello world!'
        }
    }
}
</script>

<style>
.example {
  color: red;
}
</style>