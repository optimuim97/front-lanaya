<script setup>
import useLogin from "@/services/Login/login.js";
import { ref, watch } from "vue";
import { /*useRoute,*/useRouter } from 'vue-router';
import { toast } from "vue3-toastify";

const { signIn, statusCode, /*error */} = useLogin();
const formData = ref({
  email: "",
  password: "",
});
const router = useRouter();

const login = () => {
  signIn(formData.value);
};

watch(statusCode, (newStatus) => {
  switch (newStatus) {
    case 200:
      toast.success("Connexion éffectué.");
      setTimeout(() => {
        router.push({
          name: "Dashboard",
        });
      }, 1500);
      break;
    case 201:
      toast.success("Utilisateur connecté avec succès.");
      break;
    case 400:
      toast.error("La requête est mal formée.");
      statusCode.value = null;
      break;
    case 401:
      toast.error("Identifiants incorrects.");
      statusCode.value = null;
      break;
    case 403:
      toast.error("  Accès refusé.");
      statusCode.value = null;
      break;
    case 404:
      toast.error("La ressource demandée n'existe pas.");
      statusCode.value = null;
      break;
    case 422:
      // Object.keys(error.value.errors).forEach((field) => {
      //   error.value.errors[field].forEach((message) => {
      //     toast.error(message);
      //   });
      // });

      toast.info('Email ou mot de passe invalide');
      statusCode.value = null;
      break;
    case 500:
      toast.error("Une erreur interne est survenue.");
      statusCode.value = null;
      break;
    default:
      console.log(`Erreur inconnue - Code : ${newStatus}`);
  }
});
</script>

<template>
  <div
    class="wrapper bg__img"
    data-background="./assets/images/registration-bg.png"
  >
 
    <!-- ==== registration section start ==== -->
    <section class="registration clear__top">
      <div class="container">
        <div class="registration__area">
          <h4 class="neutral-top">Se connecter</h4>
          <p>
            Vous n'avez pas de Compte ?
            <router-link to="/sign-up">S'inscrire ici.</router-link>
          </p>
          <form
            @submit.prevent="login"
            method="post"
            name="login__form"
            class="form__login"
          >
            <div class="input input--secondary">
              <label for="loginMail">Email*</label>
              <input
                type="email"
                name="login__email"
                id="loginMail"
                placeholder="Entrer votre e-mail"
                required="required"
                v-model="formData.email"
              />
            </div>
            <div class="input input--secondary">
              <label for="loginPass">Mot de passe*</label>
              <input
                type="password"
                name="login__pass"
                id="loginPass"
                placeholder="Votre mot de passe"
                required="required"
                v-model="formData.password"
              />
            </div>
            <div class="checkbox login__checkbox">
              <label>
                <input
                  type="checkbox"
                  id="remeberPass"
                  name="remeber__pass"
                  value="remember"
                />
                <span class="checkmark"></span>
                Se souvenir de moi
              </label>
              <a href="javascript:void(0)">Mot de passe oublié</a>
            </div>
            <div class="input__button">
              <button type="submit" class="button button--effect">
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- ==== #registration section end ==== -->

    <!-- Scroll To Top -->
    <a href="javascript:void(0)" class="scrollToTop">
      <i class="fa-solid fa-angles-up"></i>
    </a>
  </div>
</template>
