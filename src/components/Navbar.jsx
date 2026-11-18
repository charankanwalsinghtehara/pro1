export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="The Funny Lab home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>THE FUNNY <span className="brand-accent">LAB</span></span>
      </a>
      <span className="navbar-note"><span className="status-dot" /> VERY UNOFFICIAL SCIENCE</span>
    </header>
  );
}
