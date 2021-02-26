<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-col cols="3">
        <v-text-field
          dense
          label="Buscar por nomes ou emails"
          solo
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <b class="mt-5">Filtros:</b>
      <v-col cols="3">
        <v-select
          dense
          label="Todos"
          no-data-text="Nenhum Usuário"
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary"
          ><v-icon class="mr-2">mdi-account-plus</v-icon><span>Novo Aluno</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>