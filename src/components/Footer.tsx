export function Footer() {
  return (
    <footer className="text-muted py-6 text-center text-sm">
      <div className="rainbow-bar mb-6 h-[2px]" />
      <p>&copy; {new Date().getFullYear()} Jeremy. All rights reserved.</p>
    </footer>
  );
}
