/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { Itinerary, Prisma } from "@prisma/client";
import { createItinerarySchema } from "@/types";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */

const defaultItinerarySelect = {
  name: true,
  date: true,
} satisfies Prisma.ItinerarySelect;

export const itineraryRouter = router({
  create: publicProcedure
    .input(
      z.object({
        date: z.date(),
        userInput: createItinerarySchema,
      })
    )
    .mutation(async ({
      input: {
        date,
        userInput: {
          addNameAndDescription: {
            name: itineraryName,
            description: itineraryDescription
          },
          addEvents: {
            events,
          },
          inviteAttendees: {
            attendees,
          }
        }
      }
    }) => {
      await prisma.$executeRaw`
        SELECT create_itinerary(
          ${date}::TIMESTAMP,
          ${itineraryName}::VARCHAR(64),
          ${itineraryDescription}::VARCHAR(256),
          ARRAY[${events.map(({ name }) => `'${name}'`).join(', ')}]::VARCHAR(64)[],
          ARRAY[${events.map(({ start }) => `'${start}'`).join(', ')}]::VARCHAR(5)[],
          ARRAY[${events.map(({ end }) => `'${end}'`).join(', ')}]::VARCHAR(5)[],
          ARRAY[${events.map(({ link }) => `'${link}'`).join(', ')}]::VARCHAR(255)[],
          ARRAY[${attendees.map(({ name }) => `'${name}'`).join(', ')}]::VARCHAR(64)[],
          ARRAY[${attendees.map(({ contactInfo: { email } }) => `'${email}'`).join(', ')}]::VARCHAR(255)[]
        )
      `;
      
      // Return the created itinerary
      return prisma.itinerary.findUnique({
        where: {
          name_date: {
            name: itineraryName,
            date: date.toISOString().slice(0, 10),
          },
        },
        select: defaultItinerarySelect,
      });
    }),
});
