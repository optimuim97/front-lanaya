<script setup>
import Navbar from "@/components/_partials/TopMenuComponent.vue";
import Footer from "@/components/_partials/FooterComponent.vue";
</script>

<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
