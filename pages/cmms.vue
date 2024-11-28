<script setup lang="ts">
const items = [
  {
    header: 'Work Order Management',
    title: 'Manage Work Orders in one place, from start to finish.',
    description: 'Handle all your organisation\'s work with Work Orders. Whether it\'s urgent requests or scheduled jobs, just plug in job details, assign tasks, and track spare parts. It keeps everything organised effortlessly.',
  },
  {
    header: 'Asset Management',
    title: 'Track critcal asset information at your finger tips.',
    description: 'Asset Management in our CMMS allows you to keep track of maintenance history, asset documents, asset information, and work orders all in one place. With an intuitive interface, it allows for easy creation, organisation, and management of assets. Additionally, Our CMMS supports bulk asset imports, making it even more efficient to manage large quantities of assets.',
  },
  {
    header: 'Preventive Maintenance',
    title: 'Prevent breakdowns before they happen.',
    description: 'Schedule recurring work orders by time or usage, and manage assets and assign trades and tasks effortlessly. Ensure equipment reliability, reduce downtime, and extend asset lifespan with our comprehensive preventive maintenance solution. Stay ahead with timely inspections and proactive maintenance.',
  },
  {
    header: 'Inventory Management',
    title: 'Streamline Your Inventory with our CMMS',
    description: 'Experience seamless inventory management with our CMMS. Our system automates parts restocking, streamlines supplier management, and simplifies purchase orders. Conduct efficient stocktakes and manage reservations effortlessly, ensuring your operations run smoothly and efficiently.',
  },
  {
    header: 'Reporting & Analytics',
    title: 'Exploring the Power of our CMMS Dashboard and Analytics',
    description: 'With 426 standard reports available, users can gain insights into various operational aspects, from maintenance schedules to inventory management. Additionally, our CMMS provides 99 standard Key Performance Indicators (KPIs) to help track performance metrics crucial for informed decision-making.',
  },
  {
    header: 'Integrations',
    title: 'Seamless Software Integrations',
    description: 'Our CMMS integrates with various software solutions, including MYOB, Xero, SAP, fleet management software, and ERPs. We offer custom-built integrations, custom report writing, and import/export capabilities to suit your needs.',
  },
]
</script>

<template>
  <div>
    <div class="bg-gray-100">
      <div class="mx-auto max-w-screen-2xl px-4 py-12 text-center">
        <div class="font-medium text-secondary-800">
          CMMS
        </div>
        <h1 class="mt-2 text-4xl font-bold">
          The All-in-One CMMS Solution
        </h1>
        <p class="mt-4">
          Every tool you'll need to keep your maintenance team, organised, efficient and on top of their game.
        </p>
        <div class="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <Card v-for="item in items" class="text-left">
            <template #content>
              <div class="flex items-center gap-3">
                <Icon class="text-3xl !text-green-400" name="tabler:circle-check-filled" /> {{ item.header }}
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <section>
      <div v-for="(item, i) in items" class="mx-auto flex max-w-screen-2xl flex-col items-center px-4 py-12">
        <div class="flex flex-col gap-4" :class="i % 2 ? 'md:flex-row-reverse' : undefined">
          <div class="max-w-xl">
            <p class="font-bold uppercase text-secondary-800">
              {{ item.header }}
            </p>
            <h2 class="mt-2 text-2xl font-bold">
              {{ item.title }}
            </h2>
            <p class="mt-4">
              {{ item.description }}
            </p>
          </div>
          <img class="w-full max-w-xl" :src="`/images/content/cmms/${i + 1}.png`" :alt="item.header">
        </div>
      </div>
    </section>
  </div>
</template>
