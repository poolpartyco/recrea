<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="80"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      :counter="80"
      :rules="nameRules"
      label="Apellido"
      required
    ></v-text-field>

    <v-text-field
      v-model="nick"
      :counter="80"
      :rules="nameRules"
      label="Nombre de usuario"
      required
    ></v-text-field>

    <v-text-field
      v-model="phoneNumber"
      label="Teléfono"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field v-model="company" label="Compañia" required></v-text-field>

    <v-text-field v-model="password" label="Contraseña" required></v-text-field>

    <v-text-field
      v-model="repeatPassword"
      label="Repite tu contraseña"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Registrarse
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import config from '~/config.js'

export default {
  data: () => ({
    valid: true,
    name: '',
    lastName: '',
    nick: '',
    company: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    checkbox: false
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()
      const response = await axios.post(
        `${config.backend.host}:${config.backend.port}/api/user/signup`,
        {
          nickname: this.nick,
          firstName: this.name,
          lastName: this.lastName,
          email: this.email,
          phone: this.phoneNumber,
          company: this.company,
          password: this.password
        }
      )
      if (response.data.status) {
        this.reset()
        this.resetValidation()
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
