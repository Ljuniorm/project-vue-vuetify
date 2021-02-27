
<template>
  <v-card>
    <v-toolbar color="secondary" dark>
      <v-row no-gutters>
        {{ title }} Aluno
        <v-spacer></v-spacer>
        <v-icon @click="close">mdi-close</v-icon>
      </v-row>
    </v-toolbar>
    <v-card-text>
      <v-row class="mt-6" no-gutters>
        <v-col>
          <v-text-field
            v-model="user.name"
            label="Nome *"
            color="secondary"
            :rules="[rules.required]"
            filled
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="E-mail *"
            color="secondary"
            :rules="[rules.required, rules.email]"
            filled
          ></v-text-field>
          <v-text-field
            v-model="user.age"
            label="Idade *"
            :rules="[rules.required]"
            color="secondary"
            filled
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            label="Telefone *"
            :rules="[rules.required]"
            color="secondary"
            filled
            v-mask="user.phone.length <= 14 ? maskPhone : maskCellphone"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row class="mt-n8" no-gutters>
        <v-btn @click="close" color="secondary" text>Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          :disabled="!user.name || !user.email || !user.age || !user.phone"
          color="primary"
          @click="save"
          >Salvar</v-btn
        ></v-row
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  props: {
    selectedUser: { type: Object },
    addOrEdit: { type: String },
  },

  directives: {
    mask,
  },
  data() {
    return {
      title: "",
      user: {
        name: "",
        email: "",
        age: "",
        phone: "",
        date: "",
        activated: true,
      },
      maskCellphone: "(##) #####-####",
      maskPhone: "(##) ####-####",
      rules: {
        required: (value) => !!value || "Campo Obrigatório.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
      },
    };
  },

  created() {
    if (this.addOrEdit === "add") this.title = "Cadastrar";
    else {
      this.title = "Editar";
      this.user = { ...this.selectedUser.user };
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },

    save() {
      this.user.date = this.getDate();
      this.close();
      if (this.addOrEdit === "add") this.$emit("save", this.user);
      else
        this.$emit("edit", {
          user: this.user,
          index: this.selectedUser.index,
          oldUser: this.selectedUser.user,
        });
    },

    getDate() {
      const date = new Date(),
        day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate(),
        month =
          date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
        year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>