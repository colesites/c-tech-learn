import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog",
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
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      // alt removed as requested
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readMinutes",
      title: "Read Minutes",
      type: "number",
      description:
        "Estimated reading time in minutes. You can compute this " +
        "automatically in your frontend if you prefer.",
      validation: (Rule) =>
        Rule.min(1)
          .precision(0)
          .error("Read time should be a whole number of minutes."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
      readMinutes: "readMinutes",
      category: "category.title",
    },
    prepare(selection) {
      const { title, author, media, readMinutes, category } = selection;
      return {
        title,
        subtitle: [
          author,
          category,
          readMinutes ? `${readMinutes} min read` : null,
        ]
          .filter(Boolean)
          .join(" • "),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Created Date, Newest",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Created Date, Oldest",
      name: "createdAsc",
      by: [{ field: "_createdAt", direction: "asc" }],
    },
    {
      title: "Updated Date, Newest",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }],
    },
    {
      title: "Updated Date, Oldest",
      name: "updatedAsc",
      by: [{ field: "_updatedAt", direction: "asc" }],
    },
  ],
});
