import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Globe2,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { z } from "zod";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { AccordionItem } from "./components/ui/accordion";
import { Dialog } from "./components/ui/dialog";
import { Tabs } from "./components/ui/tabs";

type Lang = "en" | "ar";
const I18nContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({ lang: "en", setLang: () => undefined });
const ThemeContext = createContext<{ light: boolean; toggle: () => void }>({
  light: false,
  toggle: () => undefined,
});
const copy = {
  en: {
    index: "VESPER / INDEX",
    intro: "I design identities for places that do not exist yet.",
    sub: "Mara Venn is a speculative designer and art director orbiting the useful, the strange, and the almost-real.",
    work: "Selected signals",
    about: "A designer between coordinates",
    contact: "Open a channel",
    nav: ["About", "Work", "Notes", "Contact"],
    availability: "Available for strange assignments / 2026",
    scroll: "Scroll to triangulate ↓",
    aboutBody:
      "Based in a studio above the last tram stop, Mara turns cultural research into visual systems. Her practice moves through climate fiction, civic technology, sound, and the rituals we will inherit.",
    aboutHeadline: "Not decoration. A weather system for your next idea.",
    stats: ["cities mapped", "future-facing clients", "questions still open"],
    workLabel: "Selected signals / 2021—26",
    signalOpened: "Signal opened",
    archive:
      "The full case study is currently traveling through a low-orbit archive. Leave a note and Mara will send coordinates.",
    closeArchive: "Close archive",
    notesLabel: "Field notes / capabilities",
    tabs: [
      ["01 / Direction", "Concepts with enough gravity to move a room."],
      [
        "02 / Systems",
        "Flexible identities that behave beautifully under pressure.",
      ],
      ["03 / Objects", "Printed matter, spaces, and interfaces with a pulse."],
    ],
    questionsLabel: "Questions from the dark",
    questions: [
      [
        "What does speculative design mean here?",
        "It means making a useful artifact for a future that has not agreed to arrive yet. The work begins with research and ends with a sharper question.",
      ],
      [
        "Do you work with small teams?",
        "Often. Small teams tend to bring the clearest obsessions, and clear obsessions make excellent raw material.",
      ],
      [
        "Where is the studio?",
        "Somewhere between Rotterdam, the cloud, and the final train home.",
      ],
    ],
    contactBody:
      "For commissions, talks, collaborations, or a beautifully specific problem.",
    name: "Your name",
    email: "Signal address",
    message: "The brief",
    namePlaceholder: "Ari Solano",
    emailPlaceholder: "hello@somewhere.studio",
    messagePlaceholder: "Tell me what is trying to become real...",
    submit: "Transmit brief",
    sent: "Transmission received. Coordinates are being calculated.",
    copyright: "© 2026 Mara Venn",
    footerNote: "Made for the in-between",
    elsewhere: "Earth / elsewhere",
  },
  ar: {
    index: "فِسبر / فهرس",
    intro: "أصمم هويات لأماكن لم توجد بعد.",
    sub: "مارا فين مصممة ومديرة فنية تستكشف المفيد، الغريب، وما يقترب من الحقيقة.",
    work: "إشارات مختارة",
    about: "مصممة بين الإحداثيات",
    contact: "افتح قناة",
    nav: ["نبذة", "أعمال", "ملاحظات", "تواصل"],
    availability: "متاحة لمهمات غريبة / ٢٠٢٦",
    scroll: "مرر لتحديد الإحداثيات ↓",
    aboutBody:
      "تعمل مارا من استوديو فوق آخر محطة ترام، وتحول البحث الثقافي إلى أنظمة بصرية. تمتد ممارستها عبر خيال المناخ، والتقنية المدنية، والصوت، والطقوس التي سنرثها.",
    aboutHeadline: "ليست زينة. إنها منظومة طقس لفكرتك القادمة.",
    stats: [
      "مدن جرى رسمها",
      "عملاء يتطلعون إلى المستقبل",
      "أسئلة لا تزال مفتوحة",
    ],
    workLabel: "إشارات مختارة / ٢٠٢١—٢٦",
    signalOpened: "فُتحت الإشارة",
    archive:
      "تتنقل دراسة الحالة الكاملة حاليًا عبر أرشيف في مدار منخفض. اترك رسالة وسترسل مارا الإحداثيات.",
    closeArchive: "أغلق الأرشيف",
    notesLabel: "ملاحظات ميدانية / القدرات",
    tabs: [
      ["٠١ / توجيه", "أفكار ذات جاذبية كافية لتحريك المكان."],
      ["٠٢ / أنظمة", "هويات مرنة تتصرف بأناقة تحت الضغط."],
      ["٠٣ / أشياء", "مطبوعات ومساحات وواجهات تنبض بالحياة."],
    ],
    questionsLabel: "أسئلة من العتمة",
    questions: [
      [
        "ماذا يعني التصميم التكهني هنا؟",
        "يعني صنع أداة مفيدة لمستقبل لم يوافق بعد على الوصول. يبدأ العمل بالبحث وينتهي بسؤال أكثر حدة.",
      ],
      [
        "هل تعملين مع فرق صغيرة؟",
        "غالبًا. تميل الفرق الصغيرة إلى امتلاك الهواجس الأوضح، والهواجس الواضحة مادة أولية ممتازة.",
      ],
      [
        "أين يقع الاستوديو؟",
        "في مكان ما بين روتردام، والسحابة، والقطار الأخير إلى المنزل.",
      ],
    ],
    contactBody: "للمشاريع، والمحاضرات، والتعاون، أو مشكلة محددة وجميلة.",
    name: "اسمك",
    email: "عنوان الإشارة",
    message: "الموجز",
    namePlaceholder: "آري سولانو",
    emailPlaceholder: "hello@somewhere.studio",
    messagePlaceholder: "أخبريني بما يحاول أن يصبح حقيقة...",
    submit: "أرسل الموجز",
    sent: "تم استلام الإرسال. يجري حساب الإحداثيات.",
    copyright: "© ٢٠٢٦ مارا فين",
    footerNote: "صُنع لما بين الأشياء",
    elsewhere: "الأرض / أماكن أخرى",
  },
};

function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [light, lang]);
  return (
    <I18nContext.Provider value={{ lang, setLang }}>
      <ThemeContext.Provider value={{ light, toggle: () => setLight(!light) }}>
        {children}
      </ThemeContext.Provider>
    </I18nContext.Provider>
  );
}

function Nav() {
  const { lang, setLang } = useContext(I18nContext);
  const { light, toggle } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const links = [
    ["about", t.nav[0]],
    ["work", t.nav[1]],
    ["field-notes", t.nav[2]],
    ["contact", t.nav[3]],
  ];
  return (
    <header className="fixed left-0 right-0 top-0 z-40 mix-blend-difference text-paper">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5">
        <a href="#home" className="font-mono text-xs tracking-[.3em]">
          MV<span className="text-acid">●</span>26
        </a>
        <nav
          className={
            open
              ? "absolute left-0 right-0 top-16 flex flex-col gap-5 border-y border-paper bg-ink p-6 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0"
              : "hidden md:flex md:gap-7"
          }
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={"#" + id}
              onClick={() => setOpen(false)}
              className="font-mono text-[10px] uppercase tracking-widest hover:text-acid"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="font-mono text-[10px]"
          >
            {lang === "en" ? "عربي" : "EN"}
          </button>
          <button onClick={toggle}>
            {light ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.25em] opacity-60">
      <span className="text-acid">{number}</span>
      <span className="h-px w-12 bg-current" />
      {children}
    </div>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.classList.add("visible");
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={"reveal " + className}>
      {children}
    </div>
  );
}

function Hero() {
  const { lang } = useContext(I18nContext);
  const t = copy[lang];
  return (
    <section
      id="home"
      className="grid-paper relative min-h-screen overflow-hidden px-5 pb-20 pt-36"
    >
      <div className="mx-auto grid max-w-[1400px] items-end gap-12 lg:grid-cols-[1.4fr_.6fr]">
        <div>
          <Badge className="mb-8 border-acid text-acid">{t.availability}</Badge>
          <h1 className="max-w-5xl text-[clamp(4rem,12vw,11.5rem)] font-semibold leading-[.78] tracking-[-.09em]">
            {t.intro}
          </h1>
          <div className="mt-12 flex max-w-xl items-start gap-4">
            <ArrowDownRight className="mt-1 text-acid" />
            <p className="font-mono text-sm leading-7 opacity-70">{t.sub}</p>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[330px] border-2 border-acid p-4 shadow-acid">
          <div className="flex h-full items-center justify-center rounded-full border border-acid">
            <div className="h-32 w-32 animate-pulse rounded-full bg-violet shadow-[0_0_90px_30px_#8b5cf6]" />
          </div>
          <span className="absolute -right-5 top-8 rotate-90 font-mono text-[10px] tracking-widest">
            37° 46' N / 122° 25' W
          </span>
          <span className="absolute bottom-5 left-5 font-mono text-xs text-acid">
            NOCTURNE
            <br />
            01—07
          </span>
        </div>
      </div>
      <div className="absolute bottom-7 left-5 right-5 flex justify-between font-mono text-[10px] uppercase opacity-50">
        <span>{t.index}</span>
        <span>{t.scroll}</span>
      </div>
    </section>
  );
}

function About() {
  const { lang } = useContext(I18nContext);
  const t = copy[lang];
  return (
    <section id="about" className="bg-acid px-5 py-28 text-ink">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="01" children={copy[lang].about} />
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <p className="font-mono text-sm leading-7">{t.aboutBody}</p>
          <h2 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-8xl">
            {t.aboutHeadline}
          </h2>
        </div>
        <div className="mt-24 grid gap-3 md:grid-cols-3">
          <Card className="bg-ink p-6 text-paper shadow-violet">
            <span className="font-mono text-5xl text-acid">14</span>
            <p className="mt-10 font-mono text-xs uppercase">{t.stats[0]}</p>
          </Card>
          <Card className="bg-violet p-6 text-paper">
            <span className="font-mono text-5xl">09</span>
            <p className="mt-10 font-mono text-xs uppercase">{t.stats[1]}</p>
          </Card>
          <Card className="bg-paper p-6 text-ink">
            <span className="font-mono text-5xl">∞</span>
            <p className="mt-10 font-mono text-xs uppercase">{t.stats[2]}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

const projects = {
  en: [
    [
      "A—01",
      "Morrow / Civic After Dark",
      "Identity · Installation",
      "bg-violet",
      "A public-facing identity for a night school teaching cities how to stay awake.",
    ],
    [
      "B—04",
      "Aerial Alchemy",
      "Art direction · Digital",
      "bg-acid text-ink",
      "An interface for a fictional atmospheric mining collective in the North Sea.",
    ],
    [
      "C—09",
      "Soft Protocols",
      "Editorial · Exhibition",
      "bg-paper text-ink",
      "A printed field guide to tenderness inside automated workplaces.",
    ],
  ],
  ar: [
    [
      "أ—٠١",
      "مورو / المدينة بعد حلول الظلام",
      "هوية · تركيب فني",
      "bg-violet",
      "هوية عامة لمدرسة ليلية تعلّم المدن كيف تبقى يقظة.",
    ],
    [
      "ب—٠٤",
      "كيمياء جوية",
      "إخراج فني · رقمي",
      "bg-acid text-ink",
      "واجهة لتعاونية خيالية لتعدين الغلاف الجوي في بحر الشمال.",
    ],
    [
      "ج—٠٩",
      "بروتوكولات رقيقة",
      "تحرير · معرض",
      "bg-paper text-ink",
      "دليل ميداني مطبوع للرقة داخل أماكن العمل المؤتمتة.",
    ],
  ],
} as const;
function Work() {
  const { lang } = useContext(I18nContext);
  const [selected, setSelected] = useState<string | null>(null);
  const t = copy[lang];
  return (
    <section id="work" className="px-5 py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="02">{t.workLabel}</SectionLabel>
        <div className="space-y-16">
          {projects[lang].map(([no, title, type, color, text], index) => (
            <Reveal
              key={no}
              className={
                index === 1 ? "lg:ml-[18%]" : index === 2 ? "lg:ml-[7%]" : ""
              }
            >
              <button
                onClick={() => setSelected(title)}
                className={"group block w-full text-left " + color}
              >
                <Card className="relative min-h-[260px] p-7 transition duration-500 group-hover:-translate-y-3 group-hover:shadow-acid md:min-h-[360px] md:p-12">
                  <div className="flex justify-between font-mono text-xs">
                    <span>{no}</span>
                    <ArrowUpRight className="transition group-hover:rotate-45" />
                  </div>
                  <div className="mt-24 max-w-3xl">
                    <h3 className="text-4xl font-semibold tracking-[-.06em] md:text-7xl">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-md font-mono text-xs leading-6 opacity-70">
                      {type} — {text}
                    </p>
                  </div>
                </Card>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)}>
        <Badge>{t.signalOpened}</Badge>
        <h2 className="mt-6 text-4xl font-semibold">{selected}</h2>
        <p className="mt-5 font-mono text-sm leading-7">{t.archive}</p>
        <Button
          className="mt-7 bg-ink text-paper"
          onClick={() => setSelected(null)}
        >
          {t.closeArchive}
        </Button>
      </Dialog>
    </section>
  );
}

function Notes() {
  const { lang } = useContext(I18nContext);
  const t = copy[lang];
  return (
    <section id="field-notes" className="bg-violet px-5 py-28 text-paper">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="03">{t.notesLabel}</SectionLabel>
        <Tabs
          items={t.tabs.map(([label, content]) => ({
            label,
            content: (
              <p className="max-w-3xl text-5xl font-semibold leading-none tracking-[-.06em]">
                {content}
              </p>
            ),
          }))}
        />
      </div>
    </section>
  );
}

function Contact() {
  const { lang } = useContext(I18nContext);
  const [sent, setSent] = useState(false);
  const t = copy[lang];
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(data));
    if (result.success) setSent(true);
  }
  return (
    <section id="contact" className="px-5 py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_.8fr]">
        <div>
          <SectionLabel number="04">{t.contact}</SectionLabel>
          <h2 className="text-7xl font-semibold leading-[.85] tracking-[-.08em] md:text-9xl">
            {lang === "ar" ? "أنشئ" : "Make a"}
            <br />
            <span className="text-acid">
              {lang === "ar" ? "إشارة جديدة." : "new signal."}
            </span>
          </h2>
          <p className="mt-10 max-w-md font-mono text-sm leading-7 opacity-60">
            {t.contactBody}
          </p>
        </div>
        <form
          onSubmit={submit}
          className="space-y-7 border-2 border-current p-7 md:p-10"
        >
          <label className="block font-mono text-xs uppercase">
            {t.name}
            <Input name="name" placeholder={t.namePlaceholder} />
          </label>
          <label className="block font-mono text-xs uppercase">
            {t.email}
            <Input name="email" type="email" placeholder={t.emailPlaceholder} />
          </label>
          <label className="block font-mono text-xs uppercase">
            {t.message}
            <textarea
              name="message"
              placeholder={t.messagePlaceholder}
              className="mt-3 min-h-32 w-full border-b-2 border-current bg-transparent p-1 font-mono text-sm outline-none focus:border-acid"
            />
          </label>
          <Button type="submit" className="w-full bg-acid text-ink">
            {t.submit} <ArrowUpRight size={15} />
          </Button>
          {sent && <p className="font-mono text-xs text-acid">{t.sent}</p>}
        </form>
      </div>
      <footer className="mx-auto mt-32 flex max-w-[1400px] flex-wrap justify-between gap-5 border-t border-current pt-5 font-mono text-[10px] uppercase opacity-50">
        <span>{t.copyright}</span>
        <span>{t.footerNote}</span>
        <span className="flex gap-2">
          <Globe2 size={13} /> {t.elsewhere}
        </span>
      </footer>
    </section>
  );
}

function Questions() {
  const { lang } = useContext(I18nContext);
  const t = copy[lang];
  return (
    <section className="px-5 py-28">
      <div className="mx-auto max-w-[900px]">
        <SectionLabel number="05">{t.questionsLabel}</SectionLabel>
        {t.questions.map(([title, answer]) => (
          <AccordionItem key={title} title={title}>
            {answer}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}

export function App() {
  return (
    <Providers>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Notes />
        <Questions />
        <Contact />
      </main>
    </Providers>
  );
}
