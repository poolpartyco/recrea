<template>
  <v-form>
    <div class="display-1">
      Agregar producto
    </div>
    <v-text-field v-model="name" class="mt-5" label="Nombre"></v-text-field>
    <v-container fluid>
      <v-textarea
        v-model="description"
        autocomplete="Descripción"
        label="Descripción"
      ></v-textarea>
    </v-container>
    <v-col cols="8">
      <v-text-field
        v-model="metricPrice"
        label="Precio"
        value="10.00"
        prefix="$"
      ></v-text-field>
    </v-col>
    <v-text-field
      v-model="quantity"
      class="mx-4"
      label="Cantidad"
      max="50"
      min="1"
      step="1"
      style="width: 500px"
      type="number"
    ></v-text-field>
    <v-text-field v-model="metric" class="mt-5" label="Unidades"></v-text-field>
    <v-text-field v-model="image" class="mt-5" label="Imagen"></v-text-field>
    <v-btn color="success" class="md-4" @click="validate">
      Agregar
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import config from '~/config.js'

export default {
  data: () => ({
    name: '',
    description: '',
    metricPrice: '',
    image: '',
    quantity: '',
    metric: '',
    tags: ''
  }),

  methods: {
    async validate() {
      const response = await axios.post(
        `${config.backend.host}:${config.backend.port}/apisec/product/create`,
        {
          name: this.name,
          description: this.description,
          metricPrice: this.metricPrice,
          image: this.image,
          quantity: this.quantity,
          metric: this.metric,
          tags: this.tags
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQzYjE3OTAzNjQ1ZTAwMTFkNzI0ZjciLCJpYXQiOjE1OTA5MzE4MzN9.RQsxzhwOiYp6gs67dXHVYbUgHpnalOS1OqzGmW-ltBA'
          }
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
