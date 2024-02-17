'use client'

import { ChangeEvent } from 'react'

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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface CreateAuctionFormProps {
  className?: string
}

const createAuctionFormSchema = z.object({
  name: z.string().min(1).max(100),
  tags: z.array(z.string().min(1)),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  description: z.string().min(1).max(400),
})

type CreateAuctionFormValues = z.infer<typeof createAuctionFormSchema>

export function CreateAuctionForm({ className }: CreateAuctionFormProps) {
  const form = useForm<CreateAuctionFormValues>({
    resolver: zodResolver(createAuctionFormSchema),
    defaultValues: {
      name: '',
      tags: [],
      difficulty: 'EASY',
      description: '',
    },
  })

  const { register, reset, handleSubmit, watch, formState } = form

  const submitOffer = (values: CreateAuctionFormValues) => {
    console.log(values)
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
