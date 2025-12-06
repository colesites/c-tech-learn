import { defineField, defineType } from "sanity";

export const privacyPolicyType = defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Privacy Policy",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      description: "A brief introduction or commitment statement.",
    }),
    defineField({
      name: "sections",
      title: "Policy Sections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "privacySection" }] }],
    }),
  ],
});
