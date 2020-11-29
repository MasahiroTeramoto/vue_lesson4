<template>
  <div>
    <h3 class="title">ログイン画面</h3>

    <div class="columns">
      <div class="column is-4"></div>
      <div class="column">
        <section class="section" id="form">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">メールアドレス</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    id="email"
                    name="email"
                    v-model="email"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">パスワード</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input
                    class="input"
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="buttons is-centered">
      <a class="button is-info is-outlined" @click="login">ログイン</a><br />
    </div>
    <div>
      <router-link to="/register">新規登録はこちら</router-link>
    </div>
  </div>
</template>

<script>
import auth from '../plugin/auth.js';
import router from '../router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      auth
        .login(this.email, this.password)
        .then(() => router.push('/dashboard'))
        .catch((error) => console.log(error));
      this.email = '';
      this.password = '';
    },
  },
};
</script>
