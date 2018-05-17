const fileSize = Number(process.env.MAX_FILESIZE) || ( 4 * 1024 * 1024 )
const fileTypes = new RegExp([
  /(^application\/msword$)|/,             // .doc
  /(^application\/pdf$)|/,                // .pdf
  /(^application\/vnd.ms-)|/,             // .ppt, .xls ...
  /(^application\/vnd.openxmlformats-)|/, // .docx, .pptx, .xlsx ...
  /(^application\/zip$)|/,                // .zip
  /(^image\/)|/,                          // .bmp, .gif, .jpeg, .jpg, .png ...
  /(^text\/csv$)/                         // .csv
].map(re => re.source).join(""))

export const validateFile = (file) => {
  if ( !file )
    return {
      valid : false,
      error : "Ei tiedostoa"
    }

  if ( !fileTypes.test(file.type) )
    return {
      valid : false,
      error : "Tiedostotyyppi ei ole tuettu"
    }

  if ( file.size > fileSize )
    return {
      valid : false,
      error : `Tiedosto on liian suuri (maksimi ${(fileSize / 1024**2).toFixed(2)} Mt)`
    }

  return { valid : true }
}
