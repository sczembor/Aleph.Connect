'use client'

import { TZERO_MULTIPLIER } from '@/constants/tzero-multiplier'
import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

interface SubmitOfferFormProps {
  className?: string
  onSuccess?: () => void
  auctionId: string
}

const submitOfferFormSchema = z.object({
  estimation: z.coerce.number().min(1),
  reward: z.coerce.number().min(1),
  message: z.string().max(400),
})

type SubmitOfferFormValues = z.infer<typeof submitOfferFormSchema>

export function SubmitOfferForm({ onSuccess, auctionId }: SubmitOfferFormProps) {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.AConnect)

  const queryClient = useQueryClient()

  const form = useForm<SubmitOfferFormValues>({
    resolver: zodResolver(submitOfferFormSchema),
  })

  const { reset, handleSubmit } = form

  const submitOffer = async (values: SubmitOfferFormValues) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'createOffer', {}, [
        values.message,
        values.estimation,
        values.reward * TZERO_MULTIPLIER,
        auctionId,
      ])
      reset()
      await queryClient.invalidateQueries({ queryKey: ['offers'] })
      onSuccess?.()
    } catch (err) {
      console.warn(err)
    }
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
              <FormLabel>Reward (in TZERO)</FormLabel>
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
