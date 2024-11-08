import { Link, useLoaderData } from "@remix-run/react";

export async function clientLoader() {
  const modules = import.meta.glob('/public/posts/**/*{.md,.mdx}', {eager: true})
  const posts = Object.entries(modules).map(([filePath, module])=> {
    return {
      slug: filePath.replace(/^.*[\\/]/, '').replace('.mdx', '').replace('.md', ''),
      title: module.frontmatter.meta[0].title,
    }
  })
  return posts
}

export default function Posts() {
  const posts = useLoaderData<typeof clientLoader>()

  return (
    <>
      <h1>投稿一覧</h1>
      <ul>
        {posts.map((post, index) =>
          <li key={index}>
            <Link to={`/${post.slug}`}>{post.title}</Link>
          </li>
        )}
      </ul>
    </>
  )
}