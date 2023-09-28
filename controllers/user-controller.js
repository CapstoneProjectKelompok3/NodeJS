import registerServices from "../services/user/register-services.js"
import loginServices from "../services/user/login-services.js"
import verifyServices from '../services/user/verify-services.js'
import updateServices from '../services/user/update-services.js'
import { Prisma } from "@prisma/client";
import deleteService from "../services/user/delete-service.js";
import fetchService from "../services/user/fetch-service.js";

export const getUser = async (req, res) => {

  const user = await fetchService(req)

  return res.json({
    status_code: 200,
    result: 'success',
    message: 'successfully fetch data user',
    data: user
  })

}

export const userRegister = async (req, res) => {
  const user = await registerServices(req.body);

  if (user instanceof Prisma.PrismaClientKnownRequestError)
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      error: {
        path: user.meta.target,
        message: user.message,
      },
    });

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