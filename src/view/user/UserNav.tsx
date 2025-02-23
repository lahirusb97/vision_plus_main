import NavButton from "../../components/NavButton";

export default function UserNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="User Status" path={"/user"} />
      <NavButton name="Add User" path={"/user/add"} />
    </>
  );
}
