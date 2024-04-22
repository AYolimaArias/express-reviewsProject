import { z } from "zod";

export const reviewSchema = z.object({
    score: z.number({
        required_error: "score es requerido",
        invalid_type_error: "score debe ser un number",
    }),
    title: z.string({
        required_error: "title es requerido",
        invalid_type_error: "title debe ser un string",
    }),
    description: z.string({
        required_error: "description es requerido",
        invalid_type_error: "description debe ser un string",
    }),
});

export type ReviewParams = z.infer<typeof reviewSchema>;

export type Review = {
    id?: number;
    userId: number; 
    restaurantId: number;
} & ReviewParams;

