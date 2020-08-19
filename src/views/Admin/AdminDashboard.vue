<template>
  <div class="container wrapper">
    <div class="acp">
      <div class="acp__block">
        <div class="acp__inner">
          <h1 class="acp__title">Users</h1>
          <router-link :to="{ name: 'AdminUserAdd' }" class="acp__link">
            Add
          </router-link>

          <div class="acp__content">
            <ul class="acp__list">
              <li
                class="acp__list-item"
                v-for="user in users"
                :key="user.id"
                @click="fetchUserTasks(user.id)"
              >
                <div class="acp__single">
                  <div class="acp__data">{{ user.name }}</div>
                  <div class="acp__manage">
                    <router-link
                      :to="{ name: 'AdminUserEdit', params: { id: user.id } }"
                      class="acp__action acp__action--edit"
                    >
                      <i class="fas fa-user-edit acp__icon"></i>
                    </router-link>
                    <button
                      class="acp__action acp__action--delete"
                      @click.prevent="deleteUser(user.id)"
                    >
                      <i class="fas fa-user-minus acp__icon"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="acp__block">
        <div class="acp__inner">
          <h1 class="acp__title">User tasks</h1>
          <!-- <FormButton color="dark">Add new task</FormButton> -->

          <TasksContainer v-if="tasks.length">
            <TasksSectionSide label="assigned">
              <TasksItem
                v-for="task in tasksAssigned"
                :key="task.id"
                :task="task"
                @changeStatus="updateTaskStatus"
              ></TasksItem>
            </TasksSectionSide>
            <TasksSectionSide label="inprogress">
              <TasksItem
                v-for="task in tasksInprogress"
                :key="task.id"
                :task="task"
                @changeStatus="updateTaskStatus"
              ></TasksItem>
            </TasksSectionSide>
            <TasksSectionSide label="done">
              <TasksItem
                v-for="task in tasksDone"
                :key="task.id"
                :task="task"
                @changeStatus="updateTaskStatus"
              ></TasksItem>
            </TasksSectionSide>
          </TasksContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TasksContainer from "@/components/Tasks/TasksContainer.vue";
import TasksSectionSide from "@/components/Tasks/TasksSectionSide.vue";
import TasksItem from "@/components/Tasks/TasksItem.vue";

export default {
  components: {
    TasksContainer,
    TasksSectionSide,
    TasksItem
  },
  data() {
    return {
      users: [],
      tasks: []
    };
  },
  methods: {
    async fetchUsers() {
      const response = await axios.get("admin/users");
      this.users = response.data;
    },
    async fetchUserTasks(id) {
      const response = await axios.get(`admin/user/${id}/tasks`);
      this.tasks = response.data;
    },
    async deleteUser(id) {
      const index = this.users.findIndex(user => user.id == id);
      this.users.splice(index, 1);
      await axios.delete(`admin/users/${id}`);
    },
    async updateTaskStatus(id, status) {
      const index = this.tasks.findIndex(task => task.id == id);
      this.tasks.splice(index, 1);
      await axios.put(`admin/tasks/${id}`, { status });
    }
  },
  computed: {
    tasksAssigned: function() {
      return this.tasks.filter(task => task.status === "assigned");
    },
    tasksInprogress: function() {
      return this.tasks.filter(task => task.status === "inprogress");
    },
    tasksDone: function() {
      return this.tasks.filter(task => task.status === "done");
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style lang="scss">
.acp {
  display: flex;
  flex-wrap: wrap;
  &__block {
    width: 50%;
    padding: 0 10px;
  }
  &__inner {
    background-color: #fff;
    padding: 20px;
  }
  &__title {
    color: #3aada1;
    margin-bottom: 5px;
  }
  &__content {
    padding: 20px 0;
  }

  &__list {
    list-style: none;
  }

  &__list-item {
    padding: 10px 0;
    cursor: pointer;
    background-color: #fff;
    transition: 0.3s background-color ease-in-out;
    padding: 20px;
    &:hover {
      background-color: #f0f4f3;
    }
  }

  &__single {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &__data {
    max-width: 200px;
  }
  &__action {
    outline: none;
    border: none;
    padding: 5px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;

    &--edit {
      background-color: #27ae60;
    }

    &--delete {
      background-color: #e74c3c;
    }
  }

  &__icon {
    color: #fff;
    font-size: 20px;
  }
}

@media (max-width: 767.98px) {
  .acp {
    &__block {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>