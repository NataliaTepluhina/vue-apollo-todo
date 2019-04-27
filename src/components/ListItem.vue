<template>
  <div class="todo-item">
    <input type="text" v-if="isEditing">
    <span v-else :class="{'checked': content.done}">{{content.text}}</span>
    <div class="actions">
      <button @click="$emit('toggleDone')">
        <i class="far fa-check-square" v-if="content.done"></i>
        <i class="far fa-square" v-else></i>
      </button>
      <button @click="$emit('delete')">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false
    };
  }
};
</script>

<style scoped lang="scss">
.checked {
  text-decoration: line-through;
}

button {
  background-color: rgb(229, 245, 253);
  cursor: pointer;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 3px;
  background-color: rgb(229, 245, 253);
}

.fa-check-square {
  color: green;
}

.fa-times {
  color: red;
}
</style>
