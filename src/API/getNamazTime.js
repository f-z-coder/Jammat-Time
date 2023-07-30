import axios from "axios";
async function getNamaztime(place_id) {
  const base_url = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${base_url}/api/v1/namazTime/${place_id}`;
  let namazTimeData = null;
  let statusCode = null;
  let statusMessage = null;
  try {
    ({
      data: namazTimeData,
      status: statusCode,
      statusText: statusMessage,
    } = await axios.get(url));
  } catch (err) {
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: err.message,
    };
  }
  //for  document not found reposonse is null
  if (statusCode === 200 && namazTimeData === null) {
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: "Document not found",
    };
  }
  // if document found  reponsone is documents with place_id and NamazTimeDetails
  if (statusCode === 200 && namazTimeData !== null) {
    return {
      data: namazTimeData.NamazTimeDetails,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: null,
    };
  }
  //if  server error
  if (statusCode === 500) {
    //here we throw an error later and handle with error element of router
    return {
      data: null,
      statusCode: statusCode,
      statusMessage: statusMessage,
      error: "server error",
    };
  }
}
export default getNamaztime;
