import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-xl font-bold text-primary">
            🛒 বাজার দর
          </Link>

          <p className="mt-2 text-sm text-muted">
            নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন এক নজরে।
          </p>
        </div>

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;

