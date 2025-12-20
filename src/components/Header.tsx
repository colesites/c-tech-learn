import Logo from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import UserDropdownMenu from "./UserDropdownMenu";
import { getSession } from "@/lib/auth-server";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Header() {
  return (
    <header>
      <MaxWidthWrapper>
        <nav className="py-3 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <NavMenu />
          </div>
          <div className="flex items-center gap-2">
            <Suspense fallback={<Spinner className="size-6" />}>
              <GetDesktopUserDropdownMenu />
            </Suspense>
            <ThemeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center justify-center">
              <Sheet>
                <SheetTrigger>
                  <Menu className="cursor-pointer size-6" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="pt-10">
                    <SheetTitle hidden>Menu</SheetTitle>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="home">
                        <AccordionTrigger className="text-xl font-medium">
                          Home
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-y-2 mt-2 pl-2 text-lg">
                          <Link href="#about">About</Link>
                          <Link href="#courses">Courses</Link>
                          <Link href="#how-it-works">How It Works</Link>
                          <Link href="#pricing">Pricing</Link>
                          <Link href="#testimonials">Testimonials</Link>
                          <Link href="#blogs">Blogs</Link>
                          <Link href="#community">Community</Link>
                          <Link href="#faq">FAQ</Link>
                          <Link href="#contact">Contact</Link>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="courses">
                        <AccordionTrigger className="text-xl font-medium">
                          Courses
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-y-2 mt-2 pl-2 text-lg">
                          <Link href="/all-courses">All Courses</Link>
                          <Link href="/course/html">HTML</Link>
                          <Link href="/course/css">CSS</Link>
                          <Link href="/course/javascript">JavaScript</Link>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="dashboard" className="py-4">
                        <Link href="/dashboard" className="text-xl font-medium">
                          Dashboard
                        </Link>
                      </AccordionItem>
                      <AccordionItem value="resources">
                        <AccordionTrigger className="text-xl font-medium">
                          Resources
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-y-2 mt-2 pl-2 text-lg">
                          <Link href="/learning-paths">Learning Paths</Link>
                          <Link href="/quiz">Quiz</Link>
                          <Link href="/blog">Blog</Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </SheetHeader>
                  <SheetFooter>
                    <Suspense fallback={<Spinner className="size-6" />}>
                      <GetMobileUserDropdownMenu />
                    </Suspense>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}

async function GetDesktopUserDropdownMenu() {
  const session = await getSession();

  return (
    <>
      {session ? (
        <UserDropdownMenu />
      ) : (
        <div className="hidden md:flex items-center gap-2">
          <Link href="/sign-in">
            <Button className="xl:text-lg">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="xl:text-lg">Get Started</Button>
          </Link>
        </div>
      )}
    </>
  );
}

async function GetMobileUserDropdownMenu() {
  const session = await getSession();

  return (
    <>
      {session ? null : (
        <div className="flex justify-end items-center gap-2">
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      )}
    </>
  );
}
