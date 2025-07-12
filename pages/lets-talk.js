export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://calendar.app.google/1LkSw3nUrZmZ3xFS6',
      permanent: false,
    },
  };
}

export default function Agenda() {
  return null;
}
