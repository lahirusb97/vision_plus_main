import NavButton from "../../components/NavButton";

export default function UserNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="User Status" path={"/user"} />
      <NavButton name="Employee Create" path={"/user/create"} />
      <NavButton name="Branch Create" path={"/user/branch/create"} />
      <NavButton name="Branch" path={"/user/branch"} />
    </>
  );
}
