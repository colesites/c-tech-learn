import type { StructureResolver } from "sanity/structure";
import {
  BookIcon,
  UserIcon,
  DocumentIcon,
  FolderIcon,
  CheckmarkIcon,
  LockIcon,
  DocumentsIcon,
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

      S.divider(),

      // Privacy Policy (singleton)
      S.listItem()
        .title("Privacy Policy")
        .icon(LockIcon)
        .child(
          S.document()
            .schemaType("privacyPolicy")
            .documentId("privacyPolicy")
            .title("Privacy Policy")
        ),

      S.divider(),

      // Terms of Service (singleton)
      S.listItem()
        .title("Terms of Service")
        .icon(CheckmarkIcon)
        .child(
          S.document()
            .schemaType("termsOfService")
            .documentId("termsOfService")
            .title("Terms of Service")
        ),

      S.divider(),

      // Privacy Sections
      S.listItem()
        .title("Privacy Sections")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("privacySection").title("Privacy Sections")),

      // Terms Sections
      S.listItem()
        .title("Terms Sections")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("termsSection").title("Terms Sections")),
    ]);
