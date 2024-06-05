import React, { useState, useEffect } from "react";
import Axios from "axios";

const Ticket = () => {
  const [username, setUsername] = useState("");
  const [kode, setKode] = useState("");
  const [hadiah, setHadiah] = useState("");
  const [dataList, setDataList] = useState([]);
  const [insertStatus, setInsertStatus] = useState("");
  const [dataPrize, setDataPrize] = useState([]);

  const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function randomTiket(length) {
    let hasilGenerate = "";
    const characterLength = character.length;
    for (let i = 0; i < length; i++) {
      hasilGenerate += character.charAt(
        Math.floor(Math.random() * characterLength)
      );
    }
    return hasilGenerate;
  }

  const generateTicket = () => {
    setKode(randomTiket(5));
  };

  const submitKode = () => {
    function hariNi() {
      var today = new Date(),
        month = "" + (today.getMonth() + 1),
        day = "" + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    var tanggal = "";
    tanggal = hariNi();
    Axios.post("http://localhost:3001/api/insert", {
      tanggal: tanggal,
      username: username,
      kode: kode,
      hadiah: hadiah,
    }).then((response) => {
      if (response.data.message) {
        setInsertStatus(response.data.message);
      } else {
        setInsertStatus("");
        setDataList([
          {
            tanggal: tanggal,
            username: username,
            kode: kode,
            hadiah: hadiah,
          },
          ...dataList,
        ]);
      }
    });
  };

  const deleteData = (kode) => {
    Axios.delete(`http://localhost:3001/api/deletenew/${kode}`);
    setDataList(dataList.filter((data) => data.kode !== kode));
  };

  useEffect(() => {
    function hariNi() {
      var today = new Date(),
        month = "" + (today.getMonth() + 1),
        day = "" + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    var tanggal = "";
    tanggal = hariNi();

    Axios.get(`http://localhost:3001/api/gettoday/${tanggal}`).then(
      (response) => {
        setDataList(response.data);
      }
    );

    Axios.get("http://localhost:3001/prize").then((response) => {
      setDataPrize(response.data);
    });
  }, []);

  let rupiah = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
  });

  function isNumber(str) {
    if (str >= 0) {
      return rupiah.format(str);
    } else {
      return str;
    }
  }

  function hariNi() {
    var today = new Date(),
      month = "" + (today.getMonth() + 1),
      day = "" + today.getDate(),
      year = today.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  var tanggal = "";
  tanggal = hariNi();

  return (
    <div className="w-full px-3 flex justify-center">
      <div className="pb-10 w-full tablet:max-w-4xl">
        <h2 className="text-center font-bold text-white bg-slate-900 w-fit px-2 mx-auto rounded-sm">
          Hi 🙋‍♂️
        </h2>
        <div className="w-full bg-slate-900 bg-opacity-70 tablet:rounded-tr-full tablet:rounded-bl-full py-4 px-4">
          <div className="mb-3 w-full tablet:w-1/2 mx-auto">
            <input
              id="username"
              name="username"
              maxLength={30}
              type="text"
              className="mx-auto shadow-sm shadow-black h-8 w-full px-2 rounded"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 w-full tablet:w-1/2 mx-auto">
            <div className="w-full flex gap-1 items-center justify-between">
              <button
                className="h-8 shadow-sm shadow-black w-1/2 cursor-pointer px-2 text-sm laptop:text-lg rounded bg-slate-300 hover:bg-slate-400"
                onClick={generateTicket}
              >
                Generate Ticket
              </button>
              <input
                id="kode"
                name="kode"
                type="text"
                className="mx-auto uppercase h-8 shadow-sm shadow-black w-1/2 px-2 rounded"
                placeholder="Ticket Code"
                maxLength={5}
                value={kode}
                onChange={(e) => {
                  setKode(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-3 w-full tablet:w-1/2 mx-auto flex gap-1 justify-around">
            <select
              name="hadiah"
              id="hadiah"
              className="mx-auto h-8 shadow-sm shadow-black flex-1 px-2 rounded"
              onChange={(e) => {
                setHadiah(e.target.value);
              }}
            >
              <option value="">Choose Prize</option>
              {dataPrize.length > 0 &&
                dataPrize.map((val, index) => (
                  <option key={index} value={val.prize}>
                    {isNumber(val.prize)}
                  </option>
                ))}
            </select>
            <a
              href="/prize"
              className="h-8 shadow-sm shadow-black px-2 text-center flex justify-center items-center font-semibold bg-orange-500 rounded-md"
            >
              Change Prize
            </a>
          </div>
          <div className="w-fit mb-3 mx-auto">
            <p className="text-center mt-2 text-red-600 bg-slate-200 rounded-sm">
              {insertStatus}
            </p>
          </div>
          <div className="w-1/2 mx-auto">
            <button
              type="submit"
              className="w-full text-white transition-all border border-white duration-300 bg-[#d7a469] hover:bg-[#8a6a46] shadow-sm shadow-black rounded-md hover:text-white h-10 font-semibold"
              onClick={submitKode}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex w-full px-1 justify-between mt-2">
          <p className="text-center font-bold transition-all duration-300 text-white bg-black px-2 rounded-sm">
            Data hari Ini : {tanggal}
          </p>
          <a href="/data">
            <h2 className="text-center ext-white bg-black px-2 rounded-sm font-bold transition-all duration-300 hover:text-[#8a6a46] text-white">
              All Data List
            </h2>
          </a>
        </div>

        <table className="table-auto shadow-black shadow-md w-full mt-2 text-center overflow-hidden border border-white rounded-lg" >
          <thead className="text-gray-400 bg-gray-700 text-lg">
            <tr>
              <th className="py-3 w-fit">No</th>
              <th className="py-3">Username</th>
              <th className="py-3">Kode Tiket</th>
              <th className="py-3">Hadiah</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 &&
              dataList.map((val, index) => (
                <tr
                  key={val.id}
                  className="bg-gray-800 bg-opacity-60 border-b transition-all ease-in hover:bg-gray-700 border-gray-700 text-white"
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{val.username}</td>
                  <td className="py-3 uppercase">{val.kode}</td>
                  <td className="py-3">{rupiah.format(val.hadiah)}</td>
                  <td className="py-3">
                    <div
                      className="bg-slate-200 hover:cursor-pointer border-2 w-1/2 mx-auto rounded-lg py-1 border-white hover:bg-slate-700 transition-all ease-in"
                      onClick={() => {
                        deleteData(val.kode);
                      }}
                    >
                      ❌
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ticket;
