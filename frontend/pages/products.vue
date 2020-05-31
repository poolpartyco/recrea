<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md3>
      <section id="header-banner" class="header-banner">
        <v-layout row justify-center align-top>
          <v-flex
            v-for="(product, index) in products"
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

<script>
import Product from '~/components/Product.vue'

export default {
  components: {
    Product
  },
  data() {
    return {
      products: {}
    }
  },
  async mounted() {}
}
</script>

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
    color: $color-1;
    font-size: 7rem;
  }
  p {
    font-size: 1.5rem;
  }
  img {
    display: block;
    margin: auto;
    max-width: 80%;
  }
}
section.who-we-are {
  img {
    display: block;
    margin: auto;
  }
}
section.steps {
  text-align: center;
}
.text-align-center {
  text-align: center;
}
</style>
