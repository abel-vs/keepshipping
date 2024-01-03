export default async function Home() {
  const user = await getUserDetails();
  const lastShip = await getLastShip();
}
