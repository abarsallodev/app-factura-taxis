import { UserEditProps, Routes } from "../types/navigation";

export default function UserEdit(userEditProps: UserEditProps) {
  const userId = userEditProps.route.params.userId;
  return (
    <>
      <h2>{userId}</h2>
    </>
  );
}
