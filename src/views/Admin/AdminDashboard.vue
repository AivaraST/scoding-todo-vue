<template>
  <div class="container wrapper">
    <div class="acp">
      <div class="acp__block">
        <div class="acp__inner">
          <h1 class="acp__title">Users</h1>
          <router-link
            :to="{ name: 'AdminUserAdd' }"
            class="acp__link acp__link--dark"
          >
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
                      class="acp__action"
                    >
                      <i class="fas fa-user-edit acp__icon"></i>
                    </router-link>
                    <button
                      class="acp__action"
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
          <router-link
            v-if="selectedId"
            :to="{ name: 'AdminTaskAdd', params: { id: selectedId } }"
            class="acp__link acp__link--dark"
          >
            Add task
          </router-link>
          <TasksContainer v-if="tasks.length">
            <TasksSectionSide label="assigned">
              <TasksItemSide
                v-for="task in tasksAssigned"
                :key="task.id"
                :task="task"
                @deleteTask="deleteTask"
                @changeStatus="updateTaskStatus"
              ></TasksItemSide>
            </TasksSectionSide>
            <TasksSectionSide label="inprogress">
              <TasksItemSide
                v-for="task in tasksInprogress"
                :key="task.id"
                :task="task"
                @deleteTask="deleteTask"
                @changeStatus="updateTaskStatus"
              ></TasksItemSide>
            </TasksSectionSide>
            <TasksSectionSide label="done">
              <TasksItemSide
                v-for="task in tasksDone"
                :key="task.id"
                :task="task"
                @deleteTask="deleteTask"
                @changeStatus="updateTaskStatus"
              ></TasksItemSide>
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
import TasksItemSide from "@/components/Tasks/TasksItemSide.vue";

export default {
  components: {
    TasksContainer,
    TasksSectionSide,
    TasksItemSide
  },
  data() {
    return {
      users: [],
      tasks: [],
      selectedId: null
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
      this.selectedId = id;
    },
    async deleteUser(id) {
      const index = this.users.findIndex(user => user.id == id);
      this.users.splice(index, 1);
      await axios.delete(`admin/users/${id}`);
    },
    async updateTaskStatus(id, status) {
      const index = this.tasks.findIndex(task => task.id == id);
      this.tasks[index].status = status;
      await axios.put(`admin/tasks/${id}`, { status });
    },
    async deleteTask(id) {
      const index = this.tasks.findIndex(task => task.id == id);
      this.tasks.splice(index, 1);
      await axios.delete(`admin/tasks/${id}`, { status });
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
    font-size: 14px;
    max-width: 200px;
  }
  &__action {
    outline: none;
    border: none;
    padding: 5px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
  }

  &__icon {
    color: #000;
    font-size: 16px;
  }

  &__link {
    display: inline-block;
    width: auto;
    text-align: center;
    outline: none;
    text-transform: uppercase;
    border-radius: 8px;
    border: 1px solid #fff;
    padding: 15px 15px;
    text-decoration: none;
    color: #fff;
    transition: 0.3s background-color ease-in-out, 0.3s color ease-in-out;
    cursor: pointer;
    font-size: 12px;

    &--dark {
      background-color: #515661;

      &:hover {
        background-color: #353b48;
      }
    }
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
