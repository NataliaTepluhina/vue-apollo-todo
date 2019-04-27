<template>
  <div id="app">
    <h1>ToDo List</h1>
    <div class="todo-block todo-input">
      <input type="text" v-model="newItem" @keyup.enter="addItem">
      <button @click="addItem" :disabled="!newItem">
        <i class="far fa-plus-square"></i>
      </button>
    </div>
    <div class="todo-block todo-list">
      <ListItem
        v-for="(item, index) in todoItems"
        :key="index"
        :content="item"
        @toggleDone="checkItem(item.id)"
        @delete="deleteItem(item.id)"
      />
    </div>
  </div>
</template>

<script>
import ListItem from "./components/ListItem.vue";
import {
  todoItemsQuery,
  checkItemMutation,
  addItemMutation,
  deleteItemMutation
} from "./graphql/queries.js";

export default {
  name: "app",
  components: {
    ListItem
  },
  data() {
    return {
      newItem: "",
      todoItems: []
    };
  },
  apollo: {
    todoItems: {
      query: todoItemsQuery
    }
  },
  methods: {
    addItem() {
      if (this.newItem) {
        this.$apollo.mutate({
          mutation: addItemMutation,
          variables: { text: this.newItem }
        });
        this.newItem = "";
      }
    },
    checkItem(id) {
      this.$apollo.mutate({
        mutation: checkItemMutation,
        variables: { id }
      });
    },
    deleteItem(id) {
      this.$apollo.mutate({
        mutation: deleteItemMutation,
        variables: { id }
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.todo-block {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 24px;
}

.todo-input {
  align-items: center;
}

.todo-list {
  flex-direction: column;
}

input {
  width: 100%;
  height: 30px;
  font-size: 22px;
}

button {
  border: none;
  font-size: 40px;
  outline: none;
}
</style>
