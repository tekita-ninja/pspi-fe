<template>
  <section class="bg-orange-primary">
    <div class="relative px-5 md:px-20 py-10 md:py-32 space-y-10 text-white">
      <div class="flex flex-col md:flex-row md:items-center gap-4">
        <div class="md:w-1/3">
          <div>
            <h1 class="spartan font-normal text-6xl md:text-7xl">
              Kami <br> adalah partner <br> terbaik <span class="font-semibold">untuk perusahaan anda! </span>
            </h1>
          </div>
        </div>
        <div class="flex-1 flex flex-wrap items-start justify-center gap-y-7">
          <ClientsPartnersShipHereWhyItem :data="{
            src: '/images/icons/icon-company-01.webp',
            title: 'Kualitas Terjamin Resmi Dari Pertamina Patra Niaga'
          }" />
          <ClientsPartnersShipHereWhyItem :data="{
            src: '/images/icons/icon-company-02.webp',
            title: 'Komitmen terhadap Kepercayaan Pelanggan'
          }" />
          <ClientsPartnersShipHereWhyItem :data="{
            src: '/images/icons/icon-company-03.webp',
            title: 'Pengiriman Cepat & Layanan Pelanggan Responsif'
          }" />
          <ClientsPartnersShipHereWhyItem :data="{
            src: '/images/icons/icon-company-04.webp',
            title: 'Pembayaran Mudah'
          }" />
          <ClientsPartnersShipHereWhyItem :data="{
            src: '/images/icons/icon-company-05.webp',
            title: 'Harga Terbaik di Pasar'
          }" />
        </div>
      </div>
    </div>
  </section>
</template>