import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import blogType from "./blogType";
import authorType from "./authorType";
import coursesType from "./coursesType";
import lessonType from "./lessonType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, authorType, coursesType, lessonType],
};
