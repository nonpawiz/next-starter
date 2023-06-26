import EditUser from "./EditUser";

export default function User({ params }: { params: { id: number } }) {
  console.log(typeof params.id);

  const userId = params.id;

  return (
    <>
      <EditUser userId={params.id} />
    </>
  );
}
