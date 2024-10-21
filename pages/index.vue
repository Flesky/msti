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
      Test 1
    </SwiperSlide>
    <SwiperSlide>
      Test 2
    </SwiperSlide>
    <SwiperSlide>
      Test 3
    </SwiperSlide>
  </Swiper>
</template>
