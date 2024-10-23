<script setup>
import { defineProps, ref } from "vue";
import AccountComponent from "./Compte/AccountComponent.vue";
import BillingComponent from "./Compte/BillingComponent.vue";
import { toast } from "vue3-toastify";
import useUpdateUserPassword from "@/services/User/updateUserPassword";

const activeTab = ref("general");
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const { updatePassword, oldPassword, newPassword, confirmPassword } =
  useUpdateUserPassword();

const bientot = () => {
  toast.info("Bientôt Disponible");
};
</script>

<template>
  <div class="main__content-dashboard">
    <div class="breadcrumb-dashboard">
      <h5>Compte</h5>
      <div>
        <a href="">Tableau de Bord</a>
        <i class="fa-solid fa-arrow-right-long"></i>
        <a href="javascript:void(0)">Compte</a>
      </div>
    </div>
    <div class="account-info">
      <!-- Tabs buttons -->
      <div class="account-info__btn-wrapper">
        <a
          href="javascript:void(0)"
          :class="[
            'account-info__btn',
            activeTab === 'general' ? 'account-info__btn-active' : '',
            'button button--effect',
          ]"
          @click="activeTab = 'general'"
          >Général</a
        >
        <a
          href="javascript:void(0)"
          :class="[
            'account-info__btn',
            activeTab === 'billing' ? 'account-info__btn-active' : '',
            'button button--effect',
          ]"
          @click="activeTab = 'billing'"
          v-show="false"
          >Paiement</a
        >
        <a
          href="javascript:void(0)"
          :class="[
            'account-info__btn',
            activeTab === 'security' ? 'account-info__btn-active' : '',
            'button button--effect',
          ]"
          @click="activeTab = 'security'"
          >Securité</a
        >
      </div>

      <!-- Content for each tab -->
      <div class="account-content_wrapper">
        <!-- General Tab -->
        <div v-if="activeTab === 'general'" id="general">
          <AccountComponent :user="user"></AccountComponent>
        </div>

        <!-- Billing Tab -->
        <!-- v-show="false" -->
        <div v-if="activeTab === 'billing'" id="billing">
          <!-- Billing content goes here -->
          <BillingComponent></BillingComponent>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" id="security">
          <!-- Security content goes here -->
          <div class="account-content" id="security">
            <div class="two-factor-wrapper">
              <div class="two-factor-content">
                <h6>Modifier le mot de passe</h6>
                <p>
                  L'authentification à deux facteurs (2FA) peut être utilisée
                  pour protéger votre compte.
                </p>
              </div>
              <a @click="bientot" class="button button--effect" role="button"
                >Activer</a
              >
            </div>
            <div class="change__pass">
              <div class="row neutral-row">
                <div class="col-md-6">
                  <div class="change__pass-content column__space">
                    <h5>Changer de mot de passe</h5>
                    <p>
                      Vous pouvez toujours modifier votre mot de passe pour des
                      raisons de sécurité ou réinitialiser votre mot de passe si
                      vous l'avez oublié.
                    </p>
                    <a
                      @click="bientot"
                      class="button button--effect"
                      role="button"
                    >
                      Mot de passe oublié ?</a
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <form @submit.prevent="updatePassword">
                    <div class="input input--secondary">
                      <label for="currentPass">Mot de passe</label>
                      <input
                        type="password"
                        name="current_pass"
                        id="currentPass"
                        placeholder="Mot de passe courant"
                        required="required"
                        v-model="oldPassword"
                      />
                    </div>
                    <div class="input input--secondary">
                      <label for="newPass">Nouveau mot de passe</label>
                      <input
                        v-model="newPassword"
                        type="password"
                        name="new_pass"
                        id="newPass"
                        placeholder="Nouveau mot de passe"
                        required="required"
                      />
                    </div>
                    <div class="input input--secondary">
                      <label for="conNewPass">Confirmer mot de passe </label>
                      <input
                        type="password"
                        name="con_new_pass"
                        id="conNewPass"
                        placeholder="Confirmer mot de passe"
                        required="required"
                        v-model="confirmPassword"
                      />
                    </div>
                    <div>
                      <button type="submit" class="button button--effect">
                        Soumettre
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="account-content-single account-content-single__alt">
              <div class="intro">
                <h5>Additional Security</h5>
                <a href="#">Add Method</a>
              </div>
              <div class="account-content-single__inner">
                <div class="content">
                  <h6>SMS recovery</h6>
                  <p>Number ending with 1234</p>
                </div>
                <div class="content-right">
                  <a href="#" class="button button--effect">Disable SMS</a>
                </div>
              </div>
              <div class="account-content-single__inner">
                <div class="content">
                  <h6>Autheticator App</h6>
                  <p>Google Authenticator</p>
                </div>
                <div class="content-right">
                  <a href="#" class="button button--effect alt">Configure</a>
                </div>
              </div>
              <div class="account-content-single__inner">
                <div class="content">
                  <h6>SSL Certificate</h6>
                  <p>Secure Sockets Layer</p>
                </div>
                <div class="content-right">
                  <a href="#" class="button button--effect alt">Configure</a>
                </div>
              </div>
            </div>
            <div class="account-content-single account-content-single__alt">
              <div class="intro">
                <h5>Your devices</h5>
                <a href="#">Log out on all devices</a>
              </div>
              <div
                class="account-content-single__inner account-content-single__inner-alt"
              >
                <div class="content">
                  <img src="@/assets/images/icons/mobile.png" alt="Mobile" />
                  <div class="content__alt">
                    <h6>Iphone 13 Pro Max</h6>
                    <p>New York City · June 20 at 14:00</p>
                  </div>
                </div>
                <div class="content-right">
                  <a href="login.html" class="button button--effect alt"
                    >Log Out</a
                  >
                </div>
              </div>
              <div
                class="account-content-single__inner account-content-single__inner-alt"
              >
                <div class="content">
                  <img src="@/assets/images/icons/tablet.png" alt="Tablet" />
                  <div class="content__alt">
                    <h6>iPad Pro</h6>
                    <p>New York City · June 20 at 14:00</p>
                  </div>
                </div>
                <div class="content-right">
                  <a href="login.html" class="button button--effect alt"
                    >Log Out</a
                  >
                </div>
              </div>
              <div
                class="account-content-single__inner account-content-single__inner-alt"
              >
                <div class="content">
                  <img src="@/assets/images/icons/desktop.png" alt="Desktop" />
                  <div class="content__alt">
                    <h6>iMac OSX</h6>
                    <p>New York City · June 20 at 14:00</p>
                  </div>
                </div>
                <div class="content-right">
                  <a href="login.html" class="button button--effect alt"
                    >Log Out</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Add styles for active tab button */
</style>
