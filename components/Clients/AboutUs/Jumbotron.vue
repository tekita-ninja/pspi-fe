<template>
  <section
    class="relative bg-[url('/images/about/bg-jumbotron.png')] bg-cover bg-center xl:bg-left-bottom h-[60vh] md:h-[90vh]"
  >
    <div
      class="relative mx-3 sm:mx-12 2xl:mx-auto min-[1530px]:mx-container lg:pb-28 min-[1600px]:pb-44 z-20  text-white w-full h-full grid lg:grid-cols-2 items-end"
    >
      <div class="mb-[-100px] md:mb-0">
        <div>
          <h1
            data-aos="fade-left"
            data-aos-duration="1000"
            class="koulen text-5xl sm:text-6xl md:text-8xl z-20"
          >
            TENTANG KAMI
          </h1>
          <!-- <p
            data-aos="fade-left"
            data-aos-duration="1500"
            class="spartan text-[20px] sm:text-[30px] md:text-[40px] font-light z-30"
          >
            Kenali perusahaan lebih dalam
          </p> -->
        </div>
        
      </div>
      <div class="w-full h-full relative">
        <img src="/public/images/about/top-line-jumbotron.svg" class="absolute 
            h-[250px] top-[-230px] right-[-60px]
            sm:h-[500px] sm:top-[-500px] sm:right-[-50px]
            lg:h-[550px] lg:top-[-120px] lg:right-[-150px]
            min-[1600px]:h-[600px] min-[1600px]:right-[-380px]" alt="">
        <img src="/public/images/about/bottom-line-jumbotron.svg" class="absolute 
            h-[250px] bottom-[-55px] right-[-120px]
            md:h-[550px] md:bottom-[-200px] md:right-[-150px]  
            lg:h-[550px] lg:bottom-[-200px] lg:right-[-150px]
            min-[1600px]:h-[600px] min-[1600px]:right-[-340px]" alt="">
      </div>
    </div>

    <div class="absolute inset-0 z-10 bg-orange-primary/75"></div>
  </section>
</template>
