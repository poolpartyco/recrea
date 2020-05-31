<template>
  <v-card class="product mx-auto">
    <a :href="'/user/' + publisher._id">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      >
        <v-chip v-if="type" class="ma-2" color="green" label text-color="white">
          <v-icon left>mdi-star</v-icon> Ofertado
        </v-chip>
        <v-chip v-else class="ma-2" color="orange" label text-color="white">
          <v-icon left>mdi-magnify</v-icon> Buscado
        </v-chip>
      </v-img>
    </a>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-text>
      <p class="product-quantity">
        <span>Cantidad: </span>
        <span>{{ quantity }} {{ metric }}</span>
      </p>
      <p class="product-price">
        <span>{{ type ? 'Precio' : 'Precio Deseado' }}: </span>
        <span>$ {{ formatNumber(metricPrice) }}</span>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="!onProfile"
        class="product-company"
        text
        :to="'/user/' + publisher._id"
      >
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
    metric: {
      default: '',
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
    },
    onProfile: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number)
    }
  }
}
</script>

<style lang="scss">
.product {
  max-width: 90%;
  margin: 1rem auto;
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
