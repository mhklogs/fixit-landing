import PostJobForm from '@/components/post-job-form';

export default function PostJobPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Post a Job</h1>
      <p className="mt-1 mb-8 text-ink-muted">
        Broadcast to verified local pros. It&apos;s free.
      </p>
      <PostJobForm />
    </div>
  );
}