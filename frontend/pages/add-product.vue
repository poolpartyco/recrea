<template>
  <v-form>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md3>
        <section class="section-header">
          <h1>Agregar producto</h1>
        </section>
      </v-flex>
    </v-layout>
    <v-text-field v-model="name" class="mt-5" label="Nombre"></v-text-field>
    <v-textarea
      v-model="description"
      class="mx-auto"
      autocomplete="Descripción"
      label="Descripción"
    ></v-textarea>
    <v-text-field
      v-model="metricPrice"
      class="mx-auto"
      label="Precio"
      value="10.00"
      prefix="$"
    ></v-text-field>
    <v-text-field
      v-model="quantity"
      class="mx-1"
      label="Cantidad"
      max="50"
      min="1"
      step="1"
      style="width: 500px"
      type="number"
    ></v-text-field>
    <v-select
      id="metrics"
      v-model="metrics"
      :items="metricsList"
      label="Unidades"
    ></v-select>
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
  data() {
    return {
      name: '',
      description: '',
      metricPrice: '',
      image: '',
      quantity: '',
      metricsList: ['Kilos', 'Gramos'],
      metrics: '',
      tags: ''
    }
  },

  async mounted() {
    const response = await axios
      .get(`${config.backend.host}:${config.backend.port}/api/rule/metrics`)
      .then((res) => {
        this.metricsList = res.data.data
      })
    return response
  },

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
          metric: this.metrics,
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

<style lang="scss" scoped>
section {
  margin: 5rem 0;
  &:first-of-type {
    margin-top: 0;
    margin-bottom: 0;
  }
  &.section-header {
    margin: 2rem 0;
    text-align: center;
    h1 {
      color: $color-2;
      font-size: 3rem;
    }
  }
}
.text-align-center {
  text-align: center;
}
</style>
