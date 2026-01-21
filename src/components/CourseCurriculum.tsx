import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Lesson = {
  _id: string;
  title: string;
  slug: { current: string };
  isFree?: boolean;
};

type CurriculumModule = {
  number: string;
  title: string;
  slug: { current: string };
  lessons: Lesson[];
};

const CourseCurriculum = ({
  curriculum,
  slug,
}: {
  curriculum: CurriculumModule[];
  slug: string;
}) => {
  return (
    <Accordion type="multiple" className="grid gap-6 md:grid-cols-3">
      {curriculum.map((module) => (
        <AccordionItem
          key={module.number}
          value={module.number}
          className="border-none"
        >
          <Card className="bg-linear-to-br from-background to-muted/40 border-border rounded-xl">
            <AccordionTrigger className="px-6 py-5 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="text-primary font-semibold">
                  {module.number}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {module.title}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-5">
              <ul className="space-y-3 list-disc">
                {module.lessons.map((lesson) => (
                  <li key={lesson.slug.current}>
                    <Link
                      href={`/course/${slug}/${module.slug.current}/${lesson.slug.current}`}
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      {lesson.title}

                      {lesson.isFree && (
                        <Badge variant="secondary" className="text-xs">
                          Free
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseCurriculum;
