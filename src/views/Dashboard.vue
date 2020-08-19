<template>
  <div class="container wrapper">
    <TasksContainer>
      <TasksSection label="assigned">
        <TasksItem
          v-for="task in tasksAssigned"
          :key="task.id"
          :task="task"
          @changeStatus="setStatus"
        ></TasksItem>
      </TasksSection>
      <TasksSection label="inprogress">
        <TasksItem
          v-for="task in tasksInprogress"
          :key="task.id"
          :task="task"
          @changeStatus="setStatus"
        ></TasksItem>
      </TasksSection>
      <TasksSection label="done">
        <TasksItem
          v-for="task in tasksDone"
          :key="task.id"
          :task="task"
          @changeStatus="setStatus"
        ></TasksItem>
      </TasksSection>
    </TasksContainer>
  </div>
</template>

<script>
import axios from "axios";
import TasksContainer from "@/components/Tasks/TasksContainer.vue";
import TasksSection from "@/components/Tasks/TasksSection.vue";
import TasksItem from "@/components/Tasks/TasksItem.vue";

export default {
  components: {
    TasksContainer,
    TasksSection,
    TasksItem
  },
  data() {
    return {
      tasks: []
    };
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
  methods: {
    async getTasks() {
      const response = await axios.get("dashboard/tasks");
      this.tasks = response.data;
    },
    setStatus(id, status) {
      const index = this.tasks.findIndex(task => task.id == id);

      axios.put(`dashboard/tasks/${id}`, { status });
      this.tasks[index].status = status;
    }
  },
  mounted() {
    this.getTasks();
  }
};
</script>
