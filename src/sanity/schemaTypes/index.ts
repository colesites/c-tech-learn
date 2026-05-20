import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import blogType from "./blogType";
import authorType from "./authorType";
import coursesType from "./coursesType";
import lessonType from "./lessonType";
import category from "./category";

import { privacyPolicyType } from "./privacyPolicyType";
import { termsOfServiceType } from "./termsOfServiceType";
import { privacySectionType } from "./privacySectionType";
import { termsSectionType } from "./termsSectionType";
import enrollmentType from "./enrollmentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blogType,
    authorType,
    coursesType,
    lessonType,
    category,
    privacyPolicyType,
    termsOfServiceType,
    privacySectionType,
    termsSectionType,
    enrollmentType,
  ],
};
