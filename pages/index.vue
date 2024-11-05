<script setup lang="ts">
const services = [
  {
    name: 'Medical Equipment Supply',
    description: 'Providing high-quality medical equipment and devices to healthcare facilities.',
  },
  {
    name: 'Technical Support Services',
    description: 'Offering technical support and maintenance services for medical equipment.',
  },
  {
    name: 'Healthcare IT Solutions',
    description: 'Implementing IT solutions to improve healthcare facility management and patient care.',
  },
  {
    name: 'Training and Education',
    description: 'Providing training and educational programs for healthcare professionals on new equipment and technologies.',
  },
  {
    name: 'Consulting Services',
    description: 'Offering expert consulting services to optimize healthcare facility operations and workflows.',
  },
  {
    name: 'Customized Solutions',
    description: 'Developing customized solutions tailored to the specific needs of healthcare providers.',
  },
]
</script>

<template>
  <div>
    <Swiper
      :modules="[SwiperAutoplay]"
      loop
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      class="text-center"
    >
      <SwiperSlide>
        <div class="relative">
          <img class="h-[640px] max-h-dvh w-full object-cover" src="/images/content/hero/1.jpg">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end text-white">
            <div class="max-w-screen-xl px-3 pb-24 mx-auto w-full">
              <div class="text-4xl font-bold">
                Advanced Medical Solution
              </div>
              <p class="text-lg mt-4">
                Bringing you the latest in medical technology.
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="relative">
          <img class="h-[640px] max-h-dvh w-full object-cover" src="/images/content/hero/2.jpg">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end text-white">
            <div class="max-w-screen-xl px-3 pb-24 mx-auto w-full">
              <div class="text-4xl font-bold">
                Innovative Healthcare
              </div>
              <p class="text-lg mt-4">
                Improving patient outcomes through innovation.
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <section class="px-4 text-center py-12">
      <h1 class="text-4xl font-bold">
        Our Services
      </h1>
      <p class="mt-4">
        Explore the comprehensive range of support and technical solutions we offer to healthcare providers.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 max-w-screen-xl mx-auto gap-x-3 gap-y-4">
        <Card v-for="(service, i) in services">
          <template #header>
            <img :src="`/images/content/services/${i + 1}.webp`" class="w-full object-cover" :alt="service.name">
          </template>
          <template #title>
            {{ service.name }}
          </template>
          <template #content>
            <p>{{ service.description }}</p>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
