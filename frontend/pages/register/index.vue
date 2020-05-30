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
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="warning" @click="resetValidation">
      Reset Validation
    </v-btn>
  </v-form>
</template>

<script>
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
    validate() {
      this.$refs.form.validate()
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
