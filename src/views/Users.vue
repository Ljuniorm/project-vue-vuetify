<template>
  <v-container>
    <v-row class="mt-12">
      <v-col cols="4">
        <v-text-field
          dense
          label="Busque por nomes ou emails"
          solo
          v-model="filterName"
          append-icon="mdi-magnify"
          @input="inputFilter"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <h4 class="mt-5">Filtros:</h4>
      <v-col align="end" cols="3">
        <v-select
          dense
          v-model="filter"
          label="Todos"
          no-data-text="Nenhum Usuário"
          solo
          :items="filters"
          @change="changeFilter"
        ></v-select>
      </v-col>
      <v-col align="end" cols="1">
        <v-btn @click="openDialogAdd" color="primary"
          ><v-icon class="mr-2">mdi-account-plus</v-icon><span>Novo Aluno</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-row class="mt-12" v-if="!users.length" justify="center" no-gutters>
        <h3 class="secondary--text">Não há usuários cadastrados</h3>
      </v-row>
      <v-row
        class="mt-12"
        v-if="!filteredList.length && users.length"
        justify="center"
        no-gutters
      >
        <h3 class="secondary--text">
          Não há usuários com os critérios de busca utilizado
        </h3>
      </v-row>
      <v-col v-for="(user, i) in filteredList" :key="i" cols="3">
        <v-card
          :color="!user.activated ? '#C5CAE98a' : ''"
          :elevation="!user.activated ? '0' : ''"
        >
          <v-row justify="center" class="mb-2" no-gutters>
            <v-col class="mt-4" cols="1" align="center">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
            </v-col>
            <v-col class="ml-4" cols="9">
              <v-card-title>
                <b>{{ user.name }}</b>
              </v-card-title>
              <v-card-subtitle class="mt-n6"
                ><span>Última Avaliação:{{ user.date }} </span>
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-divider class="mt-n2"></v-divider>
          <v-row class="" no-gutters>
            <v-col cols="8">
              <v-card-subtitle
                ><span>{{ user.email }} </span>
              </v-card-subtitle>
              <v-card-subtitle class="mt-n8"
                ><span>{{ user.age }} Anos</span> <span>{{ user.phone }}</span>
              </v-card-subtitle>
            </v-col>
            <v-col cols="2" class="mt-4 ml-n3">
              <v-btn
                fab
                small
                elevation="2"
                :color="!user.activated ? '#C5CAE98a' : 'white'"
                @click="openDialogEdit(user, i)"
                ><v-icon color="secondary">mdi-pencil</v-icon></v-btn
              >
            </v-col>
            <v-col cols="2" class="mt-4">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    small
                    elevation="0"
                    :color="!user.activated ? '#C5CAE98a' : 'white'"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="secondary">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list style="cursor: pointer">
                  <v-list-item v-if="user.activated" @click="disable(user)">
                    <v-list-item-title class="brown--text"
                      ><v-icon class="mb-1 mr-2" small color="brown"
                        >mdi-close</v-icon
                      >Desativar</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item v-if="!user.activated" @click="active(user)">
                    <v-list-item-title class="green--text"
                      ><v-icon class="mb-1 mr-2" small color="green"
                        >mdi-check</v-icon
                      >Ativar</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item @click="remove(i)">
                    <v-list-item-title class="red--text"
                      ><v-icon class="mb-1 mr-2" small color="red"
                        >mdi-delete</v-icon
                      >Remover</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogAddEdit" persistent width="600px">
      <UserAddEdit
        v-if="dialogAddEdit"
        :addOrEdit="addOrEdit"
        :selectedUser="selectedUser"
        @close="closeDialog"
        @save="save"
        @edit="edit"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { Storage } from "../localStorage";
import { USERS } from "../localStorage/storageKeys";
import UserAddEdit from "../components/users/UserAddEdit";
export default {
  components: {
    UserAddEdit,
  },
  data() {
    return {
      users: [],
      dialogAddEdit: false,
      selectedUser: null,
      filter: "Nenhum",
      filters: ["Nenhum", "Ativado", "Desativado"],
      filterName: "",
      addOrEdit: "",
      showMessage: false,
    };
  },

  created() {
    this.readUsers();
  },

  computed: {
    filteredList() {
      return this.users.filter((user) => {
        if (this.filter === "Ativado") return user.activated;
        if (this.filter === "Desativado") return !user.activated;
        else
          return (
            user.name.toLowerCase().includes(this.filterName.toLowerCase()) ||
            user.email.toLowerCase().includes(this.filterName.toLowerCase())
          );
      });
    },
  },

  methods: {
    openDialogAdd() {
      this.dialogAddEdit = true;
      this.addOrEdit = "add";
    },

    openDialogEdit(user, index) {
      this.selectedUser = { user: user, index: index };
      this.dialogAddEdit = true;
      this.addOrEdit = "edit";
    },

    closeDialog() {
      this.dialogAddEdit = false;
    },

    changeFilter() {
      this.filterName = "";
    },

    inputFilter() {
      this.filter = "Nenhum";
    },

    async readUsers() {
      const users = await Storage.getItem(USERS);
      if (users) this.users = users;
    },

    async save(user) {
      this.users.push(user);
      await Storage.setItem(USERS, this.users);
    },

    async edit(infos) {
      for (let i = 0; i < this.users.length; i++) {
        if (i === infos.index) this.users[i] = infos.user;
      }
      await Storage.setItem(USERS, this.users);
    },

    async remove(i) {
      this.users.splice(i, 1);
      await Storage.setItem(USERS, this.users);
    },

    async active(user) {
      user.activated = true;
      await Storage.setItem(USERS, this.users);
    },

    async disable(user) {
      user.activated = false;
      await Storage.setItem(USERS, this.users);
    },
  },
};
</script>