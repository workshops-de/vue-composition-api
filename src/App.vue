<template>
  <MyUser :user="user" :repos="repos" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyUser from "./components/MyUser.vue";
import Repository from "./types/repository";
import User from "./types/user";

interface ComponentData {
  user: User;
  repos: Array<Repository>;
}

export default defineComponent({
  name: "App",
  components: {
    MyUser,
  },
  data(): ComponentData {
    return {
      user: {
        id: 499550,
        avatar_url: "https://avatars1.githubusercontent.com/u/499550?v=4",
        url: "https://github.com/yyx990803",
        first_name: "Evan",
        last_name: "You",
        repos: {
          public: 132,
          private: 39,
        },
      },
      repos: [
        {
          id: 12141455,
          name: "angular.js",
          stargazers_count: 5,
          watchers_count: 5,
        },
        {
          id: 50439726,
          name: "awesome",
          stargazers_count: 10,
          watchers_count: 10,
        },
        {
          id: 61344888,
          name: "babel",
          stargazers_count: 10,
          watchers_count: 10,
        },
        {
          id: 98185767,
          name: "babel-loader",
          stargazers_count: 4,
          watchers_count: 4,
        },
        {
          id: 62820601,
          name: "benchmark",
          stargazers_count: 3,
          watchers_count: 3,
        },
        {
          id: 13938919,
          name: "casperjs",
          stargazers_count: 2,
          watchers_count: 2,
        },
      ],
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
