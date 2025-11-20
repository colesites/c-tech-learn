import { defineField, defineType } from "sanity";

export default defineType({
  name: "courses",
  title: "Courses",
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
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "curriculum",
      title: "Curriculum",
      description:
        "The modules/sections of the course (e.g., '01 Introduction')",
      type: "array",
      of: [
        {
          type: "object",
          name: "module",
          title: "Module",
          fields: [
            defineField({
              name: "title",
              title: "Module Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "lessons",
              title: "Lessons",
              type: "array",
              of: [{ type: "reference", to: [{ type: "lesson" }] }],
            }),
          ],
        },
      ],
    }),
  ],
});
