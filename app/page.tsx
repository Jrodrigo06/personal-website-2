import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import ArtifactsTeaser from "@/components/ArtifactsTeaser";
import Music from "@/components/Music";
import PhotosTeaser from "@/components/PhotosTeaser";
import RevealSection from "@/components/RevealSection";
import { LINKS } from "@/config/links";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <div className="page-container">
          <Hero />
          <RevealSection id="experience" style={{ marginTop: "var(--space-6)" }}>
            <Experience />
          </RevealSection>
          <RevealSection id="projects" style={{ marginTop: "var(--space-6)" }}>
            <Projects />
          </RevealSection>
          <RevealSection id="artifacts" style={{ marginTop: "var(--space-6)" }}>
            <ArtifactsTeaser />
          </RevealSection>
          <RevealSection id="writing" style={{ marginTop: "var(--space-6)" }}>
            <Writing />
          </RevealSection>
          <RevealSection id="music" style={{ marginTop: "var(--space-6)" }}>
            <Music />
          </RevealSection>
          <RevealSection id="photos" style={{ marginTop: "var(--space-6)" }}>
            <PhotosTeaser />
          </RevealSection>
        </div>
      </main>
      <footer style={{ padding: "16px 0" }}>
        <div className="page-container flex items-center justify-between">
          <span style={{ fontSize: "11px", color: "var(--text-ghost)" }}>
            jerome rodrigo · 2026
          </span>
          <div className="flex items-center" style={{ gap: "16px" }}>
            <a href={LINKS.github} style={{ fontSize: "11px", color: "var(--text-dim)" }}>
              github
            </a>
            <a href={LINKS.linkedin} style={{ fontSize: "11px", color: "var(--text-dim)" }}>
              linkedin
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
