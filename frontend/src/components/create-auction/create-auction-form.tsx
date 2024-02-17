'use client'

import { ChangeEvent } from 'react'

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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface CreateAuctionFormProps {
  className?: string
  onSuccess?: () => void
}

const createAuctionFormSchema = z.object({
  name: z.string().min(1).max(100),
  tags: z.array(z.string().min(1)),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  description: z.string().min(1).max(400),
})

type CreateAuctionFormValues = z.infer<typeof createAuctionFormSchema>

export function CreateAuctionForm({ onSuccess }: CreateAuctionFormProps) {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.AConnect)

  const queryClient = useQueryClient()

  const form = useForm<CreateAuctionFormValues>({
    resolver: zodResolver(createAuctionFormSchema),
    defaultValues: {
      name: '',
      tags: [],
      difficulty: 'EASY',
      description: '',
    },
  })

  const { reset, handleSubmit } = form

  const submitOffer = async ({ difficulty, ...values }: CreateAuctionFormValues) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }
    try {
      await contractTxWithToast(
        api,
        activeAccount.address,
        contract,
        'createAuction',
        { value: 2000000000000 },
        [values.name, values.description, values.tags],
      )
      reset()
      await queryClient.invalidateQueries({ queryKey: ['auctions'] })
      onSuccess?.()
    } catch (err) {
      console.warn(err)
    }
  }

  const parseTags = (event: ChangeEvent<HTMLInputElement>, field: any) => {
    const inputValue = event.target.value

    field.onChange(inputValue.split(','))
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitOffer)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={form.formState.isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tags"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* TODO: better value picking */}
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  {...field}
                  onChange={(e) => parseTags(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="difficulty"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EASY">EASY</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HARD">HARD</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
