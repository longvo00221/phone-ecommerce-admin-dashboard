"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Palette, Trash } from "lucide-react";
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
import { SketchPicker } from "react-color";
import privateClient from "@/api/config/private.client";
interface ColorFormProps {
  initialData: any | null;
}
const formSchema = z.object({
  hex: z.string().min(3),
  name: z.string().min(3),
});
type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm = ({ initialData }: ColorFormProps) => {
  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData
    ? "Edit a Color"
    : "Create a new Color for your billboard";
  const action = initialData ? "save changes" : "Create";
  const editColor = initialData ? true : false
  const toastMessage = initialData ? "Changes saved" : "Color Created";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const router = useRouter();
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          hex: "",
          name: "",
        },
  });
  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);
  const onSubmit = async (data: ColorFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {

      } else {
        await privateClient.post(`color/create-color`, data);
      }
      router.refresh();
      router.push(`/color`);
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
      await privateClient.delete(`color/delete-color/${params.colorId}`);
      router.refresh();
      router.push(`/color`);
      toast.success("Color deleted!");
    } catch (error) {
      toast.error("You can't delete a Color containing products");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  const [background, setBackground] = useState<string>("");
  const { setValue } = form;
  const handleChangeComplete = (color: any) => {
    setValue("hex", color.hex);
    setBackground(color.hex);
  };

  const [showPicker, setShowPicker] = useState(false);
  const handleTogglePicker = () => {
    setShowPicker((prevShowPicker) => !prevShowPicker);
  };
  const hidden = showPicker ? "" : "hidden";
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
                  <FormDescription>Label describing your Color</FormDescription>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Color label"
                    
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hex</FormLabel>
                  <FormDescription>Label describing your Color</FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isLoading}
                        placeholder="Color label"
                        {...field}
                      />
                      <div
                        role="button"
                        onClick={handleTogglePicker}
                        className="absolute right-2 top-2 "
                      >
                        <Palette color="red" size={20} />
                      </div>
                      <div
                        className={` rounded-md w-4 h-4  absolute right-10 top-3`}
                        style={{ backgroundColor: background }}
                      ></div>
                      <SketchPicker
                        className={`absolute right-0 ${hidden}`}
                        color={background}
                        onChangeComplete={handleChangeComplete}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

         {!editColor && <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>}
        </form>
      </Form>
    </>
  );
};

export default ColorForm;
