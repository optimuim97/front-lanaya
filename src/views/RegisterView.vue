<script setup>
import { ref, watch } from "vue";
import useRegister from "@/services/Register/register.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

const { signUp, statusCode, error } = useRegister();
const cgi = ref(false);
const router = useRouter();
const formData = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const register = () => {
  //   alert(cgi.value);

  if (!cgi.value) {
    toast.info("Valide les conditions d'utilisations");
    return false;
  }

  signUp(formData.value);
};

watch(statusCode, (newStatus) => {
  switch (newStatus) {
    case 200:
      toast.success("Compte créer avec succès.");
      setTimeout(() => {
        router.push({
          name: "Login",
        });
      }, 1500);
      break;
    case 201:
      toast.success("Utilisateur connecté avec succès.");
      break;
    case 400:
      toast.error("La requête est mal formée.");
      break;
    case 401:
      toast.error("Identifiants incorrects.");
      break;
    case 403:
      toast.error("  Accès refusé.");
      break;
    case 404:
      toast.error("La ressource demandée n'existe pas.");
      break;
    case 422:
      Object.keys(error.value.errors).forEach((field) => {
        error.value.errors[field].forEach((message) => {
          toast.error(message);
        });
      });

      //   console.log({ error: error.value.errors });
      //   toast.error("Un champ mal renseigné.");
      break;
    case 500:
      toast.error("Une erreur interne est survenue.");
      break;
    default:
      console.log(`Erreur inconnue - Code : ${newStatus}`);
  }
});
</script>

<template>
  <div class="wrapper bg__img">
    <!-- ==== registration section start ==== -->
    <section class="registration clear__top">
      <div class="container">
        <div class="registration__area">
          <h4 class="neutral-top">Inscription</h4>
          <p>
            Vous avez déja un compte ?
            <router-link to="/sign-in">Se connecter</router-link>
          </p>
          <form
            @submit.prevent="register"
            method="post"
            name="registration__form"
          >
            <!-- <div class="regi__type">
            <label for="typeSelect">You are?</label>
            <select class="type__select" id="typeSelect">
              <option value="particular">Particular</option>
              <option value="individual">Individual</option>
            </select>
          </div> -->
            <div class="row">
              <!-- <div class="col-sm-6"> -->
              <div class="input input--secondary">
                <label for="firstName">Speudo *</label>
                <input
                  type="text"
                  name="first__name"
                  id="firstName"
                  placeholder="Speudo"
                  required="required"
                  v-model="formData.name"
                />
                <!-- </div> -->
              </div>
              <!-- <div class="col-sm-6">
              <div class="input input--secondary">
                <label for="lastName">Last Name*</label>
                <input
                  type="text"
                  name="last__name"
                  id="lastName"
                  placeholder="Last Name"
                  required="required"
                />
              </div>
            </div> -->
            </div>
            <div class="input input--secondary">
              <label for="registrationMail">Email*</label>
              <input
                name="registration__email"
                id="registrationMail"
                placeholder="Entrer votre e-mail"
                required="required"
                v-model="formData.email"
              />
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="input input--secondary">
                  <label for="regiPass">Mot de passe*</label>
                  <input
                    type="password"
                    name="regi__pass"
                    id="regiPass"
                    placeholder="Mot de passe"
                    required="required"
                    v-model="formData.password"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="input input--secondary">
                  <label for="passCon"> Confirmation*</label>
                  <input
                    type="password"
                    name="pass__con"
                    id="passCon"
                    placeholder="Confirmation"
                    required="required"
                    v-model="formData.password_confirmation"
                  />
                </div>
              </div>
            </div>
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  id="condtion"
                  name="accept__condition"
                  value="agree"
                  v-model="cgi"
                />
                <!-- required -->
                <span class="checkmark"></span>
                J'ai lu et j'accepte les
                <a href="#"> Politique de confidentialité</a>
              </label>
            </div>
            <div class="input__button">
              <button type="submit" class="button button--effect">
                Créer Mon Compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- ==== #registration section end ==== -->
  </div>
</template>
