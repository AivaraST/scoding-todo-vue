<template>
  <div class="tasks__content">
    <div
      class="tasks__single"
      :class="taskOpened ? 'tasks__single--opened' : ''"
    >
      <div class="tasks__data">
        <div class="tasks__name" @click="taskOpened = !taskOpened">
          {{ task.name }}
        </div>
        <div class="tasks__description">
          {{ task.description }}
          <div class="tasks__actions">
            <button
              @click.prevent="changeStatus(task.id, 'assigned')"
              v-if="task.status !== 'assigned'"
              class="tasks__button tasks__button--assigned"
            >
              Assigned
            </button>
            <button
              @click.prevent="changeStatus(task.id, 'inprogress')"
              v-if="task.status !== 'inprogress'"
              class="tasks__button tasks__button--inprogress"
            >
              Inprogress
            </button>
            <button
              @click.prevent="changeStatus(task.id, 'done')"
              class="tasks__button tasks__button--done"
              v-if="task.status !== 'done'"
            >
              Done
            </button>
          </div>
          <div class="tasks__admin">
            <router-link
              :to="{ name: 'AdminTaskEdit', params: { id: task.id } }"
              class="tasks__admbtn"
            >
              <i class="far fa-edit tasks_admicon"></i>
            </router-link>
            <button class="tasks__admbtn" @click.prevent="deleteTask(task.id)">
              <i class="far fa-times-circle tasks_admicon"></i>
            </button>
          </div>
        </div>
        <div class="tasks__time">{{ task.created_at }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  props: {
    task: {
      type: Object
    }
  },
  data() {
    return {
      taskOpened: false
    };
  },
  methods: {
    changeStatus(id, status) {
      this.$emit("changeStatus", id, status);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    }
  }
};
</script>

<style lang="scss">
.tasks {
  &__content {
    background-color: #fff;
    padding: 20px 10px;
  }
  &__single {
    display: flex;
    align-items: center;
    padding: 15px;
    transition: 0.3s background-color ease-in-out;
    position: relative;

    &--opened {
      background-color: #f0f4f3;

      .tasks__description {
        max-height: 500px;
        padding: 10px 0;
      }
    }

    &:hover {
      background-color: #f0f4f3;
    }
  }
  &__draggable {
    cursor: grab;
  }
  &__icon {
    color: #3bafa0;
    font-size: 24px;
  }
  &__data {
    padding-left: 20px;
    word-break: break-all;
  }
  &__name {
    color: #3bafa0;
    cursor: pointer;
    font-size: 12px;
  }
  &__description {
    font-size: 14px;
    max-height: 0px;
    overflow: hidden;
    transition: 0.5s max-height ease-in-out, 0.5s padding ease-in-out;
  }
  &__actions {
    display: flex;
    padding: 5px 0;
    // justify-content: center;
  }
  &__button {
    outline: none;
    border: none;
    padding: 10px;
    margin-right: 5px;
    border-radius: 5px;
    color: #fff;
    transition: 0.3s opacity ease-in-out;
    cursor: pointer;

    &--assigned {
      background-color: #ff8189;
    }
    &--inprogress {
      background-color: #fdd37a;
    }
    &--done {
      background-color: #d0ec99;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  &__time {
    color: #757675;
    font-size: 10px;
  }

  &__admin {
    position: absolute;
    top: 10px;
    right: 15px;
    display: flex;
  }

  &__admbtn {
    outline: none;
    border: none;
    background-color: #fff;
    cursor: pointer;
    margin-left: 5px;
    padding: 4px;
    border-radius: 5px;
    color: #000;
  }

  &__admicon {
    font-size: 16px;
    color: #fff;
  }
}
</style>
