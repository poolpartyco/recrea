<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <div>
      <v-chip class="ma-2" color="pink" label text-color="white">
        <v-icon left>mdi-label</v-icon>
        {{ type ? 'Ofertado' : 'Buscado' }}
      </v-chip>
    </div>

    <v-card-quantity>
      {{ `Cantidad: ${quantity}` }}
    </v-card-quantity>

    <div>
      <v-card-metricPrice>
        {{ `Precio: $ ${metricPrice}` }}
      </v-card-metricPrice>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-description>
          {{ description }}
        </v-card-description>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      default: 'title',
      type: String
    },
    description: {
      default: 'description',
      type: String
    },
    metricPrice: {
      default: 'metricPrice',
      type: String
    },
    quantity: {
      default: 'quantity',
      type: String
    },
    type: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    show: false
  })
}
</script>
