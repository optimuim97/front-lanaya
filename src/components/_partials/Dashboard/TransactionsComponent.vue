<script setup>
//TODO
// Get User Transaction
</script>

<template>
  <div class="main__content-dashboard">
    <div class="breadcrumb-dashboard">
      <h5>Transactions</h5>
      <!-- <div>
          <a href="index.html">Tableau de Bord</a>
          <i class="fa-solid fa-arrow-right-long"></i>
          <a href="javascript:void(0)">Transactions</a>
        </div> -->

      <div
        role="button"
        @click="
          () => {
            router.push('/dashboard');
          }
        "
      >
        <router-linnk to="/dashboard" role="button"
          >Tableau de Board</router-linnk
        >
        <i class="fa-solid fa-arrow-right-long"></i>
        <a href="javascript:void(0)">Transactions</a>
      </div>
    </div>
    <div class="investment-table investment-table-two">
      <div class="intro">
        <h5>Transactions</h5>
        <h6>Nombre total de transactions <span>(10)</span></h6>
      </div>
      <div class="table-wrapper">
        <table>
          <tr>
            <th>Project</th>
            <th>Amount Investi</th>
            <th>Moyen de Paiement</th>
            <th>Date / Heure</th>
          </tr>
          <tr>
            <td>
              <img src="@/assets/images/table-img.png" alt="Investment" />
              A19, Vilnius
            </td>
            <td>$500.00</td>
            <td>Paypal</td>
            <td>18.03.2022</td>
          </tr>
          <tr>
            <td>
              <img src="@/assets/images/table-img.png" alt="Investment" />
              A19, Vilnius
            </td>
            <td>$500.00</td>
            <td>Visa</td>
            <td>18.03.2022</td>
          </tr>
          <tr>
            <td>
              <img src="@/assets/images/table-img.png" alt="Investment" />
              A19, Vilnius
            </td>
            <td>$500.00</td>
            <td>American Express</td>
            <td>18.03.2022</td>
          </tr>
          <tr>
            <td>
              <img src="@/assets/images/table-img.png" alt="Investment" />
              A19, Vilnius
            </td>
            <td>$500.00</td>
            <td>Maestro</td>
            <td>18.03.2022</td>
          </tr>
          <tr>
            <td>
              <img src="@/assets/images/table-img.png" alt="Investment" />
              A19, Vilnius
            </td>
            <td>$500.00</td>
            <td>Paypal</td>
            <td>18.03.2022</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
