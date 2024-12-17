interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

import { Editor } from '@/app/documents/[documentId]/editor';
import { Toolbar } from '@/app/documents/[documentId]/toolbar';
const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
