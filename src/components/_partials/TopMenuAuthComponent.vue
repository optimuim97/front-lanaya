<template>
  <!-- ==== dashboard header start ==== -->
  <header class="dashboard-header">
    <div class="container">
      <div class="dashboard-header__area">
        <a href="index.html" class="header-logo">
          <img src="assets/images/logo.png" alt="Logo" class="logo" />
        </a>
        <div class="dashboard-header__area-content">
          <a class="button button--effect" href="investment.html">
            <img src="assets/images/direction.png" alt="Investment" /> New
            Investments
          </a>
          <div class="notification-area">
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
          </div>
          <div class="dashboard-language">
            <select class="select-dashboard-language">
              <option value="english">En</option>
              <option value="australia">Aus</option>
              <option value="germany">GER</option>
              <option value="argentina">Arg</option>
            </select>
          </div>
          <a href="account.html" class="profile">
            <img src="assets/images/profile.png" alt="Profile" />
          </a>
        </div>
      </div>
    </div>
  </header>
  <!-- ==== #dashboard header end ==== -->
</template>

<script setup></script>

<style></style>
