import { Mail } from "lucide-react";

export const Information = () => {
  return (
    <div className="flex flex-col gap-5 mt-7 md:mt-0">
      <p>Contact Information</p>
      <div className="flex items-center gap-4">
        <Mail />
        <div>
          <p>Email</p>
          <a href="">ojbdnvcbs@gmail.om</a>
        </div>
      </div>
      <div className="flex items-center  gap-4">
        <Mail />
        <div>
          <p>Phone</p>
          <a href="">+976 13987912</a>
        </div>
      </div>
    </div>
  );
};
