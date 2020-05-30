<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-quantity>
      {{ `Cantidad: ${quantity}` }}
    </v-card-quantity>

    <div>
      <v-card-metricPrice>
        {{ `Precio: $ ${metricPrice}` }}
      </v-card-metricPrice>
    </div>

    <v-card-actions>
      <v-btn text>Agregar</v-btn>

      <v-btn color="purple" text>
        Eliminar
      </v-btn>

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
    }
  },
  data: () => ({
    show: false
  })
}
</script>
