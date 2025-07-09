import NavButton from "../../components/NavButton";

export default function ImageUploardNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Uploard Image" path={"/image-upload"} />
    </>
  );
}
