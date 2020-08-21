<template>
  <nav class="navigation" :class="openedNav ? 'opened' : ''">
    <router-link :to="{ name: 'Home' }">
      <div class="navigation__logo">
        <img
          src="@/assets/images/logo.svg"
          alt="Logo"
          class="navigation__image"
        />
        <span class="navigation__name">Task Manager</span>
      </div>
    </router-link>

    <div class="navigation__hamburger" @click="openedNav = !openedNav">
      <div class="navigation__hamburger-line"></div>
      <div class="navigation__hamburger-line"></div>
      <div class="navigation__hamburger-line"></div>
    </div>
    <div class="navigation__block">
      <ul class="navigation__list" v-if="!user">
        <li class="navigation__list-item">
          <router-link :to="{ name: 'Home' }" class="navigation__link"
            >Home</router-link
          >
        </li>
        <li class="navigation__list-item">
          <router-link :to="{ name: 'Login' }" class="navigation__link"
            >Login</router-link
          >
        </li>
        <li class="navigation__list-item">
          <router-link :to="{ name: 'Register' }" class="navigation__link"
            >Register</router-link
          >
        </li>
      </ul>
      <ul class="navigation__list" v-else>
        <li class="navigation__list-item">
          <router-link :to="{ name: 'Home' }" class="navigation__link"
            >Home</router-link
          >
        </li>
        <li class="navigation__list-item">
          <router-link :to="{ name: 'Dashboard' }" class="navigation__link"
            >Dashboard</router-link
          >
        </li>
        <li class="navigation__list-item" v-if="user.admin">
          <router-link :to="{ name: 'AdminDashboard' }" class="navigation__link"
            >Admin</router-link
          >
        </li>
        <li class="navigation__list-item">
          <router-link :to="{ name: 'Logout' }" class="navigation__link"
            >Logout</router-link
          >
        </li>
      </ul>
      <div class="navigation__close" @click="openedNav = !openedNav">
        <i class="fas fa-times navigation__close-icon"></i>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      openedNav: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  watch: {
    $route() {
      this.openedNav = false;
    }
  }
};
</script>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  background-color: #fff;
  color: #000;
  padding: 0 50px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &__logo {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 35px;
    height: 35px;
  }

  &__name {
    margin-left: 10px;
    color: #3aada1;
  }

  &__hamburger {
    display: none;
    cursor: pointer;

    &:hover {
      .navigation__hamburger-line {
        background-color: #3aada1;
      }
    }
  }

  &__hamburger-line {
    width: 25px;
    height: 2px;
    background: #000;
    margin-bottom: 5px;
    transition: 0.3s background-color ease-in-out;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__block {
    position: relative;
  }

  &__list {
    list-style: none;
  }

  &__list-item {
    display: inline-block;
    margin-right: 25px;
    text-transform: uppercase;
  }

  &__close {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s visibility ease-in-out, 0.3s opacity ease-in-out;

    &:hover {
      .navigation__close-icon {
        color: #3aada1;
      }
    }
  }

  &__close-icon {
    font-size: 24px;
    color: #000;
    transition: 0.3s color ease-in-out;
  }
}

a.navigation__link {
  color: #000;
  transition: 0.3s color ease-in-out, 0.3s font-size ease-in-out;
}

a.router-link-exact-active,
a.navigation__link:hover {
  color: #3aada1;
}

@media (max-width: 767.98px) {
  .navigation {
    &__hamburger {
      display: block;
    }

    &__block {
      position: fixed;
      top: 0;
      right: -65%;
      height: 100vh;
      width: 65%;
      background-color: #fff;
      z-index: 200;
      border-left: 1px solid #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: 0.5s right ease-in-out;
    }

    &__list {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100vh;
      padding: 20px 25px;
    }

    &.opened {
      .navigation__block {
        right: 0;
      }

      .navigation__close {
        visibility: visible;
        opacity: 1;
      }

      .navigation__list-item {
        display: block;
      }

      a.navigation__link {
        font-size: 24px;
      }
    }
  }
}
</style>
