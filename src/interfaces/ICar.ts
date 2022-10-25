import { z } from 'zod';
import VehicleZodSchema from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = z.infer<typeof CarZodSchema>;

export default CarZodSchema;