import type { StructureResolver } from "sanity/structure";
import {
  BookIcon,
  UserIcon,
  DocumentIcon,
  DocumentsIcon,
  FolderIcon,
} from "@sanity/icons";

// Structure builder
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Courses (collection)
      S.listItem()
        .title("Courses")
        .icon(BookIcon)
        .child(S.documentTypeList("courses").title("Courses")),

      S.divider(),

      // Lessons (collection)
      S.listItem()
        .title("Lessons")
        .icon(DocumentIcon)
        .child(S.documentTypeList("lesson").title("Lessons")),

      S.divider(),

      // Authors (collection)
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("Authors")),

      S.divider(),

      // Blog posts (collection)
      S.listItem()
        .title("Blog")
        .icon(BookIcon)
        .child(S.documentTypeList("blog").title("Blog")),

      S.divider(),

      // Categories (collection)
      S.listItem()
        .title("Categories")
        .icon(FolderIcon)
        .child(S.documentTypeList("category").title("Categories")),
    ]);
