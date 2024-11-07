<script setup lang="ts">
const solutions = [
  {
    id: 'online-equipment-monitoring-and-diagnosis',
    icon: 'heart-rate-monitor',
    title: 'Online Equipment Monitoring and Diagnosis',
    description: 'Our online equipment monitoring and diagnosis solutions ensure that your hospital\'s critical systems are always operating at peak efficiency. Using advanced IoT technologies and real-time data analytics, we provide early warnings of potential issues, allowing for proactive maintenance and reducing downtime.',
    shortPoints: [
      'Advanced IoT technologies for real-time monitoring',
      'Early warnings for proactive maintenance',
      'Reduction of downtime and operational costs',
      'Integration with existing hospital systems',
      'Automated alerts for maintenance needs',
    ],
    detailedDescription: 'Our platform offers detailed insights into equipment performance, helping you make informed decisions about upgrades and replacements. Our remote diagnostic tools allow for quick identification and resolution of issues, minimizing the need for on-site visits. The system integrates seamlessly with your existing infrastructure, providing a unified view of all monitored devices. Our team of experts is available 24/7 to assist with any technical issues, ensuring uninterrupted service and optimal performance of your medical equipment.',
    detailedPoints: [
      'Seamless integration with existing infrastructure',
      '24/7 expert support for technical issues',
      'Unified view of all monitored devices',
      'Real-time analytics and reporting',
      'Customizable dashboards and alerts',
    ],
    additionalDescription: 'By leveraging predictive analytics, our system not only identifies current issues but also predicts future failures, allowing you to address them before they impact operations. This proactive approach minimizes downtime, extends the lifespan of your equipment, and ensures continuous, high-quality patient care.',
    additionalPoints: [
      'Predictive analytics for future failure prevention',
      'Extended lifespan of equipment',
      'Continuous high-quality patient care',
      'Cost savings through proactive maintenance',
      'Enhanced decision-making with detailed data insights',
    ],
  },
  {
    id: 'data-security-and-encryption',
    icon: 'shield-half-filled',
    title: 'Data Security and Encryption',
    description: 'Protecting patient data is paramount in today\'s digital healthcare environment. Our comprehensive data security and encryption services safeguard your sensitive information from cyber threats. We implement state-of-the-art encryption protocols, ensuring that data is protected both in transit and at rest.',
    shortPoints: [
      'State-of-the-art encryption protocols',
      'Data protection in transit and at rest',
      'Compliance with industry standards and regulations',
      'Advanced threat detection and response',
      'Continuous network monitoring',
    ],
    detailedDescription: 'In addition to encryption, we offer advanced threat detection and response services to identify and mitigate potential security breaches. Our team continuously monitors your network for suspicious activity, providing real-time alerts and rapid response to any threats. Regular security assessments and penetration testing are conducted to identify vulnerabilities and strengthen your defenses against attacks.',
    detailedPoints: [
      'Real-time alerts and rapid response',
      'Regular security assessments',
      'Penetration testing to identify vulnerabilities',
      'Training for staff on security best practices',
      'Incident response planning and execution',
    ],
    additionalDescription: 'We also offer data backup and disaster recovery solutions to ensure that your critical information is always available, even in the event of a cyber attack or system failure. Our comprehensive approach to data security helps you maintain patient trust and comply with regulatory requirements.',
    additionalPoints: [
      'Data backup and disaster recovery solutions',
      'Compliance with regulatory requirements',
      'Maintenance of patient trust and data integrity',
      'Customizable security policies and protocols',
      'Ongoing support and updates to security systems',
    ],
  },
  {
    id: 'hospital-information-systems',
    icon: 'building-hospital',
    title: 'Hospital Information Systems',
    description: 'Our Hospital Information Systems (HIS) streamline operations and enhance patient care by providing a centralized platform for managing clinical, administrative, and financial information. Our HIS solutions are customizable to meet the unique needs of your hospital, ensuring seamless integration with existing systems.',
    shortPoints: [
      'Customizable HIS solutions',
      'Seamless integration with existing systems',
      'Comprehensive support throughout the implementation process',
      'Electronic health records (EHR) management',
      'Patient scheduling and billing',
    ],
    detailedDescription: 'We offer comprehensive support throughout the implementation process, from initial planning and configuration to ongoing maintenance and updates. Our HIS features include electronic health records (EHR), patient scheduling, billing, and reporting tools, all designed to improve efficiency and reduce administrative burden. The intuitive interface ensures that staff can quickly and easily access the information they need, leading to better patient outcomes and higher satisfaction rates. With robust data analytics capabilities, our HIS enables informed decision-making and strategic planning.',
    detailedPoints: [
      'Robust data analytics capabilities',
      'Intuitive interface for easy access',
      'Enhanced patient outcomes and satisfaction',
      'Streamlined administrative processes',
      'Scalable solutions for growing hospitals',
    ],
    additionalDescription: 'Our HIS also includes modules for inventory management, lab results tracking, and patient communication, providing a comprehensive solution for all aspects of hospital operations. By centralizing information and automating workflows, our HIS helps you deliver better care more efficiently.',
    additionalPoints: [
      'Inventory management modules',
      'Lab results tracking',
      'Patient communication tools',
      'Centralized information and automated workflows',
      'Improved operational efficiency',
    ],
  },
  {
    id: 'consulting-services',
    icon: 'briefcase',
    title: 'Consulting Services',
    description: 'Our consulting services help hospitals navigate the complexities of modern healthcare technology. From strategic planning to implementation and optimization, our experts work closely with your team to ensure successful outcomes. We provide in-depth assessments of your current systems and processes, identifying areas for improvement and recommending solutions that align with your goals and budget.',
    shortPoints: [
      'Strategic planning and implementation',
      'In-depth assessments of current systems and processes',
      'Recommendations aligned with goals and budget',
      'IT infrastructure optimization',
      'Regulatory compliance support',
    ],
    detailedDescription: 'Our consulting services cover a wide range of areas, including IT infrastructure, cybersecurity, data management, and regulatory compliance. We also offer project management support to ensure that technology initiatives are delivered on time and within budget. Our goal is to empower your hospital with the tools and knowledge needed to thrive in a rapidly evolving healthcare landscape.',
    detailedPoints: [
      'Cybersecurity assessments and improvements',
      'Data management strategy development',
      'Project management for technology initiatives',
      'Workforce training and development',
      'Continuous improvement and innovation',
    ],
    additionalDescription: 'Additionally, we provide change management services to help your organization adapt to new technologies and processes smoothly. Our consultants work closely with your staff to ensure that changes are implemented effectively and that all team members are comfortable with the new systems.',
    additionalPoints: [
      'Change management services',
      'Effective implementation of new technologies',
      'Staff training and support',
      'Customized solutions to fit your hospital\'s needs',
      'Ongoing consulting and support',
    ],
  },
  {
    id: 'training-and-education',
    icon: 'school',
    title: 'Training and Education',
    description: 'Keeping your staff up-to-date with the latest technologies and best practices is crucial for maintaining high standards of patient care. Our training and education services provide comprehensive programs tailored to the needs of your hospital. We offer both in-person and online training options, covering a wide range of topics, from basic IT skills to advanced clinical applications.',
    shortPoints: [
      'Comprehensive training programs',
      'In-person and online training options',
      'Wide range of topics covered',
      'Customized training plans',
      'Ongoing support and resources',
    ],
    detailedDescription: 'Our training programs are designed to be engaging and practical, ensuring that staff can immediately apply what they have learned. We also provide ongoing support and resources to help your team stay current with new developments and technologies. By investing in training and education, you can enhance staff performance, improve patient outcomes, and foster a culture of continuous improvement within your hospital.',
    detailedPoints: [
      'Engaging and practical training sessions',
      'Immediate application of learned skills',
      'Resources to stay current with new technologies',
      'Enhanced staff performance and patient outcomes',
      'Culture of continuous improvement',
    ],
    additionalDescription: 'We also offer certification programs to validate the skills and knowledge of your staff, ensuring that they meet industry standards. Our training covers the latest best practices and technological advancements, helping your hospital stay at the forefront of healthcare innovation.',
    additionalPoints: [
      'Certification programs for staff',
      'Validation of skills and knowledge',
      'Coverage of latest best practices',
      'Technological advancements in healthcare',
      'Support for hospital\'s growth and innovation',
    ],
  },
]
</script>

<template>
  <div class="relative">
    <img class="hero w-full object-cover" src="/images/hero/technical-solutions.jpg">
    <div class="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 text-center text-white">
      <div class="mx-auto w-full max-w-screen-xl p-3">
        <div class="text-4xl font-bold">
          Our Technical Solutions
        </div>
      </div>
    </div>
  </div>

  <section class="bg-gray-100">
    <div class="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <NuxtLink
        v-for="solution in solutions" :key="solution.title"
        v-slot="{ navigate }" :to="`#${solution.id}`" custom
      >
        <Card @click="navigate">
          <template #header>
            <Icon class="mt-6 text-6xl text-secondary-900" :name="`tabler:${solution.icon}`" />
          </template>
          <template #title>
            {{ solution.title }}
          </template>
          <template #content>
            <p class="line-clamp-3">
              {{ solution.description }}
            </p>
          </template>
        </Card>
      </NuxtLink>
    </div>

    <div class="mx-auto  flex max-w-4xl flex-col gap-4 px-4 py-12">
      <Card v-for="solution in solutions" :id="solution.id" :key="solution.title">
        <template #title>
          {{ solution.title }}
        </template>
        <template #content>
          <div class="mt-2 space-y-4">
            <p>
              {{ solution.description }}
            </p>
            <ul class="ml-6 list-disc space-y-2">
              <li v-for="point in solution.shortPoints" :key="point">
                {{ point }}
              </li>
            </ul>
            <Panel header="Technical Information" toggleable collapsed>
              <p>
                {{ solution.detailedDescription }}
              </p>
              <ul class="ml-6 list-disc space-y-2">
                <li v-for="point in solution.detailedPoints" :key="point">
                  {{ point }}
                </li>
              </ul>
            </Panel>
            <Panel header="Management Benefits" toggleable collapsed>
              <p>
                {{ solution.additionalDescription }}
              </p>
              <ul class="ml-6 list-disc space-y-2">
                <li v-for="point in solution.additionalPoints" :key="point">
                  {{ point }}
                </li>
              </ul>
            </Panel>
          </div>
        </template>
      </card>
    </div>
  </section>
</template>
