import { CreditCard, Plus } from "lucide-react";
import { useAddPayment } from "../../../hooks/useAddPayment";
import CreatePaymentModal from "./CreatePaymentModal";
import Swal from "sweetalert2";
import React, { useState } from "react";

function CreatePaymentAction() {
  // useHook payment
  const { addPayment } = useAddPayment();
  const addPaymentModal = document.getElementById("addPaymentModal");

  // handle
  const [createPaymentFormData, setCreatePaymentFormData] = useState({
    tenantName: "",
    roomNumber: "",
    amountPayment: "",
    datePayment: "",
  });

  const handlePaymentChange = (e) => {
    setCreatePaymentFormData({
      ...createPaymentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const result = await addPayment(createPaymentFormData);
    if (result.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Payment created successfully.",
        showConfirmButton: false,
        timer: 1000,
      });
      setCreatePaymentFormData({
        tenantName: "",
        roomNumber: "",
        amountPayment: "",
        datePayment: "",
      });
      addPaymentModal.close();
    } else {
      console.error("Something went wrong:", result.message);
      await Swal.fire({
        title: "Error",
        icon: "error",
        text: "Unable to create room. Please check your connection and try again.",
        showConfirmButton: true,
        confirmButtonColor: "#2C3038",
      });
      addPaymentModal.showModal();
    }
  };

  const clearPaymentButtonWhenClose = (e) => {
    e.preventDefault();
    setCreatePaymentFormData({
      tenantName: "",
      roomNumber: "",
      amountPayment: "",
      datePayment: "",
    });
    addPaymentModal.close();
  };

  return (
    <React.Fragment>
      <button
        className="btn hidden rounded-sm border-none bg-[#2C3038] font-bold shadow-none hover:bg-black md:block"
        onClick={() => document.getElementById("addPaymentModal").showModal()}
      >
        <div className="flex items-center gap-1">
          <Plus size={18} color="#FFF" />
          <span className="text-sm font-semibold">Create Payment</span>
        </div>
      </button>
      {/* floating create payment */}
      <button
        className="fixed right-10 bottom-30 z-999 block h-15 w-15 rounded-full bg-[#2C3038] hover:bg-black md:hidden"
        onClick={() => document.getElementById("addPaymentModal").showModal()}
      >
        <div className="flex h-auto items-center justify-center gap-2">
          <CreditCard size={30} color="#FFF" />
        </div>
      </button>
      <CreatePaymentModal
        handleCreateChange={handlePaymentChange}
        handleCreateSubmit={handleCreateSubmit}
        createPaymentFormData={createPaymentFormData}
        clearPaymentButtonWhenClose={clearPaymentButtonWhenClose}
      />
    </React.Fragment>
  );
}
export default CreatePaymentAction;
