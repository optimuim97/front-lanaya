<script setup></script>

<template>
  <!-- ==== error section start ==== -->
  <section
    class="error bg__img pos__rel over__hi"
    data-background="./assets/images/error-bg.png"
  >
    <div class="container">
      <div class="error__area">
        <div class="row d-flex align-items-center">
          <div class="col-lg-4">
            <div class="error__content">
              <h1>Oops!</h1>
              <h3>Page introuvable</h3>
              <p class="primary">
                Nous ne parvenons pas à trouver la page que vous recherchez
              </p>
              <router-link to="/" class="button button--effect">
                Accueil <i class="fa-solid fa-arrow-right-long"></i>
              </router-link>
            </div>
          </div>
          <div class="col-lg-8 d-none d-lg-block">
            <div class="error__thumb thumb__ltr">
              <img src="@/assets/images/error.png" alt="Error" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ==== #error section end ==== -->

  <!-- Scroll To Top -->
  <a href="javascript:void(0)" class="scrollToTop">
    <i class="fa-solid fa-angles-up"></i>
  </a>
</template>
