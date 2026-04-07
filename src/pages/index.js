import Layout from "@/components/Layout";
import { useEffect } from "react";
import Card from "../components/Card";
import IntroCard from "../components/IntroCard";
import ContactsCard from "../components/ContactsCard";
import TimeZone from "../components/TimeZoneCard";
import AboutMe from "../components/AboutMe";
import Now from "../components/Now";
import ContentPlaceholder from "../components/ContentPlaceholder";
import profileData from "@/data/profile.json";
// import Globe from "../components/Globe";

export default function Home() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cards = Array.from(document.querySelectorAll(".card"));
    if (!cards.length) {
      return;
    }

    const duration = 700;
    const staggerDelay = 120;
    const totalAnimationMs = duration + staggerDelay * (cards.length - 1);

    const previousBodyOverflowY = document.body.style.overflowY;
    const previousHtmlOverflowY = document.documentElement.style.overflowY;
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";

    const animations = [];

    cards.forEach((card, index) => {
      const animation = card.animate(
        [
          { transform: "translateY(40%)", opacity: 0 },
          { transform: "translateY(0%)", opacity: 1 },
        ],
        {
          duration,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          delay: index * staggerDelay,
          fill: "both",
        }
      );
      animations.push(animation);
    });

    const unlockOverflow = () => {
      document.body.style.overflowY = previousBodyOverflowY;
      document.documentElement.style.overflowY = previousHtmlOverflowY;
    };

    const timeoutId = window.setTimeout(unlockOverflow, totalAnimationMs + 50);

    return () => {
      window.clearTimeout(timeoutId);
      animations.forEach((animation) => animation.cancel());
      unlockOverflow();
    };
  }, []);

  return (
    <Layout
      description={profileData.site.description}
      title={profileData.site.title}
      seoProfile={profileData.seo}
    >
      <main
        className="text-white m-auto p-2 grid gap-2 max-w-6xl relative w-full sm:p-4 sm:gap-2 md:grid-cols-[1fr_1fr_0.9fr] md:gap-3 md:p-6 lg:grid-cols-4 lg:gap-4"
      >
        <IntroCard intro={profileData.intro} />
        <AboutMe about={profileData.about} />
        <ContactsCard contacts={profileData.contacts} />
        <TimeZone timeZone={profileData.timeZone} />
        <Now nowInfo={profileData.now} />
        <Card
          colorText="text-neutral-100"
          colSpan="md:col-span-1"
          href={profileData.sections.schoolAssignment.href}
          rowSpan="md:row-span-1"
          target={profileData.sections.schoolAssignment.target}
          title={profileData.sections.schoolAssignment.title}
        >
          <div className="flex h-full items-center justify-center rounded bg-darkslate-400/30 p-2">
            {/* <Globe client:load /> */}
            <p className="text-xs font-light text-neutral-200">
              {profileData.sections.schoolAssignment.placeholder}
            </p>
          </div>
        </Card>
        <ContentPlaceholder
          title={profileData.sections.comingSoon.title}
          message={profileData.sections.comingSoon.message}
          cta={profileData.sections.comingSoon.cta}
        />
        <Card colSpan="md:col-span-1" rowSpan="md:row-span-1">
          <div className="relative min-h-[44px] overflow-hidden">
            <footer className="absolute inset-0 text-xs opacity-100 translate-y-0 transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:opacity-0 group-focus-within:-translate-y-3 group-focus-within:opacity-0">
              © {profileData.site.footer.year} · {profileData.site.footer.prefix}{" "}
              <a
                className="text-red-500"
                href={profileData.site.footer.frameworkUrl}
                target="_blank"
              >
                {profileData.site.footer.frameworkName}
              </a>{" "}
              by {profileData.site.footer.author}.
            </footer>
            <footer
              id="original-designer"
              className="absolute inset-0 text-xs opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              © 2024 · Originally Crafted with ♥️ using Astro by Gianmarco · See <a href="https://github.com/Ladvace/astro-bento-portfolio" target="_blank" rel="noreferrer" className="font-bold font-italic text-red-500">here</a>
            </footer>
          </div>
        </Card>
      </main>
    </Layout>
  );
}
