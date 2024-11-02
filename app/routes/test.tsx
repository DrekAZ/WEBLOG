import type { MetaFunction } from "@remix-run/node";
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import post2 from './posts.t2.md'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function postFromModule(mod:any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
  }
}

/*
export async function loader() {
  return json([
    //postFromModule(post2),
  ])
}
  */

export default function Index() {
  //const posts = useLoaderData<typeof loader>();

  return (
    <>
      <h1>TEST</h1>
      <Link to={`/test/t2`}>t2</Link>
      <Outlet />
    </>
  )
}
/**
 * 
      {posts.map((post) => (
        <li key={post.slug}>
        </li>
      ))}
 */