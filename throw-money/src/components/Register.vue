<template>
  <div>
    <h3 class="title">新規登録画面</h3>

    <div class="columns">
      <div class="column is-4"></div>
      <div class="column">
        <section class="section" id="form">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">ユーザー名</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    id="name"
                    name="name"
                    v-model="name"
                  />
                </p>
              </div>
            </div>
          </div>
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
      <a class="button is-info is-outlined" @click="signUp">新規登録</a><br />
    </div>
    <div>
      <router-link to="/">ログインはこちら</router-link>
    </div>
  </div>
</template>

<script>
import router from '../router';
import auth from '../plugin/auth.js';
import Users from '../models/users';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      const name = this.name;
      const email = this.email;
      auth
        .signUp(this.email, this.password)
        .then(() => {
          const user = auth.getCurrentUser();
          Users.createUser(user.uid, name, email)
            .then(() => router.push('/dashboard'))
            .catch((err) =>
              console.log(`An error occurred while creating the user: ${err}`)
            );
        })
        .catch((err) =>
          console.log(`An error occurred during user registration: ${err}`)
        );
      this.name = '';
      this.email = '';
      this.password = '';
    },
  },
};
</script>
