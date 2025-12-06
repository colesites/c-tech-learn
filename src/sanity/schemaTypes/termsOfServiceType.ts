import { defineField, defineType } from "sanity";

export const termsOfServiceType = defineType({
  name: "termsOfService",
  title: "Terms of Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Terms of Service",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      description: "A brief introduction or agreement statement.",
    }),
    defineField({
      name: "sections",
      title: "Terms Sections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "termsSection" }] }],
    }),
  ],
});
