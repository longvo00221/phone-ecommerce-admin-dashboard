"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

// Import Form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import publicClient from "@/api/config/public.client";

const formSchema = z.object({
  email: z.string().min(1).max(50).email(),
  password: z.string().min(1).max(50),
});
type LoginFormValues = z.infer<typeof formSchema>;
const LoginForm: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await publicClient.post(
        "auth/login",
        data
      );
      const userData = response.data.content;
      if (userData.role) {
        if (typeof window !== "undefined") {

          localStorage.setItem("user", JSON.stringify(userData));
        }
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error("Please contact admin for more information");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="shadow-md w-[500px] p-10">
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-2xl text-center">Admin Phone Store Dashboard</h2>
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username" className="font-bold">Email</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="font-bold mb-2">Password</FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
