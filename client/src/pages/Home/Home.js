import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spinner/Spinner";
import {
  addData,
  dltData,
  updateData,
} from "../../components/context/ContextProvider";
import { usergetFunc, deletefunc, exporttocsvfunc } from "../../services/Apis";
import Alert from "react-bootstrap/Alert";
import "./home.css";

const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [showSpin, setShowSpin] = useState(true);
  const { useradd, setUseradd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);
  const { deleteData, setDltData } = useContext(dltData);

  const navigate = useNavigate();

  const addUser = () => {
    navigate("/register");
  };

  // get user
  const userGet = async () => {
    const response = await usergetFunc(search, gender, status, sort, page);
    //console.log(response.data.Pagination.pageCount)
    if (response.status === 200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error");
    }
  };

  // delete user

  const deleteUser = async (id) => {
    //console.log(id)
    const response = await deletefunc(id);
    // console.log(response)

    if (response.status === 200) {
      userGet();
      setDltData(response.data);
    } else {
      toast.error("error");
    }
  };

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    //console.log(response)
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error");
    }
  };

  // pagination
  // handle previous btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) {
        return page;
      } else {
        return page - 1;
      }
    });
  };
  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
    // eslint-disable-next-line
  }, [search, gender, status, sort,page]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Successfully Added
        </Alert>
      ) : (
        ""
      )}
      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Successfully Updated
        </Alert>
      ) : (
        ""
      )}

      {deleteData ? (
        <Alert variant="danger" onClose={() => setDltData("")} dismissible>
          {deleteData.fname.toUpperCase()} Successfully Deleted
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main-div">
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="serach_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addUser}>
                <i class="fa-solid fa-plus"></i> &nbsp;Add User
              </Button>
            </div>
          </div>
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportuser}>
                Export To Csv
              </Button>
            </div>
            <div className="filter_gender m-1">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="filter-status m-1">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status-radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Active"}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Inactive"}
                    name="status"
                    value={"Inactive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            userGet={userGet}
          />
        )}
      </div>
    </>
  );
};

export default Home;
