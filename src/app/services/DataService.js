// *** baseURL & version control ****
const version = 'v1.0';
const serverUri = `https://api.sheepshareremote.com/api/${version}`;
const localUri = `http://localhost:5000/api/${version}`;
const BASE_URL = serverUri;

// *** headers ***
const lockHeader = {
  'Content-Type': 'application/json',
  'x-api-version': `${version}`,
  Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`,
};
const openHeader = {
  'x-api-version': `${version}`,
};

// *** URIs ***
const GATEWAY_REG = '/auth/register';
const GATEWAY_LOGINURL = '/auth/login';
const GATEWAY_USERCONFIRM = '/auth/confirmation/{userId}/{code}';
const GATEWAY_TOKENVALIDATE = '/user/token/validate';
const GATEWAY_RESETPASS = '/user/reset/password';
const GATEWAY_PROFILEDETAIL = '/user/profile/details';
const GATEWAY_FORGOTPASS = '/auth/forgotpassword';
const GATEWAY_FORGOTRESET = '/auth/resetpassword';
const GATEWAY_USERPASSRESET = '/user/reset/password';
const GATEWAY_MACHINEMINELIST = '/machine/mine/computers/list';
const GATEWAY_MACHINEOTHERLIST = '/machine/mine/other/computers/list';
const GATEWAY_MACHINEINVITELIST = '/machine/others/computers/invites/list';
const GATEWAY_USERSTATS = '/user/stats/info';
const GATEWAY_PICUPLOAD = '/user/profile/picture';
const GATEWAY_INVITEADDORUPDATE = '/invite/addorupdate';
const GATEWAY_PROFILEUPDATE = '/user/profile/update';
const GATEWAY_COMPUPDATE = '/machine/mine/computer/update';
const GATEWAY_REMOVEALLADMIN = '/machine/remove/all';
const GATEWAY_REMOVEADMIN = '/machine/mine/remove/admin';
const GATEWAY_ADDUPDATEADMIN = '/machine/mine/computer/access/addorupdate';
const GATEWAY_REMOVESPECIFICINVITE = '/invite/remove';
const GATEWAY_REMOVEALLINVITE = '/invite/remove/all';

// eslint-disable-next-line camelcase
const axios_1 = require('axios');

function _postCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': `${version}`,
      Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`,
    },
  });
  return axiosCustom.post(url, data);
}

function _getCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': `${version}`,
      Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`,
    },
  });
  return axiosCustom.get(url, data);
}

function _postWithOutHeader(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: openHeader,
  });
  return axiosCustom.post(url, data);
}

function _putCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: lockHeader,
  });
  return axiosCustom.put(url, data);
}

function _deleteCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: lockHeader,
  });
  return axiosCustom.delete(url, data);
}

function doLogin(body) {
  // return _postWithOutHeader(GATEWAY_LOGINURL, body);
  return new Promise((resolve, reject) => {
    _postWithOutHeader(GATEWAY_LOGINURL, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const doRegister = (body) =>
  // return _postWithOutHeader(GATEWAY_LOGINURL, body);
  new Promise((resolve, reject) => {
    _postWithOutHeader(GATEWAY_REG, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

function getUserData() {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_PROFILEDETAIL)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function forgotPassService(body) {
  return new Promise((resolve, reject) => {
    _postWithOutHeader(GATEWAY_FORGOTPASS, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function forgotResetService(body) {
  return new Promise((resolve, reject) => {
    _postWithOutHeader(GATEWAY_FORGOTRESET, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function postUserResetService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_USERPASSRESET, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getMineMachineService(pageNo) {
  return new Promise((resolve, reject) => {
    _postCustom(`${GATEWAY_MACHINEMINELIST}/${pageNo}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getOtherMachineService(pageNo) {
  return new Promise((resolve, reject) => {
    _postCustom(`${GATEWAY_MACHINEOTHERLIST}/${pageNo}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getMachineInviteService(pageNo) {
  return new Promise((resolve, reject) => {
    _postCustom(`${GATEWAY_MACHINEINVITELIST}/${pageNo}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getStatsService() {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_USERSTATS)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function postUserPicService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_PICUPLOAD, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function postAddUpdateInvite(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_INVITEADDORUPDATE, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function postUserProfileService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_PROFILEUPDATE, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function mineCompUpdateService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_COMPUPDATE, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeAllAdminService(id) {
  return new Promise((resolve, reject) => {
    _postCustom(`${GATEWAY_REMOVEALLADMIN}/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeAdminService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_REMOVEADMIN, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function addUpdateAdminService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_ADDUPDATEADMIN, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeSpecificInviteService(id, machineID) {
  return new Promise((resolve, reject) => {
    _postCustom(`${GATEWAY_REMOVESPECIFICINVITE}/${id}/${machineID}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeALLInviteService(machineID) {
  return new Promise((resolve, reject) => {
    _postCustom(`${GATEWAY_REMOVEALLINVITE}/${machineID}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const dataServiceMethods = {
  doLogin,
  doRegister,
  getUserData,
  forgotPassService,
  forgotResetService,
  postUserResetService,
  getMineMachineService,
  getOtherMachineService,
  getMachineInviteService,
  getStatsService,
  postUserPicService,
  postUserProfileService,
  postAddUpdateInvite,
  mineCompUpdateService,
  removeAllAdminService,
  removeAdminService,
  addUpdateAdminService,
  removeSpecificInviteService,
  removeALLInviteService,
};

export default dataServiceMethods;
