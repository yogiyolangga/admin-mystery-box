import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";

export default function Prize() {
  const [prize1, setPrize1] = useState("");
  const [prize2, setPrize2] = useState("");
  const [prize3, setPrize3] = useState("");
  const [prize4, setPrize4] = useState("");
  const [prize5, setPrize5] = useState("");
  const [prize6, setPrize6] = useState("");
  const [prize7, setPrize7] = useState("");
  const [prize8, setPrize8] = useState("");
  const navigate = useNavigate();

  const inputPrize = () => {
    Axios.post("http://localhost:3001/insertprize", {
      prize1: prize1,
      prize2: prize2,
      prize3: prize3,
      prize4: prize4,
      prize5: prize5,
      prize6: prize6,
      prize7: prize7,
      prize8: prize8,
    }).then((response) => {
      if(response.data.messageSuccess) {
        alert(response.data.messageSuccess);
        navigate("/");        
      } else {
        alert("Gagal");
      }
    })
  }

  return (
    <div className="">
      <div className="py-12 bg-slate-500 rounded-full bg-opacity-60 border-b-4 border-white shadow-black shadow-2xl my-3">
        <h1 className="font-bold mb-6 text-2xl text-center text-white bg-slate-500 w-fit px-10 mx-auto rounded-md shadow-lg shadow-black">
          Input New Prize
        </h1>
        <div className="flex flex-col items-center gap-2 py-3 justify-center">
        <input
          key="prize1"
          type="text"
          id="prize1"
          name="prize1"
          placeholder="prize1"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize1(e.target.value)
          }}
        />
        <input
          key="prize2"
          type="text"
          id="prize2"
          name="prize2"
          placeholder="prize2"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize2(e.target.value)
          }}
        />
        <input
          key="prize3"
          type="text"
          id="prize3"
          name="prize3"
          placeholder="prize3"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize3(e.target.value)
          }}
        />
        <input
          key="prize4"
          type="text"
          id="prize4"
          name="prize4"
          placeholder="prize4"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize4(e.target.value)
          }}
        />
        <input
          key="prize5"
          type="text"
          id="prize5"
          name="prize5"
          placeholder="prize5"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize5(e.target.value)
          }}
        />
        <input
          key="prize6"
          type="text"
          id="prize6"
          name="prize6"
          placeholder="prize6"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize6(e.target.value)
          }}
        />
        <input
          key="prize7"
          type="text"
          id="prize7"
          name="prize7"
          placeholder="prize7"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize7(e.target.value)
          }}
        />
        <input
          key="prize8"
          type="text"
          id="prize8"
          name="prize8"
          placeholder="prize8"
          className="h-8 w-52 px-1 rounded-md"
          onChange={(e) => {
            setPrize8(e.target.value)
          }}
        />
        </div>
        <div className="w-full h-14">
          <button className="mx-auto w-fit py-2 px-4 font-bold border-b-4 shadow-lg hover:scale-95 shadow-black hover:shadow-none hover:border-none border-white bg-orange-400 block rounded-md" onClick={inputPrize}>
            Submit
          </button>
        </div>
        <div className="w-full flex justify-center items-center py-2">
        <a href="/" className="font-bold text-zinc-900">Back</a>
        </div>
      </div>
    </div>
  );
}
