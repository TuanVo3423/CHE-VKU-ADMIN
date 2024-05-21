import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { InterpreterModeOutlined } from "@mui/icons-material";
import { fetchProducts, deleteProducts, getAllUsers, deleteUser } from "../api";
import { SystemReducer } from "../redux/Reducers/System";
import { useDispatch, useSelector } from "react-redux";
import EditProduct from "../components/EditProduct";
import { systemSelector } from "../redux/Selector";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "USER NAME",
    numeric: true,
    disablePadding: false,
    label: "NAME",
  },
  {
    id: "FULL NAME",
    numeric: true,
    disablePadding: false,
    label: "FULL NAME",
  },
  {
    id: "EMAIL",
    numeric: true,
    disablePadding: false,
    label: "EMAIL",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const { numSelected, selected, listUsers } = props;
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    category: "",
    shortDescription: "",
    detailDescription: "",
    price: undefined,
    attachment: "",
    isNew: false,
    likeCount: 0,
  });
  const handleDelete = async () => {
    setIsLoading(true);
    if (selected.length <= 1) {
      deleteUser(selected[0])
        .then((res) => {
          // console.log(res.data);
          setIsLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setIsLoading(true);
        });
    }
  };
  const handleOpenEditModal = async () => {
    if (selected.length <= 1) {
      const test = listUsers.find((item, index) => {
        return item._id === selected[0];
      });
      dispatch(SystemReducer.actions.setIsOpenModalEdit(test));
      // setValues({
      //   ...values,
      //   name : test.name,
      //   category : test.category,
      //   shortDescription : test.shortDescription,
      //   detailDescription : test.detailDescription,
      //   price : test.price,
      //   attachment : '',
      //   isNew : test.isNew,
      //   likeCount : test.likeCount,
      // });
      // setIsOpenModalEdit(true);
    }
  };
  // console.log("values", values, isOpenModalEdit);
  // const test = handleOpenEditModal();
  // console.log('test', test);
  return (
    <div>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            LIST USERS
          </Typography>
        )}

        {numSelected > 0 ? (
          <div style={{ display: "flex" }}>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={handleOpenEditModal}>
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {isLoading && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UsersTable() {
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("NAME");
  const [selected, setSelected] = React.useState([]);
  console.log("selected : ", selected);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  React.useEffect(() => {
    dispatch(SystemReducer.actions.setIsLoading(true));
    getAllUsers()
      .then((res) => {
        // console.log(res.data)
        dispatch(SystemReducer.actions.reset());
        setListUsers(res.data.users);
      })
      .catch((error) => {
        dispatch(SystemReducer.actions.reset());
        console.log(error);
      });
  }, []);
  console.log("listUsers", listUsers);

  //   const handleDelete = async () => {
  //     if (selected.length <= 1) {
  //       // console.log("lam ne");
  //       deleteUser(selected[0]);
  //     }
  //   };

  const data = useSelector(systemSelector);
  // console.log("data isOpenModalEdit : ", data.isOpenModalEdit);

  // const handleEdit = async() => {
  //   if(selected.length <=1) {

  // }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listUsers.map((n) => n._id);
      console.log("newSelected", newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ID) => {
    const selectedIndex = selected.indexOf(ID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUsers.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          listUsers={listUsers}
          numSelected={selected.length}
        />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listUsers.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(listUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      sx={{ cursor: "pointer" }}
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                          }}
                          variant="body1"
                        >
                          {row._id}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                          }}
                          variant="body1"
                        >
                          {row.username}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                          }}
                          variant="body1"
                        >
                          {row.fullname}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                          }}
                          variant="body1"
                        >
                          {row.email}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {data.isOpenModalEdit && <EditProduct />}
    </Box>
  );
}
