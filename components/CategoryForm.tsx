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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/alertModal";
import privateClient from "@/api/config/private.client";

interface CategoryFormProps {
  initialData: any | null;
}
const formSchema = z.object({
  name: z.string().min(3),
});
type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData
    ? "Edit a Category"
    : "Create a new Category for your billboard";
  const action = initialData ? "save changes" : "Create";
  const toastMessage = initialData ? "Changes saved" : "Category Created";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          name: "",
        },
  });
  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      
      if (initialData) {
        await privateClient.put(`category/update-category/${params?.categoryId}`, data);
      } else {
        await privateClient.post(`category/create-category`, data);
      }
      router.refresh();
      router.push(`/categories`);
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
      await privateClient.delete(`category/delete-category/${params.categoryId}`);
      router.refresh();
      router.push(`/categories`);
      toast.success("category deleted!");
    } catch (error) {
      toast.error("You can't delete a category containing products");
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
                    Label describing your category
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category label"
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

export default CategoryForm;
