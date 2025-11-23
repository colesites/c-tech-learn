import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    // Optional: emoji or color label to style in the Studio/UI
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "Optional icon for this category (e.g., 🚀, 🧰).",
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: { title: "title", emoji: "emoji" },
    prepare({ title, emoji }) {
      return {
        title: [emoji, title].filter(Boolean).join(" "),
      };
    },
  },
});
