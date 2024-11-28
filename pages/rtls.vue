<script setup lang="ts">
const solutions = [
  {
    name: 'Asset Tracking',
    icon: 'tabler:map-2',
    features: [
      'Track & Trace',
      'Find Nearest Item Now',
      'Equipment Utilization',
      'Asset Efficiency',
      'Ensure Process Workflow',
    ],
  },
  {
    name: 'Staff Safety',
    icon: 'tabler:shield-half',
    features: [
      'Alert To Distress',
      'Coordinated Response',
      '2-Way Communicating Tag',
      'Wi-Fi / BLE Redundancy',
      'Man-down',
    ],
  },
  {
    name: 'Process Workflow',
    icon: 'tabler:clipboard-text',
    features: [
      'Location Based Milestones',
      'Time-Stamped Events',
      'Patient Flow',
      'Bed Management',
    ],
  },
  {
    name: 'Environmental',
    icon: 'tabler:temperature',
    features: [
      'Temperature Recording',
      'Excursion Alerts',
      'Humidity Sensing',
      'Motion Detection',
      'Vibration Fingerprinting',
    ],
  },
  {
    name: 'Regulatory Compliance',
    icon: 'tabler:circle-check',
    features: [
      'Hand Hygiene Support for All Dispensers',
      'Real-time Alerts and Reminders',
      'Two-way Communicating Tag',
      'Automated Accurate Reporting',
    ],
  },
  {
    name: 'Wander Management',
    icon: 'tabler:walk',
    features: [
      'Real-time Alerts',
      'Historical Tracking',
      'Geo-fencing',
      '2-Way Communicating Tag',
      'Wi-Fi / BLE Redundancy',
    ],
  },
]

const benefits = [
  {
    name: 'Wide Customer Base',
    icon: 'tabler:users',
    description: 'Hundreds of customers worldwide, across a variety of departments.',
  },
  {
    name: 'Business Insight',
    icon: 'tabler:light-bulb',
    description: 'Gain insights into your business operations and processes.',
  },
  {
    name: 'Quantifiable Results',
    icon: 'tabler:chart-bar',
    description: 'Drive the metrics used to determine success.',
  },
]
</script>

<template>
  <div>
    <div class="relative">
      <div
        style="background: linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), url('/images/hero/rtls.jpg')" class="hero flex flex-col justify-center bg-black bg-opacity-50 text-white"
      >
        <div class="mx-auto flex w-full max-w-screen-2xl flex-col-reverse items-center gap-8 px-4 py-8 md:flex-row">
          <div class="space-y-4">
            <div class="text-4xl font-bold">
              Real-time Location System
            </div>
            <p>
              Our RTLS delivers an enterprise real-time location system that interconnects and reveals insights across all areas and departments in your organization. The benefits of this approach include:
            </p>
            <div>
              <ul class="ml-6 list-disc space-y-3">
                <li>Architectural control from tag firmware to cloud computing</li>
                <li>Location insights to existing business applications</li>
                <li>
                  Increased value of existing technology investments
                </li>
              </ul>
            </div>
          </div>
          <img class="w-full max-w-xl" src="/images/content/rtls/main.png">
        </div>
      </div>
    </div>

    <section class="bg-gray-100 px-4 py-12 text-center">
      <h1 class="text-4xl font-bold">
        Sofia Interface
      </h1>
      <p class="mt-4 font-bold">
        The sofia interface simplifies the UI to create an intuitive experience.
      </p>
      <p class="mt-4">
        Modules are complete with dashboards, mapping tools, reports, etc. Simple to deploy, simple to use, each module helps you derive value quickly.
      </p>
      <div class="mx-auto mt-6 grid max-w-screen-2xl grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="(solution, i) in solutions">
          <template #header>
            <!--            <img :src="`/images/content/services/${i + 1}.webp`" class="w-full object-cover" :alt="solution.name"> -->
            <Icon class="mt-4 text-6xl text-secondary-900" :name="solution.icon" />
          </template>
          <template #title>
            {{ solution.name }}
          </template>
          <template #content>
            <ul class="space-y-2">
              <li v-for="feature in solution.features">
                {{ feature }}
              </li>
            </ul>
          </template>
        </Card>
      </div>
    </section>

    <section class="px-4 py-12 text-center">
      <h1 class="text-4xl font-bold">
        We are trusted RTLS Experts
      </h1>
      <!--      TODO: https://www.airistaflow.com/about-us/ -->
    </section>
  </div>
</template>
