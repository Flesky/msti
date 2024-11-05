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
</script>

<template>
  <div>
    <div class="relative">
      <img class="hero w-full object-cover bg-blue-800">
      <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center text-center text-white">
        <div class="max-w-screen-xl p-3 mx-auto w-full">
          <div class="text-4xl font-bold">
            Real-time Location System
          </div>
          <p>
            Our RTLS delivers an enterprise real-time location system that interconnects and reveals insights across all areas and departments in your organization. The benefits of this approach include:
            <ul class="list-disc">
              <li>Architectural control from tag firmware to cloud computing</li>
              <li>Location insights to existing business applications</li>
              <li>
                Increased value of existing technology investments
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>

    <section class="px-4 text-center py-12 bg-gray-100">
      <h1 class="text-4xl font-bold">
        Sofia Interface
      </h1>
      <p class="mt-4 font-bold">
        The sofia interface simplifies the UI to create an intuitive experience.
      </p>
      <p class="mt-4">
        Modules are complete with dashboards, mapping tools, reports, etc. Simple to deploy, simple to use, each module helps you derive value quickly.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 max-w-screen-xl mx-auto gap-x-3 gap-y-4">
        <Card v-for="(solution, i) in solutions">
          <template #header>
            <!--            <img :src="`/images/content/services/${i + 1}.webp`" class="w-full object-cover" :alt="solution.name"> -->
            <Icon class="text-6xl mt-4 text-secondary-900" :name="solution.icon" />
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
  </div>
</template>
