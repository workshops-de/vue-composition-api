<template>
  <div class="my-user">
    <header class="my-user__header">
      <a :href="user.url">
        <img class="my-user__image" :src="user.avatar_url" />
      </a>
      <div class="my-user__name">{{ name }}</div>
      <div class="my-user__repos-count">
        Repositories: {{ repositoriesCount }}
      </div>
    </header>
    <ul class="my-user__repos">
      <li
        v-for="repo in repos"
        :key="repo.id"
        class="my-user__repo"
        @click="like(repo.id)"
        :class="{ 'my-user__repo--liked': isLikedRepo(repo.id) }"
      >
        <span>{{ repo.name }}</span>
        <span class="my-user__repo-stats">
          <span class="my-user__repo-name">
            {{ repo.stargazers_count }}
          </span>
          <svg
            aria-hidden="true"
            class="my-user__repo-star"
            height="16"
            version="1.1"
            viewBox="0 0 14 16"
            width="14"
          >
            <path
              fill-rule="evenodd"
              d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"
            ></path>
          </svg>
        </span>
      </li>
    </ul>
    <div class="my-user__footer">
      <span
        >You liked <b>{{ likedRepositories.length }}</b> repos</span
      >
      <span v-if="!hasLiked"> (<i>Click to like a repo</i>) </span>
    </div>
  </div>
</template>

<script lang="ts">
import Repository from "@/types/repository";
import User from "@/types/user";
import { defineComponent, PropType, computed, reactive, toRefs } from "vue";

interface ComponentData {
  hasLiked: boolean;
  likedRepositories: Array<number>;
  name: string;
  repositoriesCount: number;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    repos: {
      type: Array as PropType<Array<Repository>>,
      required: true,
    },
  },
  setup(props) {
    const state: ComponentData = reactive({
      hasLiked: false,
      likedRepositories: [],
      name: computed(() => `${props.user.first_name} ${props.user.last_name}`),
      repositoriesCount: computed(
        () => props.user.repos.public + props.user.repos.private
      ),
    });

    function like(id: number) {
      if (!state.likedRepositories.includes(id)) {
        state.hasLiked = true;
        state.likedRepositories.push(id);
      } else {
        const index = state.likedRepositories.indexOf(id);
        if (index > -1) {
          state.likedRepositories.splice(index, 1);
        }
        if (!state.likedRepositories.length) {
          state.hasLiked = false;
        }
      }
    }

    function isLikedRepo(id: number) {
      return state.likedRepositories.includes(id);
    }

    return {
      ...toRefs(state),
      like,
      isLikedRepo,
    };
  },
});
</script>

<style lang="scss">
.my-user {
  min-width: 15em;
  min-height: 20em;
  background-color: #353535;
  overflow: auto;
  margin: 0;
  max-height: 33em;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);

  &__header {
    align-items: center;
    padding: 10px 0px 10px 0px;
    justify-content: center;
  }

  &__image {
    width: 5em;
    height: 5em;
    border-radius: 100px;

    &:hover {
      transition: 0.3s;
      transform: translateY(-3px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
      transition-timing-function: ease-in;
    }
  }

  &__name,
  &__repos-count {
    padding: 10px 0px 0px;
    color: white;
    color: #42b983;
  }

  &__repos {
    background-color: #232323;
    margin: 0;
    padding: 15px;
  }

  &__repo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    text-align: left;
    padding: 7px 10px;
    border-bottom: 1px solid #42b983;
    color: #e0e0e0;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &--liked {
      .my-user__repo-star {
        fill: red;
      }
    }
  }

  &__repo-star {
    fill: white;
    vertical-align: top;
    margin-top: 1px;
  }

  &__footer {
    color: #aaa;
    padding-top: 25px;
    padding-bottom: 10px;
  }
}
</style>
