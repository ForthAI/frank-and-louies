import { storyIntro, family, banter } from "@/content/story";
import { images } from "@/content/images";
import { Reveal } from "@/components/brand/Reveal";
import { SmartImage } from "@/components/brand/SmartImage";
import { SpeechBubble } from "@/components/brand/SpeechBubble";
import { FacesMark } from "@/components/brand/FacesMark";

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-fl grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image collage */}
        <Reveal className="relative order-2 lg:order-1">
          <SmartImage
            src={images.storyFamily}
            alt="Frank, Louie and Robin behind the counter at Frank & Louie's"
            label="The Family"
            tone="turquoise"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="aspect-[4/3] w-full max-w-md rounded-[1.75rem] shadow-[0_40px_80px_-32px_rgba(43,43,43,0.4)] ring-1 ring-black/5"
            objectPosition="center"
          />
          <div className="absolute -right-2 -bottom-8 w-44 rotate-3 sm:-right-8 sm:w-52">
            <SmartImage
              src={images.storyBrothers}
              alt="Brothers Frank and Louie"
              label="Frank & Louie"
              tone="coral"
              sizes="13rem"
              className="aspect-square w-full rounded-2xl border-4 border-white shadow-xl"
              objectPosition="center top"
            />
          </div>
          <FacesMark
            aria-hidden
            className="absolute -top-7 -left-6 size-16 -rotate-6 text-turquoise/15"
          />
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal className="flex items-center gap-3">
            <SpeechBubble from="frank" tail="left">
              {banter.intro.frank}
            </SpeechBubble>
            <SpeechBubble from="louie" tail="left">
              {banter.intro.louie}
            </SpeechBubble>
          </Reveal>

          <Reveal delay={80}>
            <span className="eyebrow mt-6 block text-coral">{storyIntro.eyebrow}</span>
            <h2 className="mt-3 display-md text-charcoal text-balance">
              {storyIntro.headline}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/90 text-pretty">
              {storyIntro.lead}
            </p>
          </Reveal>

          {storyIntro.paragraphs.map((p, i) => (
            <Reveal key={i} delay={180 + i * 60}>
              <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{p}</p>
            </Reveal>
          ))}

          {/* Family chips */}
          <Reveal delay={300}>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {family.map((member) => (
                <li
                  key={member.name}
                  className="rounded-2xl bg-blush p-4 text-center"
                >
                  <FacesMark className="mx-auto size-7 text-turquoise" />
                  <p className="mt-2 font-display text-base font-bold text-charcoal">
                    {member.name}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
