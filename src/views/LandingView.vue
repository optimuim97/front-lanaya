<script setup>
// import useBusinessSectors from "@/services/BusinessSector/businessSector";
import useProjectType from "@/services/ProjectType/projectType";
import { useGlobalStore } from "@/stores/globalStore";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/useUserStore";


const { getProjectTypes, projectTypes } = useProjectType();
const store = useUserStore();

const formatAmount = (amount) => {
  // Exemple de formatage de montant (peut être personnalisé)
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(amount);
};
const { publicDir } = useGlobalStore();
// const { businessSectors,
/* showBusinessSector,*/
// getBusinessSectors } =
// useBusinessSectors();

onMounted(async () => {
  // await getBusinessSectors();
  await getProjectTypes();
});
</script>

<template>
  <div>
    <!-- ==== hero section start ==== -->
    <section
      class="hero hero--two pos__rel over__hi bg__img"
      data-background="@/assets/images/hero/hero-two-bg.png"
    >
      <div class="container">
        <div class="hero__area">
          <div class="row">
            <div class="col-lg-7 col-xxl-6">
              <div class="hero__content">
                <h5 class="neutral-top">Intelligent. Simple. Accessible.</h5>
                <h1>
                  Investir en toute simplicité &
                  <span>Transparence</span>
                </h1>
                <p class="primary neutral-bottom">
                  Commencez à augmenter vos revenus passifs dès aujourd'hui.
                  Investissez à partir de 100000 XOF dans des opportunités dans
                  le monde entier.
                </p>
                <div class="hero__cta__group">
                  <a href="properties.html" class="button button--effect"
                    >Commencer à explorer</a
                  >
                  <a
                    href="business-loan.html"
                    class="button button--secondary button--effect"
                    >Obtenir un financement</a
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-xxl-6">
              <div class="hero__illustration d-none d-lg-block">
                <img
                  src="@/assets/images/hero/hero-two-illustration.png"
                  alt="Hero Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==== #hero section end ==== -->

    <!-- ==== property filter start ==== -->
    <div class="property__filter">
      <div class="container">
        <div class="property__filter__area">
          <div class="row d-flex align-items-center">
            <div class="col-lg-12 col-xl-8 mx-auto">
              <div class="property__search__wrapper">
                <form action="#" method="post">
                  <div class="input">
                    <input
                      type="search"
                      name="property__search"
                      id="propertySearch"
                      placeholder="Rechercher"
                    />
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <button type="submit" class="button button--effect">
                    Soumettre
                  </button>
                </form>
              </div>
            </div>

            <!-- <div class="col-lg-6 col-xl-3">
              <div class="property__select__wrapper">
                <select class="property__select">
                  <option data-display="Property">Property Type</option>
                  <option
                    :value="item.id"
                    v-for="item in businessSectors"
                    :key="item.id"
                  >
                    {{ item.designation  }}
                  </option>
                  
                </select>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- ==== #property filter end ==== -->

    <!-- ==== all properties in grid section start ==== -->
    <section class="properties__grid section__space">
      <div class="container">
        <div class="properties__grid__area wow fadeInUp">
          <div class="title__with__cta">
            <div class="row d-flex align-items-center">
              <div class="col-lg-8">
                <h2>Projets <span> Vedettes</span></h2>
              </div>
              <div class="col-lg-4">
                <div class="text-start text-lg-end">
                  <router-link
                    to="/project-type"
                    class="button button--secondary button--effect"
                    >Voir tous
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="property__grid__wrapper">
            <div class="row">
              <div
                class="col-lg-6 col-xl-4"
                v-for="item in projectTypes"
                :key="item.id"
              >
                <div class="property__grid__single column__space--secondary">
                  <div class="img__effect">
                    <a href="property-details.html">
                      <!-- src="@/assets/images/property/grid-one.jpg" -->
                      <img :src="`${publicDir}/${item.cover}`" alt="Property" />
                    </a>
                  </div>
                  <div class="property__grid__single__inner">
                    <h4>{{ item.designation }}</h4>
                    <p class="sub__info">
                      <i class="fa-solid fa-location-dot"></i>
                      {{ item.description }}
                    </p>
                    <div class="progress__type">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p class="project__has">
                        <!-- <span class="project__has__investors"
                          >159 Investors</span
                        >
                        | -->
                        <!-- <span class="project__has__investors__amount">
                          {{ formatAmount(item.max_budget) }}
                        </span> -->
                        <!-- <span class="project__has__investors__percent"
                          >(64.73%)</span
                        > -->
                      </p>
                    </div>
                    <div class="item__info">
                      <div>
                        <p>Secteur d'activité</p>
                        <h6>{{ item.business_sector.designation }}</h6>
                      </div>

                      <div>
                        <p>Budget</p>
                        <h6>{{ formatAmount(item.max_budget) }}</h6>
                      </div>
                    </div>

                    <div class="invest__cta__wrapper">
                      <div class="countdown__wrapper">
                        <p class="secondary">
                          <i class="fa-solid fa-clock"></i>Date de fin
                          (Estimation)
                        </p>
                        <div class="countdown">
                          <h5>
                            <!-- <span class="days">00</span
                            ><span class="ref">d</span>
                            <span class="seperator">:</span> -->
                            {{ item.investment_closure }}
                          </h5>
                          <!-- <h5>
                            <span class="hours"> 00</span
                            ><span class="ref">h</span>
                            <span class="seperator">:</span>
                          </h5>
                          <h5>
                            <span class="minutes">00</span
                            ><span class="ref">m</span>
                            <span class="seperator"></span>
                          </h5> -->
                        </div>
                      </div>
                      <div class="invest__cta">
                        <router-link
                           v-if="!store.isAuthenticated()"
                          to="/sign-in"
                          class="button button--effect"
                        >
                          Investir
                        </router-link>
                        
                        <router-link
                          :to="`/create-project/${item.slug}`"
                           v-else
                          class="button button--effect"
                        >
                          Investir
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==== #all properties in grid section end ==== -->

    <!-- ==== start step section start ==== -->
    <section class="start start--two section__space__top">
      <div class="container">
        <div class="start__area wow fadeInUp">
          <div class="section__header">
            <h5 class="neutral-top">Nous changeons votre façon d'investir</h5>
            <h2>Il est facile de commencer.</h2>
            <p class="neutral-bottom">
              L'inscription à Lananya est simple et ne prend que quelques
              minutes.
            </p>
          </div>
          <div class="row">
            <div class="col-md-6 col-xl-4">
              <div class="start__single__item column__space--secondary">
                <div class="img__box">
                  <img
                    src="@/assets/images/step/browse.png"
                    alt="Browse Properties"
                  />
                  <div class="step__count">
                    <h4>01</h4>
                  </div>
                </div>
                <h4>Parcourir les opportunités</h4>
                <p class="neutral-bottom">
                  Sélectionnez une propriété qui correspond à votre objectif
                  parmi notre vaste gamme de propriétés triées sur le volet.
                  propriétés triées sur le volet.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="start__single__item column__space--secondary">
                <div class="img__box arrow__container">
                  <img
                    src="@/assets/images/step/invest.png"
                    alt="View Details & Invest"
                  />
                  <div class="step__count">
                    <h4>02</h4>
                  </div>
                </div>
                <h4>Voir les détails</h4>
                <p class="neutral-bottom">
                  Visualisez les mesures détaillées de ce bien, comme le
                  rendement locatif, etc, etc. et investissez comme des
                  institutions.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="start__single__item">
                <div class="img__box">
                  <img
                    src="@/assets/images/step/earn.png"
                    alt="Earn and Track"
                  />
                  <div class="step__count">
                    <h4>03</h4>
                  </div>
                </div>
                <h4>Gain et suivi</h4>
                <p class="neutral-bottom">
                  L'équipe de lanaya vous suis afin d'assurer le bon suivi de
                  vos projets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==== #start step section end ==== -->

    <!-- ==== market section start ==== -->
    <section class="market market--two section__space__bottom">
      <div class="container">
        <div
          class="market__area market__area--two section__space bg__img"
          data-background="./assets/images/light-two.png"
        >
          <div class="row d-flex align-items-center">
            <div class="col-lg-6">
              <div class="content">
                <h5 class="neutral-top">
                  Exposition réelle au marché de l'immobilier
                </h5>
                <h2>Investir et Lananya fait le Reste</h2>
                <p>
                  Investir dans l'immobilier en toute transparence grâce à
                  Lananya. et découvrez une meilleure façon d'investir sur vos
                  projets.
                </p>
                <a href="properties.html" class="button button--effect"
                  >Commencer maintenant</a
                >
                <img src="@/assets/images/arrow.png" alt="Go to" />
              </div>
            </div>
          </div>
          <img
            src="@/assets/images/market-two-illustration.png"
            alt="Explore the Market"
            class="d-none d-lg-block market__two__thumb"
          />
        </div>
        <div class="market__features">
          <div class="row">
            <div class="col-md-6 col-xl-4">
              <div class="market__features__single shadow__effect__secondary">
                <img src="@/assets/images/icons/gain.png" alt="Gain Instant" />
                <h4>Gain Instant</h4>
                <p class="neutral-bottom">
                  Lananya performs deep due diligence on sponsors, giving
                  investors peace of mind.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div
                class="market__features__single market__features__single--alt shadow__effect"
              >
                <img
                  src="@/assets/images/icons/noticed.png"
                  alt="Get noticed"
                />
                <h4>Get Noticed</h4>
                <p class="neutral-bottom">
                  Lananya VERIFIED sponsor profiles are available to accredited
                  real estate investment investors.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div
                class="market__features__single alt shadow__effect__secondary"
              >
                <img
                  src="@/assets/images/icons/focus.png"
                  alt="Focus on Deals"
                />
                <h4>Focus on Deals</h4>
                <p class="neutral-bottom">
                  Spend less time smiling, reaserching and dialing and more time
                  doing what you love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==== #market section end ==== -->

    <!-- ==== platform section start ==== -->
    <!-- <section class="platform section__space pos__rel over__hi">
      <div class="container">
        <div class="platform__area">
          <div class="row d-flex align-items-center">
            <div class="col-lg-6">
              <div class="content">
                <h5>We're Changing The Way You Invest</h5>
                <h2>
                  The Convenience You’d Expect from a Modern Investment Platform
                </h2>
                <p>
                  Invest and manage your portfolio through our easy-to-use
                  website and mobile app. Track your performance and watch as
                  properties across the country are acquired, improved, and
                  operated via dynamic asset updates.
                </p>
                <a href="properties.html" class="button button--effect"
                  >Start Exploring</a
                >
              </div>
            </div>
            <div class="col-lg-6">
              <div class="platform__thumb thumb__ltr d-none d-lg-block">
                <img
                  src="assets/images/overview/platform-illustration.png"
                  alt="Platform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ==== #platform section end ==== -->

    <!-- ==== portfolio section start ==== -->
    <!-- <div class="portfolio__overview__wrapper">
      <div class="container">
        <div class="portfolio__overview">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="portfolio__overview__single column__space">
                <img src="assets/images/icons/investors.png" alt="Investors" />
                <div>
                  <h2 class="counterTwo">6738</h2>
                  <p>Investors</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="portfolio__overview__single column__space">
                <img src="assets/images/icons/completed.png" alt="completed" />
                <div>
                  <h2 class="counterTwo">61316</h2>
                  <p>Investments Completed</p>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-4">
              <div class="portfolio__overview__single">
                <img
                  src="assets/images/icons/annual-return.png"
                  alt="Average Annual Return"
                />
                <div>
                  <h2><span class="counterTwo">10.36</span>%</h2>
                  <p>Average Annual Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <section
      class="portfolio section__space bg__img over__hi"
      data-background="./assets/images/portfolio-bg.png"
    >
      <div class="container">
        <div class="portfolio__area">
          <div class="portfolio__inner section__space__top">
            <div class="row d-flex align-items-center">
              <div class="col-lg-6">
                <div class="content column__space">
                  <h5 class="neutral-top">
                    Build a global real estate portfolio.
                  </h5>
                  <h2>Real Estate Investing For Everybody.</h2>
                  <p>
                    Investing with Lananya, is similar to owning a rental
                    property, however with us you don't have to worry about
                    day-to-day property management and in the periods of vacancy
                    the borrower is required to distribute fixed-interest
                    payments.
                  </p>
                  <div class="port__cta__group">
                    <a href="properties.html" class="button button--effect"
                      >Start Exploring</a
                    >
                    <a
                      href="https://www.youtube.com/watch?v=LCihLrSehCo"
                      target="_blank"
                      class="button button--secondary button--effect video__popup"
                      ><i class="fa-solid fa-play"></i> How It Works</a
                    >
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="port__thumb thumb__ltr">
                  <img src="assets/images/tower.png" alt="Tower" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ==== #portfolio section end ==== -->

    <!-- ==== why invest section start ==== -->
    <!-- <section class="why__invest section__space">
      <div class="container">
        <div class="why__invest__area wow fadeInUp">
          <div class="row d-flex align-items-center">
            <div class="col-xxl-6">
              <div class="content column__space--secondary">
                <h5 class="neutral-top">
                  Join the future of real estate investing
                </h5>
                <h2>Why Invest in Real Estate?</h2>
                <p>
                  Start building your real estate investment portfolio today
                  with as little as €100.
                </p>
              </div>
            </div>
            <div class="col-xxl-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="why__invest__single shadow__effect__secondary">
                    <img src="assets/images/icons/passive.png" alt="Passive" />
                    <h5>Passive Income</h5>
                    <p class="neutral-bottom">
                      Earn income without active management
                    </p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="why__invest__single shadow__effect__secondary">
                    <img
                      src="assets/images/icons/stable.png"
                      alt="Stable Cash Flow"
                    />
                    <h5>Stable Cash Flow</h5>
                    <p class="neutral-bottom">
                      Rental payments provide steady cash flow through dividend
                      payouts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-xxl-3">
              <div class="why__invest__single shadow__effect__secondary">
                <img src="assets/images/icons/tax.png" alt="Tax Advantages" />
                <h5>Tax Advantages</h5>
                <p class="neutral-bottom">
                  There are numerous tax breaks and favorable deductions
                  associated
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-xxl-3">
              <div class="why__invest__single shadow__effect__secondary">
                <img
                  src="assets/images/icons/capital.png"
                  alt="Capital Appr'n"
                />
                <h5>Capital Appr'n</h5>
                <p class="neutral-bottom">
                  Historically, real estate prices have increased over the rude
                  time
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-xxl-3">
              <div class="why__invest__single shadow__effect__secondary">
                <img
                  src="assets/images/icons/protection.png"
                  alt="Inflation protection"
                />
                <h5>Inflation protection</h5>
                <p class="neutral-bottom">
                  Home values and rents typically increase during times of
                  inflation
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-xxl-3">
              <div class="why__invest__single shadow__effect__secondary">
                <img
                  src="assets/images/icons/diversifaction.png"
                  alt="Diversification"
                />
                <h5>Diversification</h5>
                <p class="neutral-bottom">
                  Low correlation to other asset classes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ==== #why invest section end ==== -->

    <!-- ==== community section start ==== -->
    <section
      class="community section__space__top over__hi bg__img"
      data-background="./assets/images/community-bg.png"
    >
      <div class="container">
        <div class="community__area">
          <div class="section__header">
            <h5 class="neutral-top">
              Un moyen intelligent de collecter des fonds
            </h5>
            <h2>Rejoignez des milliers d'investisseurs</h2>
            <p class="neutral-bottom">
              Des investisseurs individuels et institutionnels investissent de
              10 à 100 000 $ par projet sur Lananya.
            </p>
          </div>
          <div class="comunity-wrapper section__space">
            <div class="buttons">
              <router-link to="/sign-up" class="button button--effect"
                >Devenir investisseur</router-link
              >
            </div>
            <div class="comunity-area">
              <div class="comunity-item">
                <img src="@/assets/images/community/1.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/2.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/3.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/4.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/5.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/6.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/7.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/8.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/9.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/10.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/11.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/12.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/13.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/14.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/15.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/16.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/17.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/18.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/19.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/22.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/20.png" alt="communauté" />
              </div>
              <div class="comunity-item">
                <img src="@/assets/images/community/21.png" alt="communauté" />
              </div>
            </div>
            <div class="comunity-area two">
              <!-- Répéter les éléments ici si nécessaire -->
            </div>
            <div class="comunity-area three">
              <!-- Répéter les éléments ici si nécessaire -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==== #community section end ==== -->

    <!-- ==== testimonial section start ==== -->
    <!-- <section
      class="testimonial testimonial--two section__space pos__rel over__hi bg__img"
      data-background="./assets/images/testimonial/dot-map.png"
    >
      <div class="container">
        <div class="testimonial__area">
          <div class="section__header">
            <h5 class="neutral-top">Investors Trust Us</h5>
            <h2>Trusted by Over 40,000 Worldwide Customer since 2022</h2>
            <p class="neutral-bottom">
              We divide each property into shares so anyone can get started.
              Kindly check out our Investors say about Lananya.
            </p>
          </div>
          <div class="testimonial__item__wrapper">
            <div class="testimonial__support">
              <div
                class="testimonial__item bg__img"
                data-background="./assets/images/testimonial/quote.png"
              >
                <div class="testimonial__author__ratings">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p class="tertiary">
                  Very trustworthy and clearly platform to invest in real state.
                  Safe investment with monthly payouts. Really recommended!
                </p>
                <div class="testimonial__author">
                  <div class="testimonial__author__info">
                    <div class="avatar__wrapper">
                      <img
                        src="assets/images/testimonial/avatar.png"
                        alt="Allan Murphy"
                      />
                    </div>
                    <div>
                      <h5>Allan Murphy</h5>
                      <p class="neutral-bottom">United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="testimonial__support">
              <div
                class="testimonial__item bg__img"
                data-background="./assets/images/testimonial/quote.png"
              >
                <div class="testimonial__author__ratings">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p class="tertiary">
                  Very trustworthy and clearly platform to invest in real state.
                  Safe investment with monthly payouts. Really recommended!
                </p>
                <div class="testimonial__author">
                  <div class="testimonial__author__info">
                    <div class="avatar__wrapper">
                      <img
                        src="assets/images/testimonial/avatar.png"
                        alt="Allan Murphy"
                      />
                    </div>
                    <div>
                      <h5>Allan Murphy</h5>
                      <p class="neutral-bottom">United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="testimonial__support">
              <div
                class="testimonial__item bg__img"
                data-background="./assets/images/testimonial/quote.png"
              >
                <div class="testimonial__author__ratings">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p class="tertiary">
                  Very trustworthy and clearly platform to invest in real state.
                  Safe investment with monthly payouts. Really recommended!
                </p>
                <div class="testimonial__author">
                  <div class="testimonial__author__info">
                    <div class="avatar__wrapper">
                      <img
                        src="assets/images/testimonial/avatar.png"
                        alt="Allan Murphy"
                      />
                    </div>
                    <div>
                      <h5>Allan Murphy</h5>
                      <p class="neutral-bottom">United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="testimonial__support">
              <div
                class="testimonial__item bg__img"
                data-background="./assets/images/testimonial/quote.png"
              >
                <div class="testimonial__author__ratings">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p class="tertiary">
                  Very trustworthy and clearly platform to invest in real state.
                  Safe investment with monthly payouts. Really recommended!
                </p>
                <div class="testimonial__author">
                  <div class="testimonial__author__info">
                    <div class="avatar__wrapper">
                      <img
                        src="assets/images/testimonial/avatar.png"
                        alt="Allan Murphy"
                      />
                    </div>
                    <div>
                      <h5>Allan Murphy</h5>
                      <p class="neutral-bottom">United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="testimonial__support">
              <div
                class="testimonial__item bg__img"
                data-background="./assets/images/testimonial/quote.png"
              >
                <div class="testimonial__author__ratings">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p class="tertiary">
                  Very trustworthy and clearly platform to invest in real state.
                  Safe investment with monthly payouts. Really recommended!
                </p>
                <div class="testimonial__author">
                  <div class="testimonial__author__info">
                    <div class="avatar__wrapper">
                      <img
                        src="assets/images/testimonial/avatar.png"
                        alt="Allan Murphy"
                      />
                    </div>
                    <div>
                      <h5>Allan Murphy</h5>
                      <p class="neutral-bottom">United States</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ==== #testimonial section end ==== -->
  </div>
</template>
