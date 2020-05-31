<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <section id="header-banner" class="header-banner">
        <v-layout row justify-center align-center>
          <v-flex xs12 sm6 md6>
            <h1>Recrea</h1>
            <p>
              La plataforma que facilita la simbiosis industrial.<br />
              ¿Ya estas adentro?
            </p>
            <v-btn color="primary" nuxt to="/register/">
              ¡Quiero inscribirme ya!
            </v-btn>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <img
              alt="Bio badge"
              src="../assets/images/green-1968596_1920.png"
            />
          </v-flex>
        </v-layout>
      </section>
      <section id="who-we-are" class="who-we-are">
        <v-layout row justify-center align-end>
          <v-flex xs12 sm12 md6>
            <img src="../assets/images/530435952.png" alt="Eco Badge" />
          </v-flex>
          <v-flex xs12 sm12 md6>
            <p>
              Actualmente, en las organizaciones agroindustriales se desechan
              residuos que podrían ser aprovechados por otras entidades como
              materia prima para sus procesos productivos. La idea es crear un
              ecosistema que facilite la simbiosis industrial por medio de una
              plataforma muy similar a un Marketplace, que les permita a estas
              organizaciones comerciar dichos residuos; y así ayudar a los
              objetivos globales de desarrollo sostenible con la producción
              responsable en una economía circular.
            </p>
            <v-btn color="primary" nuxt to="/register/">
              ¡Quiero inscribirme ya!
            </v-btn>
          </v-flex>
        </v-layout>
      </section>
      <section id="steps" class="steps">
        <v-layout row justify-center align-top>
          <step title="Registrate" icon="mdi-account-plus-outline">
            Estas a un solo click de unirte, ¡Hazlo ahora!
          </step>
          <step title="¿Que buscas?" icon="mdi-star-outline">
            ¿Que buscas? ó ¿Que tienes para ofrecer?
          </step>
          <step title="Busca" icon="mdi-magnify">
            Busca tus potenciales nuevos socios o aliados
          </step>
          <step title="Contacta" icon="mdi-card-account-mail-outline">
            Haz una llamada ó envia un mensaje
          </step>
          <step title="Cierra tu trato" icon="mdi-draw">
            No hay nada mejor que un buen negocio. ¿Que esperas?
          </step>
          <step title="Repite" icon="mdi-infinity">
            ¡Hazlo una y otra vez! ¡Sera genial!
          </step>
        </v-layout>
        <v-btn color="primary" nuxt to="/register/" class="text-align-center">
          ¡Quiero inscribirme ya!
        </v-btn>
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

<script>
import step from '../components/HomeSteps.vue'
export default {
  components: { step }
}
</script>
