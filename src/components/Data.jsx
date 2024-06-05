import React, { useState, useEffect } from "react";
import Axios from "axios";
import Datatable, { createTheme } from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";

const Data = () => {
  const [dataList, setDataList] = useState([]);
  const [records, setRecords] = useState([]);
  const [value, setValue] = useState({
    stardDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);

    Axios.post("http://localhost:3001/api/daterange", {
      startDate: newValue.startDate,
      endDate: newValue.endDate,
    }).then((response) => {
      setDataList(response.data);
      setRecords(response.data);
    });
  };

  const deleteData = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
    setDataList(dataList.filter((data) => data.id !== id));
    setRecords(dataList.filter((data) => data.id !== id));
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setDataList(response.data);
      setRecords(response.data);
    });
  }, []);

  let rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const columns = [
    {
      name: <div className="mx-auto laptop:text-lg">Tanggal</div>,
      selector: (row) => row.tanggal,
      cell: (row) => <div className="mx-auto">{row.tanggal}</div>,
      sortable: true,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Username</div>,
      cell: (row) => <div className="mx-auto">{row.username}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Kode Tiket</div>,
      cell: (row) => <div className="mx-auto">{row.kode}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Hadiah</div>,
      cell: (row) => <div className="mx-auto">{rupiah.format(row.hadiah)}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Kesempatan</div>,
      selector: (row) => row.chance,
      cell: (row) => <div className="mx-auto">{row.chance}</div>,
      sortable: true,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Action</div>,

      cell: (row) => (
        <div
          className="bg-red-600 text-white px-2 mx-auto cursor-pointer border-b-2 hover:border-none rounded-lg py-1 hover:bg-red-700 transition-all ease-in"
          onClick={() => {
            deleteData(row.id);
          }}
        >
          Hapus
        </div>
      ),
    },
  ];

  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Axios.get("http://localhost:3001/api/get").then((response) => {
        setDataList(response.data);
        setRecords(response.data);
        setPending(false);
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  createTheme(
    "solarized",
    {
      text: {
        primary: "white",
        secondary: "white",
      },
      background: {
        default: "#1e1e1d",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "white",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  function handleFilter(e) {
    const newData = dataList.filter((row) => {
      return row.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="pb-10 mt-2 px-4 w-full">
      <div className="w-full flex gap-1 justify-center items-center py-1">
        <a className="transition-all w-[30%] duration-300 bg-[#1e293b] text-white shadow-sm px-3 shadow-black items-center justify-center flex rounded-md h-10 font-semibold" href="/">
            Tambah Data
        </a>
        <div className="w-[30%]">
          <Datepicker
            value={value}
            onChange={handleValueChange}
            popoverDirection="down"
            showShortcuts={true}
            primaryColor="amber"
            showFooter={true}
          />
        </div>
        <input
          type="text"
          className="w-[40%] h-10 border border-slate-700 px-1 rounded-md"
          placeholder="Cari Username..."
          onChange={handleFilter}
        />
      </div>
      <Datatable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        theme="solarized"
        progressPending={pending}
      ></Datatable>
    </div>
  );
};

export default Data;
