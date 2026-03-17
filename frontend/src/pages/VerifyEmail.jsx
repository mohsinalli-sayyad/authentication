import { useEffect, useRef, useState } from "react";
import { verifyEmail } from "../services/authService";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying...");
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const verify = async () => {
      try {
        const res = await verifyEmail(token);

        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message);
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>

        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
