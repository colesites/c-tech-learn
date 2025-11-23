import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import blogType from "./blogType";
import authorType from "./authorType";
import coursesType from "./coursesType";
import lessonType from "./lessonType";
import category from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blogType,
    authorType,
    coursesType,
    lessonType,
    category,
  ],
};
