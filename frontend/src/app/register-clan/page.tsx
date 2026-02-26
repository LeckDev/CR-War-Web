"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Crucial pour image_6cf982.png
import { useAuth } from "@clerk/nextjs";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  tag: z.string().startsWith('#', "Le tag doit comment par '#'"),
  warningThreshold: z.number().min(0).max(3600, "Points maximum: 3600"),
  promotionThreshold: z.number().min(0).max(3600, "Points maximum: 3600"),
});

// Extraction du type pour TypeScript
type FormValues = z.infer<typeof formSchema>;

export default function RegisterClanPage() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  // 2. Initialisation du hook avec le type FormValues
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tag: "",
      warningThreshold: 0,
      promotionThreshold: 0
    }
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:5225/api/clans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) alert("Clan enregistré !");
    } catch (err) {
      alert("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader>
          <CardTitle>Enregistrer mon Clan</CardTitle>
          <CardDescription>Paramètres de guerre de clan.</CardDescription>
        </CardHeader>

        {/* 3. LE CERVEAU : On enveloppe la Card dans le provider Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">

              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag du Clan</FormLabel>
                    <FormControl>
                      <Input placeholder="#ABC123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row gap-4 mb-4 items-start">
                <FormField
                  control={form.control}
                  name="warningThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points minimum</FormLabel>
                      <FormControl>
                        <Input type="number" {...field}
                          onChange={(event) => field.onChange(Number(event.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promotionThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promotion</FormLabel>
                      <FormControl>
                        <Input type="number" {...field}
                          onChange={(event) => field.onChange(Number(event.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Vérification..." : "Enregistrer"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}