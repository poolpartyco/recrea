<template>
  <v-form>
    <div class="display-1">
      Agregar producto
    </div>
    <v-text-field class="mt-5" label="Nombre"></v-text-field>
    <v-container fluid>
      <v-textarea autocomplete="Descripción" label="Descripción"></v-textarea>
    </v-container>
    <v-col cols="8">
      <v-text-field label="Precio" value="10.00" prefix="$"></v-text-field>
    </v-col>
    <v-text-field
      v-model="rows"
      class="mx-4"
      label="Cantidad"
      max="50"
      min="1"
      step="1"
      style="width: 500px"
      type="number"
    ></v-text-field>
    <v-text-field class="mt-5" label="Unidades"></v-text-field>
    <v-file-input
      v-model="files"
      color="deep-purple accent-4"
      counter
      label="Adjuntar imagen"
      multiple
      placeholder="Selecciona la imagen"
      prepend-icon="mdi-paperclip"
      outlined
      :show-size="1000"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
          {{ text }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </v-file-input>
    <v-btn color="success" class="md-4">
      Agregar
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    files: []
  })
}
</script>
