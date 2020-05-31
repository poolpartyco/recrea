<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <footer>
      <p>&copy; Copyright 2020 - Pool Party Co. Team</p>
    </footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home-circle-outline',
          title: 'Recrea',
          to: '/'
        },
        {
          icon: 'mdi-account-check-outline',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus-outline',
          title: 'Register',
          to: '/register'
        },
        {
          icon: 'mdi-cart-outline',
          title: 'Products',
          to: '/products'
        }
      ],
      miniVariant: true,
      title: 'Recrea'
    }
  }
}
</script>

<style lang="scss">
.v-list {
  .v-list-item {
    .v-icon:before {
      color: $color-5;
    }
    &:hover {
      .v-icon:before {
        color: $color-2;
      }
    }
    &--active {
      .v-icon:before {
        color: $color-1;
      }
    }
  }
}
footer {
  border: 1px solid $color-2;
  color: $color-4;
  text-align: center;
  padding: 2rem 0;
  p {
    margin: 0 !important;
  }
}
</style>
