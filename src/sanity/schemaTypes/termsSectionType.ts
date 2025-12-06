import { defineField, defineType } from "sanity";

export const termsSectionType = defineType({
  name: "termsSection",
  title: "Terms Section",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Section Number",
      type: "string",
      description: "e.g., '1', '2', or '1.0'",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
