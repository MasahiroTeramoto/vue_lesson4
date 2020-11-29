<template>
  <div>
    <p>user:{{ name }} balance:{{ balance }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      balance: '',
    };
  },
};
</script>
