import Link from "next/link";

interface DocumentsLayoutProps {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: DocumentsLayoutProps) => {
  return (
    <div>
      <nav>
        <Link href="/documents">Documents</Link>
      </nav>
      {children}
    </div>
  );
};

export default DocumentsLayout;
