interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

import { Editor } from "@/app/documents/editor";

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      DocumentIdPage: {documentId}
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
