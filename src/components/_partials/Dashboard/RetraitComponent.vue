<script setup></script>

<template>
  <div class="main__content">
    <div class="collapse__sidebar">
      <h4>Dashboard</h4>
      <a href="javascript:void(0)" class="collapse__sidebar__btn">
        <i class="fa-solid fa-bars-staggered"></i>
      </a>
    </div>
    <div class="main__content-dashboard">
      <div class="breadcrumb-dashboard">
        <h5>Withdraw</h5>
        <div>
          <a href="index.html">Home</a>
          <i class="fa-solid fa-arrow-right-long"></i>
          <a href="javascript:void(0)">Withdraw</a>
        </div>
      </div>
      <div class="withdraw-funds">
        <div class="withdraw-funds__inner">
          <h5>Withdraw Funds</h5>
          <p>Use the form below to withdraw from wallet instantly</p>
          <form action="#" method="post">
            <div class="input input--secondary">
              <label for="withdrawAmount">Amount</label>
              <input
                type="number"
                name="withdraw_amount"
                id="withdrawAmount"
                placeholder="100"
                required="required"
              />
            </div>
            <div class="regi__type">
              <label for="methodSelect">Payment Method</label>
              <select class="type__select" id="methodSelect">
                <option value="method">Payment Method</option>
                <option value="paypal">Paypal</option>
                <option value="maestro">Maestro</option>
                <option value="visa">Visa</option>
                <option value="express">American Express</option>
              </select>
            </div>
            <button type="submit" class="button button--effect">
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
