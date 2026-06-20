import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Music from "@/components/Music";
import PhotosTeaser from "@/components/PhotosTeaser";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <div className="page-container">
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
          <section id="photos">
            <PhotosTeaser />
          </section>
        </div>
      </main>
      <footer style={{ padding: "16px 0" }}>
        <div className="page-container flex items-center justify-between">
          <span style={{ fontSize: "11px", color: "var(--text-ghost)" }}>
            jerome rodrigo · 2026
          </span>
          <div className="flex items-center" style={{ gap: "16px" }}>
            <a href="https://github.com/Jrodrigo06" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
              github
            </a>
            <a href="https://www.linkedin.com/in/jrodrigo2028/" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
              linkedin
            </a>
            <a href="/resume.pdf" style={{ fontSize: "11px", color: "var(--text-dim)" }}>
              resume
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
