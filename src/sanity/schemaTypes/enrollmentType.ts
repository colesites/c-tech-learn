import { defineField, defineType } from "sanity";

export default defineType({
  name: "enrollment",
  title: "Enrollment",
  type: "document",
  fields: [
    defineField({
      name: "userEmail",
      title: "User Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "courses" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "progress",
      title: "Progress Percentage",
      type: "number",
      description: "0 to 100",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "completedLessons",
      title: "Completed Lessons",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
    }),
    defineField({
      name: "lastAccessedAt",
      title: "Last Accessed At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "course.title",
      subtitle: "userEmail",
    },
  },
});
