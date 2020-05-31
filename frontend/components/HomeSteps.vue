<template>
  <v-flex xs12 sm6 md4 class="step">
    <p class="step-icon">
      <i class="v-icon notranslate mdi" aria-hidden="true" :class="icon"></i>
    </p>
    <h3 class="step-title">{{ title }}</h3>
    <div class="step-description">
      <slot></slot>
    </div>
  </v-flex>
</template>

<style lang="scss" scoped>
.step {
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1.5rem;
  p.step-icon {
    color: $color-1;
    display: block;
    margin-bottom: 0;
    min-height: 7rem;
    position: relative;
    transition: 0.2s ease-in-out;
    i {
      font-size: 3rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    &:before {
      content: '';
      position: absolute;
      width: 7rem;
      height: 7rem;
      left: 0;
      right: 0;
      margin: auto;
      border: 2px solid $color-1;
      border-radius: 50%;
    }
    &:hover {
      color: $color-1;
    }
  }
  h3.step-title {
    color: $color-1;
    font-size: 1.8rem;
  }
  div.step-description {
    font-size: 1rem;
  }
}
</style>

<script>
export default {
  name: 'Step',
  props: {
    title: {
      default: 'Lorem ipsum',
      type: String
    },
    icon: {
      default: 'mdi-account-plus-outline',
      type: String
    }
  },
  metaInfo() {
    return {
      title: this.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}
</script>
