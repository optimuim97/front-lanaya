<script setup></script>

<template>
  <div class="account-content" id="billing">
    <div class="account-content-single mt-0">
      <div class="intro">
        <h5>Payment Methods</h5>
        <a href="#">Add Method</a>
      </div>
      <div class="account-content-single__inner">
        <div class="content content-alt">
          <img src="assets/images/visa.png" alt="Visa" />
          <div>
            <h6>Visa ending in 1234</h6>
            <p>Expires 1/2025</p>
          </div>
        </div>
        <div class="content-right">
          <p>Default</p>
        </div>
      </div>
      <div class="account-content-single__inner">
        <div class="content content-alt">
          <img src="assets/images/mastercard.png" alt="Mastercard" />
          <div>
            <h6>Mastercard ending in 1234</h6>
            <p>Expires 1/2025</p>
          </div>
        </div>
      </div>
    </div>
    <div class="investment-table">
      <div class="intro">
        <h5>Invoices</h5>
      </div>
      <div class="table-wrapper">
        <table>
          <tr>
            <th>INVOICE ID</th>
            <th>AMOUNT</th>
            <th>DATE</th>
            <th>STATUS</th>
          </tr>
          <tr>
            <td>Invoice #123</td>
            <td>$500.00</td>
            <td>18.03.2022</td>
            <td><span class="process"></span>Processing</td>
          </tr>
          <tr>
            <td>Invoice #123</td>
            <td>$500.00</td>
            <td>18.03.2022</td>
            <td><span class="paid"></span>Paid</td>
          </tr>
          <tr>
            <td>Invoice #123</td>
            <td>$500.00</td>
            <td>18.03.2022</td>
            <td><span class="paid"></span>Paid</td>
          </tr>
          <tr>
            <td>Invoice #123</td>
            <td>$500.00</td>
            <td>18.03.2022</td>
            <td><span class="paid"></span>Paid</td>
          </tr>
          <tr>
            <td>Invoice #123</td>
            <td>$500.00</td>
            <td>18.03.2022</td>
            <td><span class="paid"></span>Paid</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
