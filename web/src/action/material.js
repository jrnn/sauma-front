import axios from "axios"
import { bearer, cacheLifespan, errorHandler } from "./helper"
import { notify } from "./notification"

const url = "/api/materials"

/*
 *  ACTION CREATORS
 */
const requestMaterials = () =>
  ({ type : "REQUEST_MATERIALS" })

const requestMaterialsOk = (materials) => ({
  type : "REQUEST_MATERIALS_OK",
  payload : materials
})

const requestMaterialsError = (error) => ({
  type : "REQUEST_MATERIALS_ERROR",
  payload : error
})

const writeMaterial = () =>
  ({ type : "WRITE_MATERIAL" })

const writeMaterialError = () =>
  ({ type : "WRITE_MATERIAL_ERROR" })

const writeMaterialInvalid = (validationErrors) => ({
  type : "WRITE_MATERIAL_INVALID",
  payload : validationErrors
})

const createMaterialOk = (material) => ({
  type : "CREATE_MATERIAL_OK",
  payload : material
})

const updateMaterialOk = (material) => ({
  type : "UPDATE_MATERIAL_OK",
  payload : material
})

export const resetWriteMaterial = () =>
  ({ type : "RESET_WRITE_MATERIAL" })

/*
 *  THUNKS
 */
export const fetchMaterials = (token) => {
  return async (dispatch) => {
    dispatch(requestMaterials())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(requestMaterialsOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(requestMaterialsError(error.message))
    }
  }
}

export const fetchMaterialsIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetchMaterials(getState()) )
      dispatch(fetchMaterials(token))
    else
      return Promise.resolve()
  }
}

export const createMaterial = (material, token, history) => {
  return async (dispatch) => {
    dispatch(writeMaterial())

    try {
      let res = await axios
        .post(url, material, bearer(token))

      dispatch(resetWriteMaterial())
      dispatch(createMaterialOk(res.data))
      dispatch(notify("Materiaali lisätty", "ok"))
      history.replace(`/materials/${res.data.id}`)

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeMaterialInvalid(error.validation))
      else
        dispatch(writeMaterialError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateMaterial = (id, material, token) => {
  return async (dispatch) => {
    dispatch(writeMaterial())

    try {
      let res = await axios
        .put(`${url}/${id}`, material, bearer(token))

      dispatch(resetWriteMaterial())
      dispatch(updateMaterialOk(res.data))
      dispatch(notify("Materiaalitiedot päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(writeMaterialInvalid(error.validation))
      else
        dispatch(writeMaterialError())

      dispatch(notify(error.message, "error"))
    }
  }
}

/*
 *  HELPERS
 */
const shouldFetchMaterials = (state) => {
  let { data } = state.materials

  if ( !data.updated || data.pending )
    return false

  return ( cacheLifespan < (Date.now() - data.updated) )
}
