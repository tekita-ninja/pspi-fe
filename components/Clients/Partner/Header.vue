<template>
  <header
    class="flex items-center max-md:bg-[url('/images/partners/jumbotron-picture.png')] bg-center bg-cover md:bg-orange-primary h-[100vh] md:pt-32 text-white">
    <div
      class="flex flex-col md:flex-row gap-16 md:gap-0 justify-center items-center md:justify-around lg:w-5/6 h-full md:h-[90%] px-10 md:px-0 mx-auto bg-orange-primary/80">
      <img src="/images/partners/jumbotron-picture.png" class="hidden md:block h-3/4 xl:h-full"
        alt="partners-jumb-picture" />
      <div class="grid gap-5 xl:gap-0 w-full xl:h-full  md:w-1/2">
        <div class="w-full xl:translate-y-[50%] tracking-[1px] md:space-y-4 lg:space-y-8 self-end xl:self-start">
          <h2 class="krona-one max-w-max relative text-left text-2xl lg:text-4xl">
            <img src="/images/partners/dot-ornamen-jumbotron.svg"
              class="absolute h-16 right-[-40px] top-[-160%] lg:h-28 lg:right-[-70px] lg:top-[-200%]" alt="" />
            PARTNERSHIP
          </h2>
          <p class="spartan text-justify leading-loose font-normal text-xl">
            Kami percaya bahwa kemitraan yang solid adalah kunci keberhasilan. Kami menjalin kerja sama dengan PT. Prima
            Artha Adhirajasa sebagai mitra transportasi terpercaya, yang menyediakan berbagai layanan transportir yang
            handal dan efisien. Dengan pengalaman dan komitmen mereka dalam memastikan pengiriman tepat waktu dan aman,
            kami dapat menjaga kelancaran operasional serta memenuhi kebutuhan transportir pelanggan dengan lebih baik.
          </p>
        </div>

        <!-- <NuxtLink to="/product" class="spartan cursor-pointer text-2xl self-end border-b-2 border-white max-w-max">
          <span class="flex items-center ">Layanan Kami
            <Icon name="tabler:chevron-right" class="text-xl mb-1" />
          </span>
        </NuxtLink> -->
      </div>
    </div>
  </header>
</template>
