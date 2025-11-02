type PageProps = { params: { id: string } };
export default function UserPage({ params }: PageProps) {
  return <main>User {params.id}</main>;
}
