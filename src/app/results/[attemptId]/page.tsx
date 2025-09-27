import ClientResultsPage from '@/components/ClientResultPage';

export default async function ResultsPage({ params }: { params: Promise<{ attemptId: string }> }) {
  // `params` is available directly in the server component.
  const { attemptId } = await params;

  // Pass the unwrapped ID to the client component.
  return <ClientResultsPage attemptId={attemptId} />;
}