<template>
  <div>
    <p>{{ name }}さんようこそ</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['name']),
  },
};
</script>
