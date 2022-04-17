import { CSpinner } from "@coreui/react";

const LoadingPage = () => {
  return (
    <div className="w-auto h-100 bg-secondary">
      <div className="d-flex justify-content-center align-items-center ">
        <CSpinner color="info" />
      </div>
    </div>
  );
};

export default LoadingPage;
