import { redirect } from "next/navigation";

export default async function Home({ params }) {
  console.log("activationkeyeyyyyyyyyyyyyyyyyyyyyyyyy");
  redirect("/activationkey");
  // ...
}
// renderer/app/page.js

// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/activationkey");
// }
