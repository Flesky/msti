<script setup lang="ts">
import { zodResolver } from '@primeuix/forms/resolvers/zod'
import { Form } from '@primevue/forms'
import { z } from 'zod'

const route = useRoute()
const { checkout: isCheckingOut } = route.query
const { checkout } = useCartStore()
const message = ref()

if (isCheckingOut === 'true') {
  message.value = checkout()
}

console.log(message.value)
const SUBJECTS = ['General Inquiry', 'Sales Inquiry', 'Support Inquiry', 'Partnership Inquiry', 'Others'] as const
const subjects = SUBJECTS.map(subject => ({ label: subject }))
const PHONE_NUMBER_FORMATS = [
  { label: 'USA (+1)', code: '+1', mask: '(999) 999-9999' },
  { label: 'UK (+44)', code: '+44', mask: '99999 999999' },
  { label: 'Australia (+61)', code: '+61', mask: '999 999 999' },
  { label: 'Philippines (+63)', code: '+63', mask: '999 999 9999' },
]

const initialValues = ({
  subject: subjects[1],
  name: '',
  email: '',
  company: '',
  position: '',
  countryCode: PHONE_NUMBER_FORMATS[3],
  phoneNumber: '',
  message: message.value,
})

const schema = z.object({
  // Subject must be one of SUBJECTS
  subject: z.object({ label: z.string() }),
  // .refine(value => SUBJECTS.includes(value.label), {
  //   message: 'Invalid subject',
  // }),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  company: z.string().optional(),
  position: z.string().optional(),
  countryCode: z.object({
    label: z.string(),
    code: z.string(),
    mask: z.string(),
  }).refine(
    value =>
      PHONE_NUMBER_FORMATS.some(
        format =>
          format.label === value.label
          && format.code === value.code
          && format.mask === value.mask,
      ),
    {
      message: 'Invalid phone number prefix',
    },
  ),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
})
  .superRefine((data, ctx) => {
    const { countryCode, phoneNumber } = data

    const format = PHONE_NUMBER_FORMATS.find(f => f.code === countryCode.code)
    if (!format) {
      ctx.addIssue({
        message: 'Invalid phone number prefix',
        path: ['countryCode'],
        code: z.ZodIssueCode.invalid_type,
      })
    }

    const mask = format.mask

    function maskToRegex(mask: string) {
      const regexString
            = `^${
              mask
                .replace(/[().\-\s]/g, '\\$&')
                .replace(/9/g, '\\d')
            }$`
      return new RegExp(regexString)
    }

    const phoneRegex = maskToRegex(mask)

    if (!phoneRegex.test(phoneNumber)) {
      ctx.addIssue({
        message: 'Invalid phone number format',
        path: ['phoneNumber'],
        code: z.ZodIssueCode.invalid_type,
      })
    }
  })
const resolver = zodResolver(schema)

// https://api.medsol.technology/api/submit
// const example = { subject: 'Sales Inquiry', name: 'Test', email: 'qbmrodrigo@gmail.com', company: '', position: '', countryCode: '+63', phone: '+639999999999', message: 'Test' }

type Schema = z.infer<typeof schema>
const formValues = ref<Schema>()

const { execute, status } = useFetch('https://api.medsol.technology/api/submit', {
  method: 'POST',
  body: formValues,
  immediate: false,
  server: false,
})

const toast = useToast()
function handleSubmit({ values }: { values: Schema }) {
  const preprocessedValues = values
  preprocessedValues.phoneNumber = `${values.countryCode.code}${values.phoneNumber}`
  formValues.value = preprocessedValues
  execute().then(() => {
    toast.add({ severity: 'success', summary: `Your message has been sent.`, detail: 'Please expect a response from us soon.', life: 3000 })
  })
}
</script>

<template>
  <div class="bg-secondary-100 p-4">
    <div class="mx-auto flex max-w-screen-xl flex-col md:flex-row">
      <section class="w-full rounded-t-lg border bg-white p-6 md:rounded-l-lg">
        <h1>
          Send us a message
        </h1>

        <ClientOnly>
          <Form v-slot="$form" :resolver class="mt-4 flex flex-col" :initial-values @submit="handleSubmit">
            <label for="subject">Subject</label>
            <Select name="subject" :options="subjects" option-label="label" placeholder="Select a subject" />
            <Message v-if="$form.subject?.invalid" severity="error" size="small" variant="simple">
              {{ $form.subject.error.message }}
            </Message>

            <label for="name">Name *</label>
            <InputText name="name" placeholder="Your name" />
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
              {{ $form.name.error.message }}
            </Message>

            <label for="email">Email address *</label>
            <InputText name="email" placeholder="Your email address" />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{ $form.email.error.message }}
            </Message>

            <label for="company">Company</label>
            <InputText name="company" placeholder="Your company" />

            <label for="position">Position</label>
            <InputText name="position" placeholder="Your position" />

            <label for="phone">Phone number *</label>
            <InputGroup>
              <Select name="countryCode" class="max-w-32" :options="PHONE_NUMBER_FORMATS" option-label="label">
                <template #value="{ value }">
                  {{ value ? value?.code : undefined }}
                </template>
              </Select>
              <InputMask v-if="$form.countryCode?.value.mask" name="phoneNumber" :mask="$form.countryCode.value.mask" placeholder="Your phone number" />
            </InputGroup>
            <Message v-if="$form.phoneNumber?.invalid" severity="error" size="small" variant="simple">
              {{ $form.phoneNumber.error.message }}
            </Message>

            <label for="message">Message *</label>
            <Textarea name="message" rows="5" placeholder="Enter your inquiry here" />
            <Message v-if="$form.message?.invalid" severity="error" size="small" variant="simple">
              {{ $form.message.error.message }}
            </Message>

            <Button :disabled="status === 'pending'" :loading="status === 'pending'" type="submit" class="mt-12">
              Send message
            </Button>
          </Form>
        </ClientOnly>
      </section>

      <section class="w-full rounded-b-lg bg-secondary-950 p-6 pb-20 text-white md:rounded-r-lg">
        <h1>Contact Information</h1>

        <p class="mt-4">
          Reach out to us for any queries, feedback, or support. We are here to assist you!
        </p>

        <div class="mt-8 flex items-center gap-3">
          <Icon class="shrink-0 text-2xl" name="tabler:map-pin-filled" />
          <div class="font-bold">
            Triple M Bldg., Australia St., Doña Soledad Ave., Better Living Subd., Parañaque City 1711 Philippines
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply mt-4 mb-1 font-medium;
}

h1 {
  @apply text-2xl font-bold;
}
</style>
