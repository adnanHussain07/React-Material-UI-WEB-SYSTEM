import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import _ from "@lodash";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import { DateTimePicker } from "@mui/lab";
import FuseUtils from "@fuse/utils/FuseUtils";
import formatISO from "date-fns/formatISO";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import moment from "moment";
import ds from "../../../services/DataService";
import {
  postAddUpdateInvitationData,
  openNewInviteDialog,
  closeNewInviteDialog,
  openEditInviteDialog,
  closeEditInviteDialog,
} from "app/auth/store/invitesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAddUpdateInvitesLoader } from "app/auth/store/loadersSlice";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  emailaddress: yup
    .string()
    .required("You must enter an e-mail")
    .email("You must enter a valid e-mail."),
});
const defaultValues = {
  id: 0,
  title: "",
  description: "",
  emailaddress: "",
  controller: true,
  usepassword: false,
  // validfrom: formatISO(new Date()),
  // validto: formatISO(new Date()),
  // timetolive: formatISO(new Date()),
  extendedProps: { desc: "" },
};

function MyComputerInvitationAddUpdate(props) {
  const dispatch = useDispatch();
  const inviteDialog = useSelector(({ auth }) => auth.invites.inviteDialog);
  const loaders = useSelector(({ auth }) => auth.loaders);

  const isEdit = props.id != undefined ? true : false;
  const id = props.id != undefined ? props.id : 0;
  const machineId = props.machineId != undefined ? props.machineId : 0;
  const [openDialog, setOpenDialog] = useState(false);

  const { watch, handleSubmit, reset, formState, control } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [getValidFrom, setValidFrom] = React.useState(new Date(moment()));
  const [getTimeToLive, setTimeToLive] = React.useState(new Date(moment()));
  const [getValitdTo, setValitdTo] = React.useState(
    new moment(new Date()).add(1, "day")
  );

  //const [selectedDate, setSelectedDate] = React.useState(moment().format('MM/DD/YYYY'));
  // const initDialog = React.useCallback(() => {
  //   /**

  //    * Dialog type: 'edit'

  //    */

  //   let temp = props.inviteObj != undefined ? props.inviteObj : {};
  //   let inviteFormObj = {
  //     id: temp.id,
  //     title: temp.title,
  //     description: "",
  //     emailaddress: temp.userEmail,
  //     // validfrom: formatISO(new Date()),
  //     // validto: formatISO(new Date()),
  //     // timetolive: formatISO(new Date()),
  //     controller: true,
  //     usepassword: false,
  //   };
  //   reset({ ...inviteFormObj });
  // }, [reset, props.inviteObj]);

  // React.useEffect(() => {
  //   if (openDialog) {
  //     initDialog();
  //   }
  // }, [openDialog, initDialog]);

  const { isValid, dirtyFields, errors } = formState;

  /**
   * Initialize Dialog with Data
   */
  const initDialog = React.useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (inviteDialog.type === "edit" && inviteDialog.data) {
      let tempInviteData = { ...inviteDialog.data };

      let f_dateFrom =
        tempInviteData.dateFrom != null
          ? moment(tempInviteData.dateFrom)
          : Date(moment());
      let dateTo =
        tempInviteData.dateTo != null
          ? moment(tempInviteData.dateTo)
          : Date(moment());
      let f_timeToLive = Date(moment());
      setValidFrom(f_dateFrom);
      setValitdTo(dateTo);
      setTimeToLive(f_timeToLive);
      let inviteFormObj = {
        id: tempInviteData.id,
        title: tempInviteData.title,
        description: tempInviteData.description,
        emailaddress: tempInviteData.userEmail,
        controller:
          tempInviteData.needPassword != undefined
            ? tempInviteData.needPassword
            : false,
        usepassword:
          tempInviteData.canController != undefined
            ? tempInviteData.canController
            : false,
      };

      reset(inviteFormObj);
    }

    /**
     * Dialog type: 'new'
     */
    if (inviteDialog.type === "new") {
      reset({
        ...defaultValues,
        ...inviteDialog.data,
        // id: FuseUtils.generateGUID(),
      });
    }
  }, [inviteDialog.data, inviteDialog.type, reset]);

  /**
   * On Dialog Open
   */
  React.useEffect(() => {
    if (inviteDialog.props.open) {
      initDialog();
    }
  }, [inviteDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeInviteDialog() {
    return inviteDialog.type === "edit"
      ? dispatch(closeEditInviteDialog())
      : dispatch(closeNewInviteDialog());
  }

  // function handleOpenDialog() {
  //   setOpenDialog(true);
  // }

  // function handleCloseDialog() {
  //   setOpenDialog(false);
  // }

  // function handleDelete() {
  //   setOpenDialog(false);
  // }

  function onSubmit(data) {
    console.info(data);
    //j for json variable
    let j_id = inviteDialog.type == "new" ? 0 : inviteDialog.data.inviteId; // inviteDialog.type == "new" ? 0 :
    let j_machineId =
      inviteDialog.type == "edit"
        ? inviteDialog.data.machineID
        : inviteDialog.data.id;

    let j_title = data.title;
    let j_description = data.description;
    let j_emailaddress = data.emailaddress;
    let j_timetolive = moment(getTimeToLive).format("DD/MM/yyyy hh:mm:ss");
    let j_datefrom = moment(getValidFrom).format("DD/MM/yyyy hh:mm:ss");
    let j_dateto = moment(getValitdTo).format("DD/MM/yyyy hh:mm:ss");

    let invitatioJsonObj = {
      id: parseInt(j_id),
      title: j_title,
      description: j_description,
      inviteeEmail: j_emailaddress,
      machineId: parseInt(j_machineId),
      timeToLive: j_timetolive,
      dateFrom: j_datefrom,
      dateTo: j_dateto,
      secondsToLive: 0,
      canController: data.controller,
      needPassword: data.usepassword,
      type: inviteDialog.type,
      machineName: inviteDialog.data.machineName,
      userName : inviteDialog.data.userName,
      userImage: inviteDialog.data.userImage
    };
    dispatch(postAddUpdateInvitationData(invitatioJsonObj));
    dispatch(setAddUpdateInvitesLoader(true));
    //reset(defaultValues);
    // closeInviteDialog();
    console.log(invitatioJsonObj);
  }

  const handleDateChange = (dateObj, dateType) => {
    if (dateType == "validfrom") {
      setValidFrom(moment(dateObj));
    }
    if (dateType == "validto") {
      setValitdTo(moment(dateObj));
    }
    if (dateType == "timetolive") {
      setTimeToLive(moment(dateObj));
    }
  };

  return (
    <div className="p-24 pb-8">
      {/* <Button
        variant="contained"
        color="secondary"
        className="w-full"
        onClick={handleOpenDialog}
      >
        {"Add Invite"}
      </Button> */}
      {/* <Icon className="text-24 arrow-icon">create</Icon> */}

      <Dialog
        {...inviteDialog.props}
        onClose={closeInviteDialog}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <AppBar position="static" elevation={0}>
          <div className="flex items-center justify-between p-12">
            <div className="flex">
              <Toolbar className="flex w-full">
                <Typography variant="subtitle1" color="inherit">
                  {inviteDialog.type == "new" ? "Add Invite " : "Edit Invite"}
                </Typography>
              </Toolbar>
            </div>

            <div className="flex items-center justify-start">
              <div className="flex items-center">
                <Icon
                  color={
                    inviteDialog != null &&
                    inviteDialog != undefined &&
                    inviteDialog.data != null &&
                    inviteDialog.data != undefined &&
                    inviteDialog.data.status
                      ? "success"
                      : "default"
                  }
                >
                  laptop_chromebook
                </Icon>
                <span className="ml-12">
                  {inviteDialog != null &&
                  inviteDialog != undefined &&
                  inviteDialog.data != null &&
                  inviteDialog.data != undefined
                    ? inviteDialog.type == "edit"
                      ? inviteDialog.data.machineName
                      : inviteDialog.data.name
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </AppBar>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {loaders.addUpdateInviteLoader ? (
            <CircularProgress
              style={{
                marginTop: "12%",
                marginLeft: "40%",
                width: 48,
                height: 48,
                marginBottom: 80,
              }}
              color="secondary"
            />
          ) : (
            <>
              <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8 mb-16"
                      label="Title"
                      id="title"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.title}
                      helperText={errors?.title?.message}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8 mb-16"
                      label="Description"
                      id="description"
                      error={!!errors.description}
                      helperText={errors?.description?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="emailaddress"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8 mb-16"
                      label="Email Address"
                      id="emailaddress"
                      variant="outlined"
                      fullWidth
                      error={!!errors.emailaddress}
                      helperText={errors?.emailaddress?.message}
                      required
                      disabled={inviteDialog.type == "edit" ? true : false}
                    />
                  )}
                />

                <DateTimePicker
                  label="Valid From"
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  value={getValidFrom}
                  onChange={(e) => handleDateChange(e, "validfrom")}
                  renderInput={(_props) => (
                    <TextField
                      label="Valid From"
                      className="mt-8 mb-16 w-full"
                      {..._props}
                    />
                  )}
                  className="mt-8 mb-16 w-full"
                />

                <DateTimePicker
                  label="Valid To"
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  value={getValitdTo}
                  onChange={(e) => handleDateChange(e, "validto")}
                  renderInput={(_props) => (
                    <TextField
                      label="Valid To"
                      className="mt-8 mb-16 w-full"
                      {..._props}
                    />
                  )}
                  className="mt-8 mb-16 w-full"
                />

                {/* <DateTimePicker
                  label="Time to Live"
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  value={getTimeToLive}
                  onChange={(e) => handleDateChange(e, "timetolive")}
                  renderInput={(_props) => (
                    <TextField
                      label="Time to Live"
                      className="mt-8 mb-16 w-full"
                      {..._props}
                    />
                  )}
                  className="mt-8 mb-16 w-full"
                /> */}

                <Controller
                  name="controller"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      className="mt-8 mb-16"
                      label="Controller"
                      control={
                        <Switch
                          onChange={(ev) => {
                            onChange(ev.target.checked);
                          }}
                          checked={value}
                          name="controller"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  name="usepassword"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      className="mt-8 mb-16"
                      label="Use Password"
                      control={
                        <Switch
                          onChange={(ev) => {
                            onChange(ev.target.checked);
                          }}
                          checked={value}
                          name="usepassword"
                        />
                      }
                    />
                  )}
                />
              </DialogContent>

              <DialogActions className="justify-between px-8 py-16">
                <div className="px-16">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                  >
                    {inviteDialog.type == "new" ? "Add Invite" : "Edit Invite"}
                  </Button>
                </div>
                <div className="px-16">
                  <Button
                    variant="contained"
                    onClick={closeInviteDialog}
                    size="medium"
                    color="error"
                  >
                    Cancel
                  </Button>
                </div>
              </DialogActions>
            </>
          )}
        </form>
      </Dialog>
    </div>
  );
}

export default MyComputerInvitationAddUpdate;
