<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show3 ? 'text' : 'password'"
      name="input-10-2"
      label="Contraseña"
      value=""
      class="input-group--focused"
      @click:append="show3 = !show3"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Entrar
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import config from '~/config.js'

Vue.use(VueCookies)

export default {
  data: () => ({
    show3: false,
    valid: true,
    name: '',
    password: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => "The email and password you entered don't match"
    },
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()
      const response = await axios.post(
        `${config.backend.host}:${config.backend.port}/api/user/signin`,
        {
          email: this.email,
          password: this.password
        }
      )
      if (response.data.data[0].status) {
        this.$cookies.set('token', response.data.data[1])
        this.$router.push(`/user/${response.data.data[0]._id}`)
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style></style>
