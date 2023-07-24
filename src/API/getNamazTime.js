import axios from "axios";
async function getNamaztime(place_id) {
  const url = `http://localhost:80/api/v1/namazTime/${place_id}`;
  let namazTimeData = null;
  let statusCode = null;
  let statusMessage = null;
  try {
    ({
      data: namazTimeData,
      status: statusCode,
      statusText: statusMessage,
    } = await axios.get(url));
    console.log(namazTimeData, statusCode, statusMessage);
  } catch (e) {
    console.error(e);
  }
  //for  document not found reposonse is null
  if (statusCode === 200 && namazTimeData === null) {
    return namazTimeData;
  }
  // if document found  reponsone is documents with place_id and NamazTimeDetails
  if (statusCode === 200 && namazTimeData !== null) {
    return namazTimeData.NamazTimeDetails;
  }
  //if  server error
  if (statusCode === 500) {
    //here we throw an error later and handle with error element of router
    console.error(namazTimeData.Error);
    return null;
  }
}
export default getNamaztime;
