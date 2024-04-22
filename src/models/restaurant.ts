// errors
import { z } from "zod";

export const restaurantSchema = z.object({
    name: z.string({
    required_error: "name es requerido",
    invalid_type_error: "name debe ser un string",
  }),

  address: z
    .string({
      required_error: "address es requerido",
      invalid_type_error: "address debe ser un string",
    }),
    
    category: z
    .string({
        required_error: "category es requerido",
        invalid_type_error: "category debe ser un string",
      }),
});

export type RestaurantParams = z.infer<typeof restaurantSchema>;

export type Restaurant = RestaurantParams & { id: number };

export interface UpdateRestaurantParams {
  id: number;
  fieldsToUpdate: Record<string, any>;
}

