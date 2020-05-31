<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <section id="header-banner" class="header-banner">
        <v-layout row justify-center align-center>
          <v-flex xs12 sm6 md6>
            <h1>Recrea</h1>
            <h2>{{ user.company }}</h2>
            <div class="company-details">
              <p class="company-details-username">
                Representante: {{ user.firstName }} {{ user.lastName }}
              </p>
              <p class="company-details-phone">Phone: {{ user.phone }}</p>
              <p class="company-details-email">
                <a :href="'mailto:' + user.email">Email: {{ user.email }}</a>
              </p>
            </div>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <img
              alt="Bio badge"
              src="../../../assets/images/green-1968596_1920.png"
            />
          </v-flex>
        </v-layout>
      </section>
      <section id="products-list-available" class="products-list">
        <h3>Productos Disponibles</h3>
        <v-layout row justify-center align-top>
          <v-flex
            v-for="(product, index) in availableProducts"
            :key="index"
            xs12
            sm6
            md4
          >
            <product v-bind="product" />
          </v-flex>
        </v-layout>
      </section>
      <section id="products-list-search" class="products-list">
        <h3>Productos en Busqueda</h3>
        <v-layout row justify-center align-top>
          <v-flex
            v-for="(product, index) in searchingProducts"
            :key="index"
            xs12
            sm6
            md4
          >
            <product v-bind="product" />
          </v-flex>
        </v-layout>
      </section>
    </v-flex>
  </v-layout>
</template>

<style lang="scss" scoped>
section {
  margin: 5rem 0;
  &:first-of-type {
    margin-top: 0;
    margin-bottom: 0;
  }
}
section.header-banner {
  padding: 2rem 0 0;
  h1 {
    color: $color-2;
    font-size: 7rem;
  }
  h2 {
    font-size: 3rem;
    text-transform: uppercase;
    margin: 2rem 0 0;
  }
  p {
    font-size: 1.5rem;
    text-transform: capitalize;
    margin: 0;
  }
  img {
    display: block;
    margin: auto;
    max-width: 80%;
  }
}
section.products-list {
  h3 {
    color: $color-2;
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0 1rem;
  }
}
.text-align-center {
  text-align: center;
}
</style>

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
      id: this.$route.params.id,
      user: [],
      availableProducts: [],
      availableProductsTotal: 0,
      searchingProducts: [],
      searchingProductsTotal: 0
    }
  },
  async mounted() {
    const user = await axios
      .get(
        `${config.backend.host}:${config.backend.port}/api/user/getById/${this.id}`
      )
      .then((res) => {
        this.user = res.data.data
      })
    const availableProducts = await axios
      .get(
        `${config.backend.host}:${config.backend.port}/api/product/byUserId/${this.id}`
      )
      .then((res) => {
        this.availableProducts = res.data.data.result
        this.availableProductsTotal = res.data.data.total
      })
    const searchingProducts = await axios
      .get(
        `${config.backend.host}:${config.backend.port}/api/wishlist/byUserId/${this.id}`
      )
      .then((res) => {
        this.searchingProducts = res.data.data.result
        this.searchingProductsTotal = res.data.data.total
      })
    return { availableProducts, searchingProducts, user }
  }
}
</script>
