"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All Courses",
    href: "/all-courses",
    description: "Explore all our tech courses and start learning today.",
  },
  {
    title: "HTML",
    href: "/course/html",
    description: "Build the structure of the web - one tag at a time.",
  },
  {
    title: "CSS",
    href: "/course/css",
    description: "Style and design beautiful, responsive websites.",
  },
  {
    title: "JavaScript",
    href: "/course/javascript",
    description: "Bring your websites to life with interactive functionality.",
  },
];

export function NavMenu() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[900px] lg:grid-cols-[.75fr_1fr_1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      C Tech Learn
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Learn. Build. Grow.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#about" title="About">
                Who we are and what we do
              </ListItem>
              <ListItem href="#pricing" title="Pricing">
                Our pricing plans
              </ListItem>
              <ListItem href="#community" title="Community">
                Join our community
              </ListItem>
              <ListItem href="#courses" title="Courses">
                Our courses and what they cover
              </ListItem>
              <ListItem href="#testimonials" title="Testimonials">
                What our students say
              </ListItem>
              <ListItem href="#faq" title="FAQ">
                Frequently asked questions
              </ListItem>
              <ListItem href="#how-it-works" title="How It Works">
                How our courses work
              </ListItem>
              <ListItem href="#blog" title="Blog">
                Read our latest blog posts
              </ListItem>
              <ListItem href="#contact" title="Contact">
                Get in touch with us
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/dashboard">Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/learning-paths">
                    <div className="font-medium">Learning Paths</div>
                    <div className="text-muted-foreground">
                      Follow a structured path to mastery.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/quiz">
                    <div className="font-medium">Quiz</div>
                    <div className="text-muted-foreground">
                      Test your knowledge with interactive quizzes.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/blog">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
