<script setup lang="ts">

</script>

<template>
  <div>
    <div class="relative">
      <img class="hero w-full object-cover" src="/images/hero/about.jpg">
      <div class="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 text-center text-white">
        <div class="mx-auto w-full max-w-screen-xl p-3">
          <div class="text-4xl font-bold">
            About Medical Solution
          </div>
          <p class="mt-4 text-lg">
            We're revolutionizing medical care for all.
          </p>
        </div>
      </div>
    </div>

    <section>
      <div class="mx-auto max-w-screen-xl px-4 py-12 text-center">
        <p class="text-2xl font-light">
          "We are committed to transforming healthcare through innovative solutions. Founded on the principles of excellence and accessibility, we strive to make cutting-edge healthcare solutions available to everyone. Our team of dedicated professionals works tirelessly to ensure the highest standards of quality and patient satisfaction. We believe that by pushing the boundaries of medical technology, we can create a healthier future for all."
        </p>
      </div>
    </section>

    <section class="bg-gray-100">
      <div class="mx-auto grid max-w-screen-xl gap-8 px-4 py-12 md:grid-cols-2 md:px-24">
        <div>
          <h1 class="font-bold text-primary-700">
            OUR MISSION
          </h1>
          <div class="mt-1 text-2xl">
            We heal the world
          </div>
          <p class="mt-2">
            We believe that everyone deserves access to the best medical care. We’re committed to providing innovative solutions that improve the quality of life for all patients, regardless of location or socioeconomic status.
          </p>
        </div>
        <div class="col-span-1 hidden md:block" />
        <div class="col-span-1 hidden md:block" />
        <div class="text-right">
          <h1 class="font-bold text-primary-700">
            OUR VISION
          </h1>
          <div class="mt-1 text-2xl">
            A world without disease
          </div>
          <p class="mt-2">
            We envision a world where disease is a thing of the past. We strive to make the best medical care accessible to everyone, working tirelessly towards a healthier, disease-free world.
          </p>
        </div>
      </div>
    </section>

    <!-- TODO: Cards -->

    <section>
      <div class="mx-auto flex max-w-screen-xl flex-col items-center justify-evenly gap-8 px-4 py-12 text-center md:flex-row">
        <div class="flex flex-col items-center">
          <img src="/images/content/about/founder.png" class="w-32 rounded-full border" alt="Founder">
          <h1 class="mt-1 text-2xl font-medium">
            Jesus B. France
          </h1>
          <p class="text-muted-color">
            Founder & CEO
          </p>
        </div>
        <p class="max-w-xl italic">
          Here at Medical Solution, innovation meets healthcare. Founded with a vision to revolutionize medical solution, we are dedicated to enhancing patient care through cutting-edge technology. We pride ourselves on our unwavering dedication to quality and patient satisfaction. We believe in pushing the boundaries of medical technology to create a healthier world for all. Thank you for joining us on this mission.
        </p>
      </div>
    </section>
  </div>
</template>
