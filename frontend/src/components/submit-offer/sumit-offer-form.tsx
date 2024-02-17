'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface SubmitOfferFormProps {
  className?: string
}

const submitOfferFormSchema = z.object({
  estimation: z.coerce.number().min(1),
  reward: z.coerce.number().min(1),
  message: z.string().max(400),
})

type SubmitOfferFormValues = z.infer<typeof submitOfferFormSchema>

export function SubmitOfferForm({ className }: SubmitOfferFormProps) {
  const form = useForm<SubmitOfferFormValues>({
    resolver: zodResolver(submitOfferFormSchema),
  })

  const { register, reset, handleSubmit, watch, formState } = form

  const submitOffer = (values: SubmitOfferFormValues) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitOffer)}>
        <FormField
          name="estimation"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work time estimation (in hours)</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  type="number"
                  min={0}
                  placeholder="40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="reward"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* TODO: better value picking */}
              <FormLabel>Reward</FormLabel>
              <FormControl>
                <Input disabled={form.formState.isSubmitting} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea disabled={form.formState.isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary font-bold"
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
