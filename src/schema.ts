import { z } from "zod";

export const insertRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^((\+971)|0)?5[024568]\d{7}$/, "Must be a valid UAE mobile number"),
  department: z.string().min(1, "Department is required"),
  gender: z.enum(["male", "female"]),
  parentTshirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  bringingKids: z.boolean(),
  numberOfKids: z.number().min(0).optional(),
  kids: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(0).max(18),
    gender: z.enum(["male", "female"]),
    tshirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"])
  })).optional(),
  entertainmentSports: z.array(z.string()).optional(),
  interestedInCompeting: z.boolean(),
  competitiveSports: z.array(z.string()).optional(),
  lastExercise: z.string().optional(),
  medicalConditions: z.array(z.string()).optional(),
  currentMedications: z.string().optional(),
  previousInjuries: z.string().optional(),
  physicalLimitations: z.string().optional(),
  healthConcerns: z.string().optional(),
  // Physical Activity Readiness Questionnaire
  hasMedicalConditions: z.boolean().optional(),
  hasHeartCondition: z.boolean().optional(),
  hasChestPain: z.boolean().optional(),
  hasBalanceIssues: z.boolean().optional(),
  // Medical Details
  hasOtherHealthInfo: z.boolean().optional(),
  isTakingMedications: z.boolean().optional(),
  hasImmediateHealthConcerns: z.boolean().optional(),
  // Declaration
  guardianName: z.string().optional(),
  guardianSignature: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  doctorClearance: z.boolean()
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>; 