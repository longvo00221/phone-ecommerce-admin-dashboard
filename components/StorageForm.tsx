"use client";

import { useState } from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/alertModal";

interface StorageFormProps {
  initialData: any[] | null;
}
const formSchema = z.object({
  name: z.string().min(3),
});
type StorageFormValues = z.infer<typeof formSchema>;

const StorageForm = ({ initialData }: StorageFormProps) => {
  const title = initialData ? "Edit Storage" : "Create Storage";
  const description = initialData
    ? "Edit a Storage"
    : "Create a new Storage for your billboard";
  const action = initialData ? "save changes" : "Create";
  const toastMessage = initialData ? "Changes saved" : "Storage Created";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const initialDataObject = initialData
  ? {
      name: initialData[0]?.name || "",
    }
  : {};
  const form = useForm<StorageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataObject
  });

  const onSubmit = async (data: StorageFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/categories/${params?.StorageId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
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
      await axios.delete(
        `/api/${params.storeId}/categories/${params.StorageId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Storage deleted!");
    } catch (error) {
      toast.error("You can't delete a Storage containing products");
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
          <div className="grid sm:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>
                    Label describing your Storage
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Storage label"
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

export default StorageForm;
