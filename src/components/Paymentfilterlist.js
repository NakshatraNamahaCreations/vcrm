import React, { useState, useEffect, useContext } from "react";
import Header from "../components/layout/Header";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useLocation, useParams, Link, NavLink } from "react-router-dom";
import DSRnav from "./DSRnav";
import moment from "moment";
import { Button } from "react-bootstrap";

function Paymentfilterlist() {
  const [treatmentData, settreatmentData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dsrdata, setdsrdata] = useState([]);
  const [searchJobCatagory, setSearchJobCatagory] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchTechName, setSearchTechName] = useState("");
  const [searchJobType, setSearchJobType] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [pendingamt, setpendingamt] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);

  const tp = Math.ceil(totalPages / itemsPerPage);
  const apiURL = process.env.REACT_APP_API_URL;
  const { date } = useParams();

  // Frontend Logic

  useEffect(() => {
    getservicedata();
  }, [currentPage]);

  const getservicedata = async () => {
    try {
      let res = await axios.get(apiURL + "/getpaymentfilterdatewis", {
        params: {
          date: date,
          page: currentPage,
        },
      });

      if (res.status === 200) {
        setTotalPages(res.data?.totalLength);

        settreatmentData(res.data?.runningdata);
        setSearchResults(res.data?.runningdata);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const initialLoad = async () => {
  //   // Initial data load
  //   await getServiceData();
  // };

  // const getServiceData = async () => {
  //   try {
  //     const res = await axios.get(
  //       apiURL + `/getpaymentfilterdatewise/${date}/${1}`
  //     );
  //     if (res.status === 200) {
  //       const data = res.data?.runningdata;
  //       settreatmentData(data);
  //       setSearchResults(data);
  //     }
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  // const [loading, setLoading] = useState(false);
  // const [Totalcount, setTotalcount] = useState();

  // const [loadingMoreData, setLoadingMoreData] = useState(false);
  // const [reachedEndOfData, setReachedEndOfData] = useState(false);

  // const loadMoreData = async () => {
  //   try {
  //     if (loadingMoreData || reachedEndOfData) {
  //       return; // Don't make another request if already loading or reached the end
  //     }

  //     setLoadingMoreData(true);

  //     const nextPage = 2; // Increment this for each subsequent request
  //     const res = await axios.get(
  //       `${apiURL}/getpaymentfilterdatewise/${date}/${nextPage}`
  //     );

  //     if (res.status === 200) {
  //       const newData = res.data?.runningdata;

  //       if (newData.length > 0) {
  //         const lastItem =
  //           treatmentData.length > 0
  //             ? treatmentData[treatmentData.length - 1]
  //             : null;
  //         const lastItemId = lastItem?._id;

  //         const uniqueNewData = newData.filter(
  //           (item) => item?._id !== lastItemId
  //         );

  //         console.log(
  //           "treatmentData[treatmentData.length - 1]?._id",
  //           treatmentData
  //         );
  //         console.log("newData---", newData[0]._id);
  //         // Append the new data to the existing data
  //         setTotalcount(res.data?.totalCount);
  //         settreatmentData((prevData) => [...prevData, ...uniqueNewData]);
  //         setSearchResults((prevData) => [...prevData, ...uniqueNewData]);
  //       } else {
  //         // No more data available, update the flag
  //         setReachedEndOfData(true);
  //       }
  //     }
  //   } catch (error) {
  //     // Handle error
  //   } finally {
  //     setLoadingMoreData(false);
  //   }
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isAtBottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.offsetHeight;

  //     if (isAtBottom && !loadingMoreData && !reachedEndOfData) {
  //       loadMoreData();
  //     }
  //   };

  //   // Add event listener
  //   window.addEventListener("scroll", handleScroll);

  //   // Initial data load
  //   initialLoad();

  //   // Remove event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  // useEffect(() => {
  //   initialLoad();
  // }, []);

  // useEffect(() => {
  //   getAlldata();
  // }, [treatmentData]);

  const getAlldata = async () => {
    try {
      const res = await axios.get(apiURL + `/filteredservicedate/${date}`);

      if (res.status === 200) {
        setdsrdata(res.data.filterwithservicedata); // Assuming the response has the correct key
      }
    } catch (error) {
      // Handle error
    }
  };

  const fddata = (id) => {
    const data = dsrdata.filter((i) => i.serviceInfo[0]?._id === id);

    return data;
  };

  // filter and search
  useEffect(() => {
    const filterResults = () => {
      let results = treatmentData;
      if (searchJobCatagory) {
        results = results.filter(
          (item) =>
            item.jobCategory &&
            item.jobCategory
              .toLowerCase()
              .includes(searchJobCatagory.toLowerCase())
        );
      }
      if (searchCustomerName) {
        results = results.filter(
          (item) =>
            item.customerData[0]?.customerName &&
            item.customerData[0]?.customerName
              .toLowerCase()
              .includes(searchCustomerName.toLowerCase())
        );
      }
      if (searchCity) {
        results = results.filter(
          (item) =>
            item.city &&
            item.city.toLowerCase().includes(searchCity.toLowerCase())
        );
      }
      if (searchAddress) {
        results = results.filter(
          (item) =>
            (item.customerData[0]?.cnap &&
              item.customerData[0]?.cnap
                .toLowerCase()
                .includes(searchAddress.toLowerCase())) ||
            (item.customerData[0]?.rbhf &&
              item.customerData[0]?.rbhf
                .toLowerCase()
                .includes(searchAddress.toLowerCase()))
        );
      }
      if (searchContact) {
        results = results.filter((item) => {
          const mainContact = item.customerData[0]?.mainContact;
          if (typeof mainContact === "string") {
            return mainContact
              .toLowerCase()
              .includes(searchContact.toLowerCase());
          } else if (typeof mainContact === "number") {
            const stringMainContact = String(mainContact); // Convert number to string
            return stringMainContact
              .toLowerCase()
              .includes(searchContact.toLowerCase());
          }
          return false; // Exclude if mainContact is neither string nor number
        });
      }
      if (searchTechName) {
        results = results.filter(
          (item) =>
            item.techName && //no technician name
            item.techName.toLowerCase().includes(searchTechName.toLowerCase())
        );
      }
      if (searchJobType) {
        results = results.filter(
          (item) =>
            item.service &&
            item.service.toLowerCase().includes(searchJobType.toLowerCase())
        );
      }
      if (searchDesc) {
        results = results.filter(
          (item) =>
            item.customerFeedback &&
            item.customerFeedback
              .toLowerCase()
              .includes(searchDesc.toLowerCase())
        );
      }
      setSearchResults(results);
    };
    filterResults();
  }, [
    searchJobCatagory,
    searchCustomerName,
    searchCity,
    searchAddress,
    searchContact,
    searchJobType,
    searchDesc,
  ]);

  let i = 1;
  const targetDate = date;

  // Function to calculate the total amount from the paymentData array
  function calculateTotalPaymentAmount(paymentData) {
    let totalAmount = 0;
    for (const payment of paymentData) {
      const amountString = payment.amount;
      const cleanedAmountString = amountString.replace(/[^\d.-]/g, "");
      const amount = parseFloat(cleanedAmountString);
      if (!isNaN(amount)) {
        totalAmount += amount;
      }
    }
    return totalAmount.toFixed(2); // Format the total amount with two decimal places
  }

  function calculatePendingPaymentAmount(paymentData, serviceCharge) {
    const totalAmount = calculateTotalPaymentAmount(paymentData);

    const pendingAmount = totalAmount - parseFloat(serviceCharge[0]?.charge);

    return pendingAmount.toFixed(2); // Format the pending amount with two decimal places
  }

  const confirm = async (id) => {
    try {
      const config = {
        url: `/updatestatus/${id}`,
        method: "put",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          status: "confirm",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          window.location.assign(`/paymentfilterlist/${date}`);
        }
      });
    } catch (error) {
      console.error(error);
      alert("Somthing went wrong");
    }
  };
  const [totalGrandTotal, setTotalGrandTotal] = useState(0);
  const calculateColumnTotals = () => {
    let grandTotal = 0;

    searchResults.forEach((selectedData) => {
      // Calculate the grand total
      if (selectedData?.type === "userapp") {
        grandTotal += Number(selectedData?.GrandTotal) || 0;
      } else {
        if (selectedData.dividedamtCharges.length > 0) {
          grandTotal += Number(selectedData.dividedamtCharges[0].charge) || 0;
        }
      }
      // ... Calculate other totals for different columns similarly
    });

    // Update state with the calculated totals
    setTotalGrandTotal(grandTotal);
    // ... Update other state variables for different columns similarly
  };

  useEffect(() => {
    // Call the function to calculate totals when searchResults changes
    calculateColumnTotals();
  }, [searchResults]);

  const calculateTotalAmount = (searchResults, paymentMode) => {
    return searchResults.reduce((total, selectedData) => {
      const matchingPayments = selectedData.paymentData.filter(
        (i) =>
          i.paymentType === "Customer" &&
          (i.serviceId === selectedData._id ||
            i.serviceId === selectedData.serviceId) &&
          (i.paymentMode === paymentMode ||
            (paymentMode === "cash" && i.paymentMode === "Cash"))
      );

      const subtotal = matchingPayments.reduce(
        (subtotal, payment) => subtotal + parseFloat(payment.amount),
        0
      );

      return total + subtotal;
    }, 0);
  };

  const cashTotal = calculateTotalAmount(searchResults, "cash");
  const onlineTotal = calculateTotalAmount(searchResults, "online");
  const googlepeTotal = calculateTotalAmount(searchResults, "Google Pay");
  const phonepeyTotal = calculateTotalAmount(searchResults, "PhonePe");
  const chequeTotal = calculateTotalAmount(searchResults, "Cheque");
  const paytmTotal = calculateTotalAmount(searchResults, "Paytm");
  const NEFTTotal = calculateTotalAmount(searchResults, "NEFT");
  const IMPSTotal = calculateTotalAmount(searchResults, "IMPS");

  return (
    <div className="web">
      <Header />
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/paymentcalender" activeClassName="active">
              Payment calendar view
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        {/* {amtCharges !== null ? (
        <p>The amount for {targetDate} is {amtCharges}.</p>
      ) : (
        <p>No amount found for {targetDate}.</p> */}
        {/* )} */}
      </div>
      <div className="row m-auto">
        <div className="pagination-container">
          <span>Page:</span>
          <select
            value={currentPage}
            onChange={(e) => {
              setCurrentPage(Number(e.target.value));
            }}
          >
            {Array.from({ length: tp }, (_, index) => index + 1).map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12">
          <table style={{ width: "113%" }} class=" table-bordered mt-1">
            <thead className="">
              <tr
                className="table-secondary"
                style={{ background: "lightgrey" }}
              >
                <th className="table-head" scope="col"></th>

                <th
                  className="table-head"
                  style={{ width: "13%" }}
                  scope="col"
                ></th>
                <th scope="col" className="table-head"></th>

                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchCustomerName}
                    onChange={(e) => setSearchCustomerName(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <select
                    className="vhs-table-input"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[...new Set(treatmentData.map((city) => city.city))].map(
                      (uniqueCity) => (
                        <option value={uniqueCity} key={uniqueCity}>
                          {uniqueCity}
                        </option>
                      )
                    )}
                  </select>{" "}
                </th>
                <th scope="col" style={{ width: "15%" }} className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />{" "}
                </th>

                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchJobType}
                    onChange={(e) => setSearchJobType(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "}
                </th>
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>

                {/* 
                // <th scope="col" className="table-head"></th>
                <th scope="col" className="table-head"></th> */}
              </tr>
              <tr
                className="table-secondary"
                style={{ background: "lightgrey" }}
              >
                <th className="table-head" scope="col">
                  Sr.No
                </th>
                <th className="table-head" scope="col">
                  Category
                </th>
                <th className="table-head" scope="col">
                  Payment Date
                </th>

                <th scope="col" className="table-head">
                  Customer Name
                </th>
                <th scope="col" className="table-head">
                  City
                </th>
                <th scope="col" className="table-head">
                  Reference
                </th>
                <th scope="col" style={{ width: "25%" }} className="table-head">
                  Address
                </th>
                <th scope="col" className="table-head">
                  Contact No.
                </th>

                <th scope="col" className="table-head" style={{ width: "25%" }}>
                  Job Type
                </th>
                <th scope="col" className="table-head" style={{ width: "25%" }}>
                  Description
                </th>

                <th scope="col" className="table-head">
                  Amount
                </th>
                <th
                  scope="col"
                  className="table-head"
                  style={{ minWidth: "160px" }}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="table-head"
                  style={{ minWidth: "200px" }}
                >
                  Payment details
                </th>

                <th scope="col" className="table-head">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((selectedData) => (
                <tr
                  className="user-tbale-body"
                  style={{
                    backgroundColor:
                      selectedData?.status === "confirm"
                        ? "orange"
                        : selectedData.dsrdata[0]?.jobComplete === "CANCEL"
                        ? "rgb(186, 88, 88)"
                        : "white",
                  }}
                >
                  <td>{i++}</td>
                  <td>{selectedData.category}</td>
                  <td>{date}</td>

                  <td>{selectedData.customerData[0]?.customerName}</td>

                  <td>{selectedData.city}</td>

                  <td>{selectedData.customerData[0]?.reference}</td>

                  {selectedData?.deliveryAddress ? (
                    <td>
                      {selectedData?.deliveryAddress?.platNo},
                      {selectedData?.deliveryAddress?.landmark},
                      {selectedData?.deliveryAddress?.address}
                    </td>
                  ) : (
                    <td>
                      {selectedData.customerData[0]?.rbhf},
                      {selectedData.customerData[0]?.cnap},
                      {selectedData.customerData[0]?.lnf}
                    </td>
                  )}
                  <td>{selectedData.customerData[0]?.mainContact}</td>
                  {/* <td>{dsrdata[0]?.techName}</td>

                    <td>{dsrdata[0]?.workerName}</td> */}
                  <td>{selectedData.service}</td>

                  <td>{selectedData.desc}</td>

                  {selectedData?.type === "userapp" ? (
                    <td>{selectedData?.GrandTotal}</td>
                  ) : (
                    <td>
                      {selectedData.dividedamtCharges.length > 0 && (
                        <div>
                          <p>{selectedData.dividedamtCharges[0].charge}</p>
                        </div>
                      )}
                    </td>
                  )}

                  {selectedData?.paymentMode === "online" ? (
                    <td>
                      {" "}
                      <p style={{ color: "green" }}>PAYMENT COLLECTED</p>
                    </td>
                  ) : (
                    <td>
                      <b>
                        {calculatePendingPaymentAmount(
                          selectedData.paymentData.filter(
                            (i) =>
                              i.paymentType === "Customer" &&
                              i.serviceId === selectedData._id &&
                              i.serviceDate === date
                          ),
                          selectedData.dividedamtCharges
                        ) == 0 ? (
                          <p style={{ color: "green" }}>PAYMENT COLLECTED</p>
                        ) : (
                          <div>
                            {new Date(date) < new Date() ? (
                              <p
                                style={{
                                  background: "red",
                                  color: "white",
                                  width: "80px",
                                  textAlign: "center",
                                }}
                              >
                                Delayed
                              </p>
                            ) : (
                              "Pending"
                            )}
                          </div>
                        )}
                      </b>
                      {fddata(selectedData?._id).map((item, index) => (
                        <div>
                          {item.endJobTime ? (
                            <p
                              style={{
                                background: "purple",
                                color: "white",
                                padding: 2,
                                textAlign: "center",
                              }}
                            >
                              Updated by tech
                            </p>
                          ) : (
                            <p></p>
                          )}
                          {item.jobComplete === "YES" ? (
                            <p
                              style={{
                                background: "green",
                                color: "white",
                                padding: 2,
                                textAlign: "center",
                              }}
                            >
                              Closed by OPM{" "}
                            </p>
                          ) : (
                            ""
                          )}{" "}
                          <div>{}</div>
                        </div>
                      ))}
                    </td>
                  )}

                  <td>
                    {selectedData.paymentData.some(
                      (i) =>
                        i.paymentType === "Customer" &&
                        i.serviceId === selectedData._id
                      // &&
                      // i.serviceDate === date
                    ) ? (
                      <div>
                        {selectedData.paymentData
                          .filter(
                            (i) =>
                              i.paymentType === "Customer" &&
                              i.serviceId === selectedData._id
                            //  &&
                            // i.serviceDate === date
                          )
                          .map((i) => (
                            <p key={i._id} className="mb-0 text-right">
                              ({i.paymentDate}) {i.amount}({i.paymentMode})
                            </p>
                          ))}
                        <div>
                          <hr className="mb-0 mt-0" />
                          <p className="mb-0 text-right">
                            <b>
                              Total:{" "}
                              {calculateTotalPaymentAmount(
                                selectedData.paymentData.filter(
                                  (i) =>
                                    i.serviceId === selectedData._id &&
                                    i.paymentType === "Customer"
                                  // &&
                                  // i.serviceDate === date
                                )
                              )}
                            </b>
                          </p>
                          <p className="text-right">
                            <b>
                              Pending:{" "}
                              {calculatePendingPaymentAmount(
                                selectedData.paymentData.filter(
                                  (i) =>
                                    i.paymentType === "Customer" &&
                                    i.serviceId === selectedData._id
                                  // &&
                                  // i.serviceDate === date
                                ),
                                selectedData.dividedamtCharges
                              )}
                            </b>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </td>
                  <td>
                    {selectedData.dsrdata[0]?.jobComplete === "CANCEL" ? (
                      "   "
                    ) : (
                      <>
                        {selectedData?.status === "confirm" ? (
                          <Link
                            to="/raiseinvoice"
                            state={{ data: selectedData, data1: date }}
                          >
                            <p style={{ color: "red" }}> Raise Invoice</p>
                          </Link>
                        ) : (
                          <>
                            <Link
                              to="/paymentfulldetails"
                              className="tbl"
                              state={{ data: selectedData, data1: date }}
                            >
                              {" "}
                              <p style={{ color: "green" }}>Payment collect</p>
                            </Link>

                            <Link
                              to="/raiseinvoice"
                              state={{ data: selectedData, data1: date }}
                            >
                              <p style={{ color: "red" }}> Raise Invoice</p>
                            </Link>
                            <b></b>

                            {fddata(selectedData?._id).map((item, index) => (
                              <div>
                                {item.jobComplete === "YES" ? (
                                  <a onClick={() => confirm(selectedData?._id)}>
                                    <p style={{ color: "orange" }}>Confirm</p>
                                  </a>
                                ) : (
                                  ""
                                )}{" "}
                                <div>{}</div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ fontWeight: "bold" }}> GT={totalGrandTotal}</td>
                <td></td>
                <td>
                  {/* Display payment modes total amount */}
                  <b>Online: {onlineTotal.toFixed(2)}</b>
                  <br />
                  <b>Cash: {cashTotal.toFixed(2)}</b> <br />
                  <b>Cheque: {chequeTotal.toFixed(2)}</b>
                  <br />
                  <b>Phone pe: {phonepeyTotal.toFixed(2)}</b>
                  <br />
                  <b>Google pay: {googlepeTotal.toFixed(2)}</b>
                  <br />
                  <b>Paytm : {paytmTotal.toFixed(2)}</b>
                  <br />
                  <b>NEFT Total: {NEFTTotal.toFixed(2)}</b>
                  <br />
                  <b>IMPS Total: {IMPSTotal.toFixed(2)}</b>
                  <br />
                </td>
              </tr>
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Paymentfilterlist;
