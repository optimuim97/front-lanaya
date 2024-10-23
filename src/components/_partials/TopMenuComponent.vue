<template>
  <header class="header" v-if="!store.isAuthenticated()">
    <nav class="navbar navbar-expand-xl">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        </router-link>

        <!-- Si Non Auth -->
        <div
          class="navbar__out order-2 order-xl-3"
          v-if="!store.isAuthenticated()"
        >
          <div class="nav__group__btn">
            <router-link to="/sign-in" class="log d-none d-sm-block">
              Se connecter
            </router-link>
            <router-link
              to="/sign-up"
              class="button button--effect d-none d-sm-block"
            >
              S'inscrire
              <!-- maintenant -->
              <i class="fa-solid fa-arrow-right-long"></i>
            </router-link>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#primaryNav"
            aria-controls="primaryNav"
            aria-expanded="false"
            aria-label="Toggle Primary Nav"
          >
            <!-- <span class="icon-bar top-bar"></span>
            <span class="icon-bar middle-bar"></span>
            <span class="icon-bar bottom-bar"></span> -->
          </button>
        </div>

        <!-- <div
          class="collapse navbar-collapse order-3 order-xl-2"
          id="primaryNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="javascript:void(0)"
                id="navbarHomeDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Home
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarHomeDropdown">
                <li><a class="dropdown-item" href="index.html">Home</a></li>
                <li>
                  <a class="dropdown-item" href="index-two.html">Home Two</a>
                </li>
                <li>
                  <a class="dropdown-item" href="index-three.html"
                    >Home Three</a
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="javascript:void(0)"
                id="navbarPropertyDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Properties
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarPropertyDropdown"
              >
                <li>
                  <a class="dropdown-item" href="properties.html">Properties</a>
                </li>
                <li>
                  <a class="dropdown-item" href="property-details.html"
                    >Property Details</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="property-alert.html"
                    >Property Alert</a
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="javascript:void(0)"
                id="navbarLoanDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Loan
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarLoanDropdown">
                <li>
                  <a class="dropdown-item" href="business-loan.html"
                    >Business Loan</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="business-loan-details.html"
                    >Business Loan Details</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="loan-application.html"
                    >Loan Application</a
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="list-your-property.html"
                >List your property</a
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="javascript:void(0)"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pages
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="dashboard.html">Dashboard</a>
                </li>
                <li>
                  <a class="dropdown-item" href="about-us.html">About Us</a>
                </li>
                <li>
                  <a class="dropdown-item" href="affiliate-program.html"
                    >Affiliate Program</a
                  >
                </li>
                <li><a class="dropdown-item" href="blog.html">Blog</a></li>
                <li>
                  <a class="dropdown-item" href="blog-two.html">Blog Two</a>
                </li>
                <li>
                  <a class="dropdown-item" href="blog-single.html"
                    >Blog Single</a
                  >
                </li>
                <li><a class="dropdown-item" href="career.html">Career</a></li>
                <li>
                  <a class="dropdown-item" href="career-details.html"
                    >Career Details</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="how-it-works.html"
                    >How It Works</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="key-risks.html">Key Risks</a>
                </li>
                <li>
                  <a class="dropdown-item" href="loyality-program.html"
                    >Loyality Program</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="terms-conditions.html"
                    >Terms Conditions</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="privacy-policy.html"
                    >Privacy Policy</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="cookie-policy.html"
                    >Cookie Policy</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="support.html">Support</a>
                </li>
                <li><a class="dropdown-item" href="404.html">Error</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact-us.html">Contact</a>
            </li>
            <li class="nav-item d-block d-sm-none">
              <a href="login.html" class="nav-link">Log In</a>
            </li>
            <li class="nav-item d-block d-sm-none">
              <a
                href="registration.html"
                class="button button--effect button--last"
                >Join Now <i class="fa-solid fa-arrow-right-long"></i
              ></a>
            </li>
          </ul>
        </div> -->
      </div>
    </nav>
  </header>

  <header class="dashboard-header" v-else>
    <div class="container">
      <div class="dashboard-header__area">
        <!-- <a href="index.html" class="header-logo"> -->
        <router-link to="/" class="header-logo" >
          <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        </router-link>

        <!-- <router-link to="/dashboard" class="profile">
          <img src="@/assets/images/profile.png" alt="Profile" />
        </router-link> -->

        <div class="dashboard-header__area-content">
          <router-link class="button button--effect" to="/create-project">
            <img src="@/assets/images/direction.png" alt="Investment" /> Nouveau
            Projet
          </router-link>
          <!-- <div class="notification-area">
            <a
              href="javascript:void(0)"
              class="icon__wrapper notification__icon"
            >
              <i class="fa-solid fa-bell"></i>
              <span>03</span>
            </a>
            <div class="notification__wrapper">
              <div class="notification__head">
                <p class="text-center">3 New</p>
                <p class="text-center">Notification</p>
              </div>
              <div class="notification__single-wrapper">
                <div class="notification__single">
                  <a href="javascript:void(0)">
                    <h6>Welcome to spoment</h6>
                    <p>We are happy to welcome you to our community spoment.</p>
                  </a>
                  <p class="time">2 hours ago</p>
                </div>
                <div class="notification__single">
                  <a href="javascript:void(0)">
                    <h6>Welcome to spoment</h6>
                    <p>We are happy to welcome you to our community spoment.</p>
                  </a>
                  <p class="time">2 hours ago</p>
                </div>
              </div>

              <div class="mark__read">
                <a href="#">Mark all as read</a>
              </div>
            </div>
          </div> -->
          <!-- <div class="dashboard-language">
            <select class="select-dashboard-language">
              <option value="english">En</option>
              <option value="australia">Aus</option>
              <option value="germany">GER</option>
              <option value="argentina">Arg</option>
            </select>
          </div> -->
          <router-link to="/dashboard" class="profile">
            <img src="@/assets/images/profile.png" alt="Profile" />
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore";
const store = useUserStore();
// import { EventBus } from "@/utils/eventBus";
// import { watch } from "vue";
// const isAuth = ref(null);

// watch(
//   () => EventBus["token"],
//   async (newValue) => {
//     alert(newValue);
//   }
// );
</script>

<style></style>
