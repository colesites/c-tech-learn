import type { StructureResolver } from "sanity/structure";
import {
  BookIcon,
  UserIcon,
  UsersIcon,
  DocumentIcon,
  DocumentsIcon,
} from "@sanity/icons";
import { GiPathDistance } from "react-icons/gi";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Courses")
        .icon(BookIcon)
        .child(S.document().schemaType("courses").documentId("courses")),

      S.divider(),

      S.listItem()
        .title("Lessons")
        .icon(DocumentIcon)
        .child(S.document().schemaType("lesson").documentId("lesson")),

      S.divider(),

      S.listItem()
        .title("Author")
        .icon(UserIcon)
        .child(S.document().schemaType("author").documentId("author")),

      S.divider(),

      S.listItem()
        .title("Blog")
        .icon(BookIcon)
        .child(S.document().schemaType("blog").documentId("blog")),

      S.divider(),
    ]);
