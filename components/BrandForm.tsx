"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/alertModal";
import ImageUpload from "./ui/ImageUpload";
import privateClient from "@/api/config/private.client";

interface BrandFormProps {
  initialData: any | null;
}
const formSchema = z.object({
  banner: z.string().min(1),
  name: z.string().min(3),
});
type BrandFormValues = z.infer<typeof formSchema>;

const BrandForm = ({ initialData }: BrandFormProps) => {
  const title = initialData ? "Edit brand" : "Create brand";
  const description = initialData
    ? "Edit a brand"
    : "Create a new brand";
  const action = initialData ? "save changes" : "Create";
  const toastMessage = initialData ? "Changes saved" : "brand Created";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData?initialData:{
      name:"",
      banner:""
    }
  });
  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await privateClient.patch(
          `brand/update-brand/${params?.brandId}`
        );
      } else {
        await privateClient.post(`brand/create-brand`, data);
      }
      router.refresh();
      router.push(`/brand`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Failed to to save settings");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await privateClient.delete(
        `brand/delete-brand/${params.brandId}`
      );
      router.refresh();
      router.push(`/brand`);
      toast.success("brand deleted!");
    } catch (error) {
      toast.error("You can't delete brand with categories and products");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        isOpen={isOpen}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={() => setIsOpen(true)}
            size="sm"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="brand label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BrandForm;
