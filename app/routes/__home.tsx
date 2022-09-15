import { Box } from "@chakra-ui/react"
import { json, LoaderArgs } from "@remix-run/node"
import { Outlet, useLoaderData, useLocation } from "@remix-run/react"

import { Limiter } from "~/components/Limiter"
import { Nav } from "~/components/Nav"
import { getUser } from "~/services/auth/auth.server"

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)
  console.log("user", user)
  return json(user)
}

export default function HomeLayout() {
  const user = useLoaderData<typeof loader>()
  const location = useLocation();
  const hashParams = new URLSearchParams(location.hash.slice(1))
  const accessToken = hashParams.get("access_token")
  const type = hashParams.get("type")
  if(accessToken && type === "signup" && location.pathname === "/") {
    window.location = "/login#access_token=" + accessToken + "&type=signup" as any;
  }
  return (
    <Box>
      <Nav user={user} />
      <Limiter pt="65px">
        <Outlet />
      </Limiter>
    </Box>
  )
}
