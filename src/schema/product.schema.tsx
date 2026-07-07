import z from "zod";

export const CreateProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce
    .number("Must be positive number")
    .positive("Must be positive")
    .min(1),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Description is required"),
  image: z.url("URL format is required").min(1, "Image url is required"),
});

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
export type CreateProduct = z.infer<typeof CreateProductSchema>;
