import { z } from 'zod';
import VehicleZodSchema from './IVehicle';

const CATEGORY = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(CATEGORY),
  engineCapacity: z.number().max(2500),
});

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export default MotorcycleZodSchema;