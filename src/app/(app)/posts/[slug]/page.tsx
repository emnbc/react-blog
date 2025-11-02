const PostPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  return <main>Post {params.slug}</main>;
};

export default PostPage;
