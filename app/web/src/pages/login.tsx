import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { argon2id, argon2Verify } from "argon2-wasm-edge";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default {
  url: "/login",
  page: () => {
    if (localStorage.prasi_uid) {
      location.href = "/ed";
    }

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await _db.user.findFirst({
        where: { username: values.username },
      });
      if (res) {
        const valid = await argon2Verify({
          hash: res.password,
          password: values.password,
        });
        if (valid) {
          localStorage.prasi_uid = res.id;
          location.href = "/ed";
          return;
        }
      }
      alert("Invalid username/password");
    }

    return (
      <div className="p-w-full p-h-screen p-flex p-items-center p-justify-center p-px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="p-min-w-[400px]">
              <CardHeader>
                <CardTitle className="p-text-2xl">Prasi Login</CardTitle>
              </CardHeader>
              <CardContent className="p-space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    );
  },
};
