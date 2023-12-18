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
import ImageUpload from "./ui/ImageUpload";
import Select from "react-select";
import { Checkbox } from "./ui/checkbox";
import privateClient from "@/api/config/private.client";

interface ProductFormProps {
  categories: any[];
  brand: any[];
  storage: any[];
  color: any[];
  initialData:
    | (any & {
        img: any[];
      })
    | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  price: z.any(),
  categories: z.array(z.any()),
  brand: z.array(z.any()),
  color: z.array(z.any()),
  storage: z.array(z.any()),
  original_price: z.any(),
  quantity: z.any(),
  screen: z.string(),
  new_release: z.boolean(),
  front_camera: z.string(),
  rear_camera: z.string(),
  chip: z.string(),
  battery: z.string(),
  img: z.array(z.object({ url: z.string() })),
});

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm = ({
  initialData,
  color,
  storage,
  brand,
  categories,
}: ProductFormProps) => {
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Create a new product";
  const action = initialData ? "save changes" : "Create";
  const toastMessage = initialData ? "Changes saved" : "Product Created";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          categories: initialData.categoryBrandMapping
            ? [initialData.categoryBrandMapping.id_category]
            : [],
          brand: initialData.categoryBrandMapping
            ? [initialData.categoryBrandMapping.id_brand]
            : [],
        }
      : {
          name: "",
          price: 0,
          categories: [],
          brand: [],
          color: [],
          storage: [],
          original_price: 0,
          quantity: 0,
          screen: "",
          new_release: false,
          front_camera: "",
          rear_camera: "",
          chip: "",
          battery: "",
          img: [],
        },
  });

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);
  const onSubmit = async (d: ProductFormValues) => {

    const data: ProductFormValues = {
      ...d,
      brand: d.brand.length > 0 ? d.brand[0] : null,
      categories: d.categories.length > 0 ? d.categories[0] : null,
      price:Number(d.price),
      original_price:Number(d.original_price),
      quantity:Number(d.quantity),
    };

    try {
      setIsLoading(true);
      if (initialData) {
        await privateClient.patch(
          `product/update-product/${params?.productId}`,
          data
        );
      } else {
        await privateClient.post(`product/create-product`, data);
      }
      router.refresh();
      router.push(`/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Failed to to save product");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await privateClient.delete(`products/delete-product/${params.productId}`);
      router.refresh();
      router.push(`/products`);
      toast.success("product deleted!");
    } catch (error) {
      toast.error("Failed to delete product");
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
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={
                      Array.isArray(field.value)
                        ? field.value.map((image) => image.url)
                        : []
                    }
                    disabled={isLoading}
                    onChange={(url) =>
                      field.onChange([...(field.value || []), { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...(field.value || []).filter(
                          (item) => item.url !== url
                        ),
                      ])
                    }
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chip</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Chip name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="number" placeholder="10.2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="original_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Original Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Quantity"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="screen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screen</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Screen size"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="front_camera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front Camera</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Front camera details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rear_camera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rear Camera</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Rear camera details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="battery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Battery</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Battery details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    isMulti
                    isDisabled={isLoading}
                    options={categories.map((category) => ({
                      value: category.id_category,
                      label: category.name,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      field.onChange(selectedValues);
                    }}
                    value={categories
                      .filter(
                        (category) =>
                          field.value &&
                          field.value.some(
                            () => field.value[0] === category.id_category
                          )
                      )
                      .map((category) => ({
                        value: category.id_category,
                        label: category.name,
                      }))}
                    placeholder="Select a category"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    isMulti
                    isDisabled={isLoading}
                    options={brand.map((brandItem) => ({
                      value: brandItem.id_brand,
                      label: brandItem.name,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      field.onChange(selectedValues);
                    }}
                    value={brand
                      .filter((brandItem) =>
                        field.value
                          ? field.value.includes(brandItem.id_brand)
                          : false
                      )
                      .map((brandItem) => ({
                        value: brandItem.id_brand,
                        label: brandItem.name,
                      }))}
                    placeholder="Select a brand"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    placeholder="Select colors"
                    isMulti
                    isDisabled={isLoading}
                    options={color.map((color) => ({
                      label: color.name,
                      hex: color.hex,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => ({
                            name: option.label,
                            hex: option.hex,
                          }))
                        : [];

                      field.onChange(selectedValues);
                    }}
                    value={color
                      .filter(
                        (color) =>
                          field.value &&
                          field.value.some((c) => c.name === color.name)
                      )
                      .map((color) => ({
                        label: color.name,
                        hex: color.hex,
                      }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>storage</FormLabel>
                  <Select
                    isMulti
                    placeholder="Select storage"
                    isDisabled={isLoading}
                    options={storage.map((s) => {
                      return {
                        label: s.name,
                      };
                    })}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => ({
                            name: option.label,
                          }))
                        : [];
                      field.onChange(selectedValues);
                    }}
                    value={storage
                      .filter(
                        (storage) =>
                          field.value &&
                          field.value.some((s) => s.name === storage.name)
                      )
                      .map((s) => ({
                        label: s.name,
                      }))}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_release"
              render={({ field }) => (
                <FormItem className="flex items-start flex-row space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>New release</FormLabel>
                    <FormDescription>
                      This product will appear in homepage
                    </FormDescription>
                  </div>
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

export default ProductForm;
