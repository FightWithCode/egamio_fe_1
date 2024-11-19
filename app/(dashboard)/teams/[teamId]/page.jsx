export default async function Page({ params }) {
    const teamId = (await params).teamId
    return <div>Details about team: {teamId}</div>
  }