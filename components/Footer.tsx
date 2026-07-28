import type { Personal } from "@/types/portfolio";

export default function Footer({ personal }: { personal: Personal }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="footer-credit">Designed &amp; Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
