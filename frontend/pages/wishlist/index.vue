<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md3>
      <section class="section-header">
        <h1>Productos</h1>
        <p>
          Mira los productos que los demás usuarios de la comunidad estan
          buscando. ¿Será que tu lo tienes?
        </p>
      </section>
      <section id="products-list" class="products-list">
        <v-layout row justify-center align-top>
          <v-flex
            v-for="(product, index) in products"
            :key="index"
            xs12
            sm6
            md4
          >
            <product
              v-bind="product"
              :type="false"
              :name="product.productName"
              :metric-price="product.desiredPrice"
              :publisher="{ company: product.company, _id: product.userId }"
            />
          </v-flex>
        </v-layout>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import config from '~/config.js'
import Product from '~/components/Product.vue'

export default {
  components: {
    Product
  },
  data() {
    return {
      products: [],
      items: 0
    }
  },
  async mounted() {
    const response = await axios
      .get(`${config.backend.host}:${config.backend.port}/api/wishlist`)
      .then((res) => {
        this.products = res.data.data
        this.items = res.data.data.total
      })
    return response
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
