import { z } from 'zod';

export type TabName = "about" | "login" | "pricing";

const createItinerarySchema = z.object({
    addNameAndDescription: z.object({
      name: z
        .string()
        .min(1, "Itinerary name must be greater than 1 character")
        .max(64, "Itinerary name cannot be greater than 64 characters"),
      description: z
        .string()
        .max(256, "Description cannot exceed 256 characters.")
        .optional(),
    }).refine((fields) => fields.name !== '', 'Please enter a name.'),
    addEvents: z.object({
      events: z.array(
        z.object({
          name: z
            .string()
            .min(1, "Event name must be greater than 1 character")
            .max(64, "Event name cannot be greater than 64 characters"),
          start: z.string().refine((value) => {
            if (value.includes(":")) {
              if (value.split(":").length === 2) {
                return true;
              }
            }
            return false;
          }, "Invalid time."),
          end: z.string().refine((value) => {
            if (value.includes(":")) {
              if (value.split(":").length === 2) {
                return true;
              }
            }
            return false;
          }, "Invalid time."),
          link: z.string().refine((value) => {
            return true;
          }),
        }),
      ),
    }),
    inviteAttendees: z.object({
      attendees: z.array(
        z.object({
          name: z
            .string()
            .min(1, "Name must be greater than 1 character")
            .max(64, "Name cannot be greater than 64 characters"),
          contactInfo: z
            .object({
              email: z
                .string()
                .email('Please enter a valid email address or a valid phone number.'),
              phone: z
                .string()
                .optional()
            })
            .partial()
            .refine(({ email, phone }) => {
              console.log(Boolean(!(email || phone)))
              return Boolean((email || phone));
            }, "Please enter an email address or a phone number."),
        }),
      ),
    }),
  });

export { createItinerarySchema }
