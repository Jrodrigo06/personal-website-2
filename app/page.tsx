import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Music from "@/components/Music";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="music">
          <Music />
        </section>
      </main>
      <footer
        className="flex items-center justify-between"
        style={{ padding: "16px 28px" }}
      >
        <span style={{ fontSize: "11px", color: "var(--text-ghost)" }}>
          jerome rodrigo · 2026
        </span>
        <div className="flex items-center" style={{ gap: "16px" }}>
          <a href="#" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
            github
          </a>
          <a href="#" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
            linkedin
          </a>
          <a href="#" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
            resume
          </a>
        </div>
      </footer>
    </>
  );
}
