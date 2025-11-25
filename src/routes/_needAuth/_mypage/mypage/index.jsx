import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_needAuth/_mypage/mypage/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_needAuth/_mypage/mypage/"!</div>;
}
