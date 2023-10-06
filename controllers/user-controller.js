import registerServices from "../services/user/register-services.js"
import loginServices from "../services/user/login-services.js"
import verifyServices from '../services/user/verify-services.js'
import updateServices from '../services/user/update-services.js'
import { Prisma } from "@prisma/client";
import deleteService from "../services/user/delete-service.js";
import fetchService from "../services/user/fetch-service.js";
import detailService from "../services/user/detail-service.js";
import passChangeServices from "../services/user/updatePass-services.js";
import verifyEmailServices from "../services/user/verify-email-services.js";
import resetPassServices from "../services/user/resetPass-services.js";

export const fetchAllUser = async (req, res) => {
  const data = await fetchService(req);

  if (req.query.page && !data.users.length) {
    return res.status(404).json({
      status_code: 404,
      result: 'not found',
      message: 'record data not found'
    });
  }

  return res.json({
    status_code: 200,
    result: 'success',
    message: 'successfully fetch data user',
    pagination: data.pagination,
    data: data.users,
  });
}

export const detailsUser = async (req, res) => {
  let user

  try {
    user = await detailService(req)
  } catch (err) {
    return res.status(404).json({
      status_code: 404,
      result: 'not found',
      message: 'record data not found'
    })
  }

  return res.json({
    status_code: 200,
    result: 'success',
    message: 'successfully get data user',
    data: user
  })
}

export const userRegister = async (req, res) => {
  try {
    await registerServices(req.body);
  } catch (err) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      error: {
        path: err.meta.target,
        message: err.message,
      },
    });
  }

  return res.json({
    status_code: 200,
    result: "success",
    message: "record has been created",
  });
};

export const userLogin = async (req, res) => {
  try {
    const user = await loginServices(req.body);

    res.status(200).json({
      status_code: 200,
      result: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: error.message, // Gunakan pesan error yang dilempar
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateServices(req);
    res.status(200).json({
      status_code: 200,
      result: "success",
      message: "data berhasil diperbarui",
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: error.message, // Gunakan pesan error yang dilempar
    });
  }
};

export const updatePass = async (req, res) => {
  try {
    await passChangeServices(req);
  } catch (error) {
    res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "ada error saat mencoba mengubah password",
      error_message: error.message,
    });
  }
  res.status(200).json({
    status_code: 200,
    result: "success",
    message: "password anda berhasil diubah"
  });
};

export const resetPass = async (req, res) => {
  let newPassword;
  try {
    newPassword = await resetPassServices(req);
  } catch (error) {
    res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "there is an error while resetting password",
      error_message: error.message,
    });
  }
  res.status(200).json({
    status_code: 200,
    result: "success",
    message: `password reset success, password was sent to your email`,
  });
}

export const verifyUser = async (req, res) => {
  try {
      await verifyServices(req.params)
  } catch (err) {
      return res.status(err.code).json({
          status_code: err.code,
          result: err.result,
          message: err.message
      })
  }

  return res.json({
      status_code: 200,
      result: 'success',
      message: 'user has been activated'
  })
}

export const verifyEmail = async (req, res) => {
  const params = req.query.key
  
  try {
    await verifyEmailServices(params)
  } catch (err) {
    return res.status(err.code).json({
      status_code: err.code,
      result: err.result,
      message: err.message
    })
  }

  return res.json({
    status_code: 200,
    result: 'success',
    message: 'Email successfully verified!'
  })
}

export const deleteuser = async (req, res) => {
  try {
    await deleteService(req)
  } catch (err) {
    return res.status(404).json({
      status_code: 404,
      result: 'not found',
      message: err
    })
  }

  return res.json({
    status_code: 200,
    result: 'success',
    message: 'successfully deleted record data'
  })
}