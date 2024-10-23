<script setup>
import useBusinessSectors from "@/services/BusinessSector/businessSector";
import useCheckAuth from "@/services/checkAuth";
import useProject from "@/services/Project/project";
import useProjectType from "@/services/ProjectType/projectType.js";
import { onBeforeMount, ref } from "vue";
import { useRoute } from 'vue-router';
const { projectType, showProjectType } = useProjectType();

const postedData = ref({
  title: "",
  description: "",
  start_date: "", // Laisser vide pour la saisie de l'utilisateur
  end_date: "", // Laisser vide pour la saisie de l'utilisateur
  status: "new", // Statut par défaut
  budget: 5000, // Valeur par défaut
  customer_id: 1, // Ou récupère-le dynamiquement
  user_id: 1, // Ou récupère-le dynamiquement
  progress: 0, // Ou récupère-le dynamiquement
  cover: null, // Image à télécharger
});

const route = useRoute();
const { user, getUser } = useCheckAuth();
const { postProject } = useProject();
const { businessSectors, /* showBusinessSector,*/ getBusinessSectors } =
  useBusinessSectors();

const createProject = async () => {
  postedData.value.user_id = user.value.id ?? localStorage.getItem("user_id"); //TODO
  console.log({ userid: postedData.value.user_id });

  console.log({ datata: postedData.value });
  // return false;
  await postProject(postedData.value);
};

const currentDate = ref();
const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Mois de 1 à 12
    const dd = String(today.getDate()).padStart(2, "0"); // Jour du mois

    return `${yyyy}-${mm}-${dd}`;
};
currentDate.value = getCurrentDate();

onBeforeMount(async () => {
  await getUser(localStorage.getItem("token"));
  await getBusinessSectors();

  postedData.value.status = "En cours";
  postedData.value.progress = "0 %";

  // console.log({ status___: postedData.status });
  // console.log({ progress___: postedData.progress });

  // console.log(localStorage.getItem("user_id"));
  if (typeof route.params.slug != "undefined") {
      await showProjectType(route.params.slug);
      postedData.value.business_sector_id = projectType.value.business_sector_id;
      postedData.value.title = projectType.value.title;
      postedData.value.description = projectType.value.description;
      postedData.value.start_date = currentDate.value;
      postedData.value.end_date = projectType.value.end_date;
      postedData.value.status = projectType.value.status;
      postedData.value.budget = projectType.value.max_budget;
      postedData.value.customer_id = user?.value.customer?.id; //TODO customer_id
      // console.log({ hello: user.value.customer.id });
      postedData.value.cover = projectType.value.cover; //TODO get Photo Previews
  }
});
</script>

<template>
  <div>
    <!-- ==== banner section start ==== -->
    <section
      class="banner banner__application clear__top bg__img"
      data-background="./assets/images/banner/banner-bg.png"
    >
      <div class="container">
        <div class="banner__area">
          <h1 class="neutral-top">Créer un Projet</h1>
        </div>
      </div>
    </section>
    <!-- ==== #banner section end ==== -->

    <!-- ==== alert newsletter section start ==== -->
    <section class="alert__newsletter alert__newsletter__alt">
      <div class="container">
        <div class="alert__newsletter__area">
          <div class="section__header">
            <h5 class="neutral-top">Remplir un formulaire de candidature</h5>
            <h2>Développez votre activité plus rapidement !</h2>
            <p class="neutral-bottom">
              Obtenir un suivi commercial garanti par un collatéral est beaucoup
              plus facile et plus rapide avec Lananya
            </p>
          </div>
          <form id="projectForm" @submit.prevent="createProject">
            <div class="input input--secondary">
              <label for="alertAltcom">Nom de l'entreprise*</label>
              <input
                type="text"
                v-model="postedData.title"
                id="alertAltcom"
                placeholder="Entrez le nom de votre entreprise"
                required="required"
              />
            </div>
            <div class="input input--secondary">
              <label for="alertAltRegistrationMail"
                >Description de l'activité *</label
              >
              <textarea
                type="email"
                v-model="postedData.description"
                id="alertAltRegistrationMail"
                placeholder=""
                required="required"
              ></textarea>
            </div>

            <div class="regi__type">
              <label>Montant d'argent requis (minimum 5000 XOF) **</label>
              <select
                class="type__select nice-select"
                v-model="postedData.budget"
                id="coutryAltSelect"
                required
              >
                <option value="" disabled>Choisissez un montant</option>
                <!-- Option par défaut -->
                <option value="5000">5000 XOF</option>
                <option value="10000">10000 XOF</option>
                <option value="15000">15000 XOF</option>
                <option value="20000">20000 XOF</option>
                <option value="25000">25000 XOF</option>
              </select>
              <small v-if="postedData.budget < 5000" class="error-text"
                >Le montant minimum requis est de 5000 XOF.</small
              >
              <!-- Message d'erreur -->
            </div>

            <div class="regi__type">
              <label>Secteur d'activité**</label>
              <select
                v-model="postedData.business_sector_id"
                class="type__select nice-select"
                id="businessSectorSelect"
                required
              >
                <option value="" disabled>
                  Selectionner secteur d'activité
                </option>
                <option
                  v-for="item in businessSectors"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.designation }}
                </option>
              </select>
              <small v-if="!postedData.business_sector_id" class="error-text">
                Veuillez sélectionner un secteur d'activité.
              </small>
              <!-- Message d'erreur -->
            </div>

            <div class="input input--secondary">
              <label for="startDate">Date de début*</label>
              <input
                type="date"
                v-model="postedData.start_date"
                id="startDate"
                required="required"
              />
            </div>
            <div class="input input--secondary">
              <label for="endDate">Date de fin*</label>
              <input
                type="date"
                v-model="postedData.end_date"
                id="endDate"
                required="required"
              />
            </div>
            <div class="regi__type">
              <label for="status">Statut*</label>
              <select
                v-model="postedData.status"
                id="status"
                class="type__select nice-select"
              >
                <option value="new">Nouveau</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="on_hold">En attente</option>
              </select>
            </div>

            <div class="input input--secondary" v-show="false">
              <label for="customerId">ID Client*</label>
              <input
                type="number"
                v-model="postedData.customer_id"
                id="customerId"
                required="required"
              />
            </div>

            <div class="input input--secondary" v-show="false">
              <label for="userId">ID Utilisateur*</label>
              <input
                type="number"
                v-model="postedData.user_id"
                id="userId"
                required="required"
              />
            </div>
            <div class="input input--secondary">
              <label for="progress">Avancement (%)</label>
              <input
                type="number"
                v-model="postedData.progress"
                id="progress"
                min="0"
                max="100"
                placeholder="0"
                disabled
              />
            </div>
            <div class="input input--secondary">
              <label for="cover">Image de couverture</label>
              <input type="file" @change="handleFileUpload" id="cover" required/>
            </div>
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-model="acceptedConditions"
                  id="condition"
                  name="accept__condition"
                  value="agree"
                  required="required"
                />
                <span class="checkmark"></span>
                J'ai lu et j'accepte la
                <a href="privacy-policy.html"> Politique de confidentialité</a>
              </label>
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
    <!-- ==== #alert newsletter section end ==== -->

    <!-- ==== investment amount section start ==== -->
    <!-- <section
      class="investment__amount section__space__top bg__img"
      data-background="./assets/images/gd-bg.png"
    >
      <div class="container">
        <div class="investment__amount__area">
          <div class="investment__wrapper">
            <div class="investment__wrapper__inner">
              <h5>Investment Amount (100 €-30991€)</h5>
              <div class="input input--secondary">
                <input
                  type="number"
                  name="invest__amount"
                  id="investAmount"
                  placeholder="5000"
                  required="required"
                />
              </div>
              <div class="radio__group">
                <div>
                  <input
                    type="radio"
                    id="pone"
                    checked
                    class="radio-input"
                    name="radio-group"
                  />
                  <label for="pone" class="radio-label">
                    <span class="radio-border"></span> 13%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ptwo"
                    checked
                    class="radio-input"
                    name="radio-group"
                  />
                  <label for="ptwo" class="radio-label">
                    <span class="radio-border"></span> 13.25%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="pthree"
                    checked
                    class="radio-input"
                    name="radio-group"
                  />
                  <label for="pthree" class="radio-label">
                    <span class="radio-border"></span> 13.5%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="pfour"
                    checked
                    class="radio-input"
                    name="radio-group"
                  />
                  <label for="pfour" class="radio-label">
                    <span class="radio-border"></span> 14%
                  </label>
                </div>
              </div>
            </div>
            <div class="investment__footer">
              <div>
                <p class="secondary">I will earn ( 01 Month )</p>
                <h4 class="neutral-bottom">
                  O.72 <i class="fa-solid fa-euro-sign"></i>
                </h4>
              </div>
              <div>
                <p class="secondary">I will earn ( 12 Month )</p>
                <h4 class="neutral-bottom">
                  11.72 <i class="fa-solid fa-euro-sign"></i>
                </h4>
              </div>
              <div>
                <p class="secondary">I will earn ( 24 Month )</p>
                <h4 class="neutral-bottom">
                  17.72 <i class="fa-solid fa-euro-sign"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="investment__inner__area section__space__top wow fadeInUp">
          <div class="section__header">
            <h5 class="neutral-top">Revest Statistic</h5>
            <h2>Numbers Said More Than Words</h2>
            <p class="neutral-bottom">
              Businesses have been able to easily and quickly raise funds for
              the implementation of real estate projects, business start-ups or
              its development.
            </p>
          </div>
          <div class="row">
            <div class="col-sm-6 col-xl-3">
              <div class="invest__single">
                <h4 class="neutral-top">
                  <span class="counterThree">23875805</span>
                  <i class="fa-solid fa-euro-sign"></i>
                </h4>
                <p class="neutral-bottom">Money lent</p>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="invest__single">
                <h4 class="neutral-top">
                  <span class="counterThree">74660 </span
                  ><i class="fa-solid fa-euro-sign"></i>
                </h4>
                <p class="neutral-bottom">Average loan size</p>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="invest__single">
                <h4 class="neutral-top counterThree">327</h4>
                <p class="neutral-bottom">Funded Loans</p>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="invest__single">
                <h4 class="neutral-top">
                  <span class="counterThree">12</span> Mo.
                </h4>
                <p class="neutral-bottom">Average Loan Term</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ==== #investment amount section end ==== -->
  </div>
</template>

<style>
.nice-select {
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  border-radius: 5px;
  border: solid 1px #e8e8e8;
  box-sizing: border-box;
  clear: both;
  cursor: pointer;
  display: block;
  float: left;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;
  height: 42px;
  line-height: 40px;
  outline: none;
  padding-left: 18px;
  padding-right: 30px;
  position: relative;
  text-align: left !important;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: auto;
}
.nice-select:hover {
  border-color: #dbdbdb;
}
.nice-select:active,
.nice-select.open,
.nice-select:focus {
  border-color: #999;
}
.nice-select:after {
  border-bottom: 2px solid #999;
  border-right: 2px solid #999;
  content: "";
  display: block;
  height: 5px;
  margin-top: -4px;
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  -webkit-transform-origin: 66% 66%;
  -ms-transform-origin: 66% 66%;
  transform-origin: 66% 66%;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  width: 5px;
}
.nice-select.open:after {
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
.nice-select.open .list {
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: scale(1) translateY(0);
  -ms-transform: scale(1) translateY(0);
  transform: scale(1) translateY(0);
}
.nice-select.disabled {
  border-color: #ededed;
  color: #999;
  pointer-events: none;
}
.nice-select.disabled:after {
  border-color: #cccccc;
}
.nice-select.wide {
  width: 100%;
}
.nice-select.wide .list {
  left: 0 !important;
  right: 0 !important;
}
.nice-select.right {
  float: right;
}
.nice-select.right .list {
  left: auto;
  right: 0;
}
.nice-select.small {
  font-size: 12px;
  height: 36px;
  line-height: 34px;
}
.nice-select.small:after {
  height: 4px;
  width: 4px;
}
.nice-select.small .option {
  line-height: 34px;
  min-height: 34px;
}
.nice-select .list {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(68, 68, 68, 0.11);
  box-sizing: border-box;
  margin-top: 4px;
  opacity: 0;
  overflow: hidden;
  padding: 0;
  pointer-events: none;
  position: absolute;
  top: 100%;
  left: 0;
  -webkit-transform-origin: 50% 0;
  -ms-transform-origin: 50% 0;
  transform-origin: 50% 0;
  -webkit-transform: scale(0.75) translateY(-21px);
  -ms-transform: scale(0.75) translateY(-21px);
  transform: scale(0.75) translateY(-21px);
  -webkit-transition: all 0.2s cubic-bezier(0.5, 0, 0, 1.25),
    opacity 0.15s ease-out;
  transition: all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out;
  z-index: 9;
}
.nice-select .list:hover .option:not(:hover) {
  background-color: transparent !important;
}
.nice-select .option {
  cursor: pointer;
  font-weight: 400;
  line-height: 40px;
  list-style: none;
  min-height: 40px;
  outline: none;
  padding-left: 18px;
  padding-right: 29px;
  text-align: left;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.nice-select .option:hover,
.nice-select .option.focus,
.nice-select .option.selected.focus {
  background-color: #f6f6f6;
}
.nice-select .option.selected {
  font-weight: bold;
}
.nice-select .option.disabled {
  background-color: transparent;
  color: #999;
  cursor: default;
}

.no-csspointerevents .nice-select .list {
  display: none;
}

.no-csspointerevents .nice-select.open .list {
  display: block;
}
</style>
