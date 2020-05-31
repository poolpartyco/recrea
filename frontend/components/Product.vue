<template>
  <v-card class="product mx-auto">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    >
      <v-chip class="ma-2" color="pink" label text-color="white">
        <v-icon left>mdi-label</v-icon>
        {{ type ? 'Ofertado' : 'Buscado' }}
      </v-chip>
    </v-img>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-text>
      <p class="product-quantity">
        <span>Cantidad: </span>
        <span>{{ quantity }}</span>
      </p>
      <p class="product-price">
        <span>Precio: </span>
        <span>{{ metricPrice }}</span>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn class="product-company" text :to="'/user/' + publisher._id">
        {{ publisher.company }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ description }}
        </v-card-text>
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
      default: 0,
      type: Number
    },
    quantity: {
      default: 0,
      type: Number
    },
    publisher: {
      default() {
        return {
          company: '',
          _id: ''
        }
      },
      type: Object
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

<style lang="scss">
.product {
  max-width: 90%;
  margin: auto;
  .v-card__title {
    color: $color-2;
  }
  > .v-card__text {
    margin-bottom: 0;
    padding-bottom: 0;
    p {
      margin: 0;
      span {
        &:first-of-type {
          color: $color-2;
          font-weight: bold;
        }
      }
    }
  }
  > .v-card__actions {
    button .v-btn__content i {
      color: $color-2;
    }
  }
}
</style>
