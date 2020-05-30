<template>
  <div>
    <div v-for="(product, index) in products" :key="index">
      <product v-bind="product" />
    </div>
  </div>
</template>

<script>
import Product from '~/components/Product.vue'

export default {
  components: {
    Product
  },
  data() {
    return {
      products: [
        {
          tags: ['agro'],
          status: true,
          _id: '5ed2cd1ea125cc4468ed5512',
          name: 'Abono',
          description: 'Desechado en proceso de producción',
          metricPrice: '34.879',
          image: 'buffer',
          quantity: '56',
          metric: 'Kilograms',
          createdAt: '2020-05-30T21:16:14.575Z',
          updatedAt: '2020-05-30T21:16:14.575Z'
        },
        {
          tags: ['agro'],
          status: true,
          _id: '5ed2cd1ea125cc4468ed5512',
          name: 'Asserrín',
          description: 'Desechado en proceso industrial',
          metricPrice: '34.879',
          image: 'buffer',
          quantity: '34',
          metric: 'Kilograms',
          createdAt: '2020-05-30T21:16:14.575Z',
          updatedAt: '2020-05-30T21:16:14.575Z'
        }
      ]
    }
  }
}
</script>
