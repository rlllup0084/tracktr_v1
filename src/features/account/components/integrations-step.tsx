'use client'

import { Form, useForm } from "react-hook-form";
import { AccountStepProps } from "../interface";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    currentEmployer: z.string().min(2, {
      message: "Employer name must be at least 2 characters.",
    }),
    jobTitle: z.string().min(2, {
      message: "Job title must be at least 2 characters.",
    }),
    yearsOfExperience: z.string().regex(/^\d+$/, {
      message: "Please enter a valid number.",
    }),
    employmentStatus: z.string(),
  })

const IntegrationsStep = ({ onLoadingChange, onSubmit }: AccountStepProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })
    return ( 
        <div>Integrations step
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="step-3-form" className="space-y-8">
        <FormField
          control={form.control}
          name="currentEmployer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Employer</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
        </div>
     );
}
 
export default IntegrationsStep;