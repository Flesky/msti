<template>
  <Swiper
    :modules="[SwiperAutoplay]"
    loop
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide>
      as
    </SwiperSlide>
    <SwiperSlide>
      as
    </SwiperSlide>
    <SwiperSlide>
      as
    </SwiperSlide>
  </Swiper>
</template>
